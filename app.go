package main

import (
	"cloudssh/backend/models"
	"context"
	"fmt"

	"cloudssh/backend/ssh"
)

// App struct
type App struct {
	ctx       context.Context
	sshClient *ssh.Client
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) ConnectSHH(host, username, keyPath string, port int) error {
	connection := &models.Connection{
		ID:                       "main-connection",
		Name:                     fmt.Sprintf("%s@%s", username, host),
		Host:                     host,
		Port:                     port,
		Username:                 username,
		AuthType:                 "key",
		KeyPath:                  keyPath,
		ConnectTimeoutSeconds:    30,
		KeepAliveIntervalSeconds: 60,
	}
	a.sshClient = ssh.NewClient(connection)
	return a.sshClient.Connect("")
}

func (a *App) RunCommand(command string) (string, error) {
	if a.sshClient == nil {
		return "", fmt.Errorf("not connected")
	}
	return a.sshClient.RunCommand(command)
}

func (a *App) DisconnectSSH() error {
	if a.sshClient != nil {
		return a.sshClient.Close()
	}
	return nil
}

func (a *App) IsConnected() bool {
	if a.sshClient == nil {
		return false
	}
	return a.sshClient.IsConnected()
}
