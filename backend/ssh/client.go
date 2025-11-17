package ssh

import (
	"cloudssh/backend/models"
	"fmt"
	"os"
	"path/filepath"
	"strings"
	"time"

	"golang.org/x/crypto/ssh"
)

type Client struct {
	config    *models.Connection // SSH connection configuration
	client    *ssh.Client        // SSH client
	session   *ssh.Session       // SSH session
	connected bool               // Connection status
}

func NewClient(config *models.Connection) *Client {
	return &Client{
		config:    config,
		connected: false,
	}
}

func (c *Client) Connect(password string) error {
	if c.connected {
		return fmt.Errorf("already connected")
	}

	// Create SSH client configuration
	sshConfig, err := c.createSSHCOnfig(password)
	if err != nil {
		return fmt.Errorf("failed to create SSH config: %v", err)
	}

	// Establish SSH connection
	addr := c.config.Address()
	client, err := ssh.Dial("tcp", addr, sshConfig)
	if err != nil {
		return fmt.Errorf("failed to connect to %s: %v", addr, err)
	}
	c.client = client
	c.connected = true

	//configure keep-alive if enabled
	if c.config.KeepAlive {
		go c.keepAlive()
	}
	return nil
}

func (c *Client) Close() error {
	if !c.connected {
		return nil
	}

	if c.session != nil {
		c.session.Close()
		c.session = nil
	}

	if c.client != nil {
		err := c.client.Close()
		c.client = nil
		c.connected = false
		return err
	}

	return nil
}

func (c *Client) RunCommand(cmd string) (string, error) {
	if !c.connected {
		return "", fmt.Errorf("not connected")
	}

	session, err := c.client.NewSession()
	if err != nil {
		return "", fmt.Errorf("failed to create session: %v", err)
	}
	defer session.Close()

	output, err := session.CombinedOutput(cmd)
	if err != nil {
		return "", fmt.Errorf("command execution failed: %v", err)
	}
	return string(output), nil
}

func (c *Client) keepAlive() {
	ticker := time.NewTicker(time.Duration(c.config.KeepAliveTime()) * time.Second)
	defer ticker.Stop()

	for range ticker.C {
		if !c.connected {
			return
		}
		_, _, err := c.client.SendRequest("keepalive@openssh.com", true, nil)
		if err != nil {
			fmt.Printf("keep-alive failed: %v\n", err)
			c.connected = false
			return
		}
	}
}

func (c *Client) IsConnected() bool {
	return c.connected
}

func (c *Client) GetConnectionInfo() *models.Connection {
	return c.config
}

func (c *Client) expandPath(path string) string {
	if strings.HasPrefix(path, "~") {
		homeDir, err := os.UserHomeDir()
		if err != nil {
			return path
		}
		return filepath.Join(homeDir, path[1:])
	}
	return path
}
