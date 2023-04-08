const electron = require("electron")

const { app, BrowserWindow, ipcMain, Menu } = electron

const path = require("path")
const isDev = require("electron-is-dev")

let mainWindow = null

let pythonServer

// Setup a persistent store
const Store = require("electron-store")

const schema = {
	team: {
		type: "string"
	}
}

const store = new Store({schema})


app.on("ready", () => {
	createWindow()
})

app.on("window-all-closed", () => {
	app.quit()
})

app.on("activate", () => {
	if (mainWindow === null) {
		createWindow()
	}
})

function createWindow() {
	const { width } = require("electron").screen.getPrimaryDisplay().size

	mainWindow = new BrowserWindow({
		width: width,
		x: 0,
		y: 0,
		height: 550,
		title: "Cougar Dashboard",
		webPreferences: {
			preload: `${path.join(__dirname, "./preload.js")}`
		},
	})

	mainWindow.loadURL(
		isDev
			? "http://localhost:3000"
			: `file://${path.join(__dirname, "../build/index.html")}`
	)

	///////// Basic Window Events /////////
	mainWindow.on("closed", function () {
		mainWindow = null
	})

	mainWindow.on("page-title-updated", function (e) {
		e.preventDefault()
	})

	///////// Handle Events /////////
	ipcMain.on("set-title", (event, title) => {
		const webContents = event.sender
		const win = BrowserWindow.fromWebContents(webContents)
		win.setTitle(title)
	})

	ipcMain.handle("get-team-number", async (event, args) => {
		return await store.get("team", "2539")
	})

	if (isDev) mainWindow.webContents.openDevTools()

	///////// Configure Menu /////////
	const isMac = process.platform === 'darwin'

	const template = [
		...(isMac ? [{
		  label: app.name,
		  submenu: [
			{ role: 'about' },
			{ type: 'separator' },
			{ role: 'services' },
			{ type: 'separator' },
			{ role: 'hide' },
			{ role: 'hideOthers' },
			{ role: 'unhide' },
			{ type: 'separator' },
			{ role: 'quit' }
		  ]
		}] : []),
		{
		  label: 'Config',
		  submenu: [
			{
			  click: () => mainWindow.webContents.send("connect", "robot"),
			  label: 'Connect to robot (see config file)',
			},
			{
				click: () => mainWindow.webContents.send("connect", "practice"),
				label: 'Connect to practice field',
			},
			{
			  click: () => mainWindow.webContents.send("connect", "simulation"),
			  label: 'Connect to simulation',
			}
		]
		},
		{
		  label: 'File',
		  submenu: [
			isMac ? { role: 'close' } : { role: 'quit' }
		  ]
		},
		{
		  label: 'Edit',
		  submenu: [
			{ role: 'undo' },
			{ role: 'redo' },
			{ type: 'separator' },
			{ role: 'cut' },
			{ role: 'copy' },
			{ role: 'paste' },
			...(isMac ? [
			  { role: 'pasteAndMatchStyle' },
			  { role: 'delete' },
			  { role: 'selectAll' },
			  { type: 'separator' },
			  {
				label: 'Speech',
				submenu: [
				  { role: 'startSpeaking' },
				  { role: 'stopSpeaking' }
				]
			  }
			] : [
			  { role: 'delete' },
			  { type: 'separator' },
			  { role: 'selectAll' }
			])
		  ]
		},
		{
		  label: 'View',
		  submenu: [
			{ role: 'reload' },
			{ role: 'forceReload' },
			{ role: 'toggleDevTools' },
			{ type: 'separator' },
			{ role: 'resetZoom' },
			{ role: 'zoomIn' },
			{ role: 'zoomOut' },
			{ type: 'separator' },
			{ role: 'togglefullscreen' }
		  ]
		},
		{
		  label: 'Window',
		  submenu: [
			{ role: 'minimize' },
			{ role: 'zoom' },
			...(isMac ? [
			  { type: 'separator' },
			  { role: 'front' },
			  { type: 'separator' },
			  { role: 'window' }
			] : [
			  { role: 'close' }
			])
		  ]
		},
		{
		  role: 'help',
		  submenu: [
			{
			  label: 'Learn More',
			  click: async () => {
				const { shell } = require('electron')
				await shell.openExternal('https://github.com/FRC2539/Cougar-Dashboard')
			  }
			}
		  ]
		}
	  ]
	
	Menu.setApplicationMenu(Menu.buildFromTemplate(template))
}