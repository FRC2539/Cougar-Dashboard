const { contextBridge } = require('electron')

// Setup a persistent store
const Store = require("electron-store")

const schema = {
	team: {
		type: "string"
	}
}

const store = new Store({schema})

contextBridge.exposeInMainWorld("config", {
  teamNumber: store.get("team", "2539")
})