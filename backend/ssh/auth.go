package ssh

import (
	"fmt"
	"os"

	"golang.org/x/crypto/ssh"
	"golang.org/x/crypto/ssh/agent"
)

func (c *Client) createSSHCOnfig(password string) (*ssh.ClientConfig, error) {
	config := &ssh.ClientConfig{
		User:            c.config.Username,
		HostKeyCallback: ssh.InsecureIgnoreHostKey(),
		Timeout:         c.config.ConnectTimeout(),
	}

	switch c.config.AuthType {
	case "password":
		config.Auth = []ssh.AuthMethod{
			ssh.Password(password),
		}
	case "key":
		auth, err := c.createKeyAuth()
		if err != nil {
			return nil, err
		}
		config.Auth = []ssh.AuthMethod{
			auth,
		}
	case "agent":
		auth, err := c.createAgentAuth()
		if err != nil {
			return nil, err
		}
		config.Auth = []ssh.AuthMethod{
			auth,
		}
	default:
		return nil, fmt.Errorf("unsupported authentication type: %s", c.config.AuthType)
	}
	return config, nil
}

func (c *Client) createKeyAuth() (ssh.AuthMethod, error) {
	keyPath := c.expandPath(c.config.GetKeyPath())

	keyBytes, err := os.ReadFile(keyPath)
	if err != nil {
		return nil, fmt.Errorf("unable to read private key: %v", err)
	}

	signer, err := ssh.ParsePrivateKey(keyBytes)
	if err != nil {
		return nil, fmt.Errorf("unable to parse private key: %v", err)
	}

	return ssh.PublicKeys(signer), nil
}

func (c *Client) createAgentAuth() (ssh.AuthMethod, error) {
	socket := os.Getenv("SSH_AUTH_SOCK")
	conn, err := ssh.Dial("unix", socket, nil)
	if err != nil {
		return nil, fmt.Errorf("unable to connect to SSH agent: %v", err)
	}
	agentClient := agent.NewClient(conn)
	return ssh.PublicKeysCallback(agentClient.Signers), nil
}
