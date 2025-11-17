package models

import (
	"fmt"
	"time"
)

type Connection struct {
	ID       string `json:"id"`
	Name     string `json:"name"`
	Host     string `json:"host"`
	Port     int    `json:"port"`
	Username string `json:"username"`
	AuthType string `json:"auth_type"` // e.g., "password", "key"
	KeyPath  string `json:"key_path,omitempty"`

	// SSH configuration options
	ConnectTimeoutSeconds    int64 `json:"connect_timeout_seconds"` // in seconds
	KeepAlive                bool  `json:"keep_alive"`
	KeepAliveIntervalSeconds int64 `json:"keep_alive_interval_seconds"` // in seconds
}

func (c *Connection) Address() string {
	return fmt.Sprintf("%s:%d", c.Host, c.Port)
}

func (c *Connection) GetKeyPath() string {
	if c.KeyPath != "" {
		return c.KeyPath
	}
	// Default SSH key path
	return "~/.ssh/id_rsa"
}

func (c *Connection) ConnectTimeout() time.Duration {
	return time.Duration(c.ConnectTimeoutSeconds) * time.Second
}

func (c *Connection) KeepAliveTime() time.Duration {
	return time.Duration(c.KeepAliveIntervalSeconds) * time.Second
}
