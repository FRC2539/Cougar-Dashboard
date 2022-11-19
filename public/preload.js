const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld("api", {
  getTeamNumber: () => ipcRenderer.invoke("get-team-number"),
  setWindowTitle: (title) => ipcRenderer.send("set-title", title),
  handleConnect: (callback) => ipcRenderer.on("connect", (_, mode) => callback(mode))
})