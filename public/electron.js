const electron = require("electron")
const { Client } = require('ssh2');
const { app, BrowserWindow, ipcMain, Menu } = electron

const path = require("path")
const isDev = require("electron-is-dev")

let mainWindow = null

// Setup a persistent store
const Store = require("electron-store")

const schema = {
	team: {
		type: "string"
	}
}

const store = new Store({ schema })


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

	ipcMain.handle('list-directory', async (event, args) => {
		let sshConnection = new Client()

		sshConnection.on("ready", () => {
				console.log('at least its ready')
				sshConnection.sftp((err, sftp) => {
					if (err) throw err;
					sftp.readdir(args, (err, list) => {
						if (err) throw err;
						console.dir(list)
						sshConnection.end()
					})
				});
			}).connect({
				host: "10.0.0.251",
				username: "pi",
				password: "raspberry"
			})		

		
		console.log('logging yet again' + theActualResults)
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
					click: () => mainWindow.webContents.send("connect", "simulation"),
					label: 'Connect to simulation',
				}
			]
		},
		{
			label: 'Debug',
			submenu: [
				{
					label: 'Download debug logs',
					click: (menuItem, browserWindow) => downloadLogs(menuItem, browserWindow)
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

// Log downloader stuff

var downloadWindow = null
const downloadLogs = (menuItem, window) => {
	if (downloadWindow) {
		downloadWindow.focus()
		return
	}

	downloadWindow = new BrowserWindow({
		height: 300,
		resizable: false,
		width: 600,
		title: 'Logs Downloader',
		minimizable: true,
		fullscreenable: false,
		autoHideMenuBar: true,
		webPreferences: {
			preload: `${path.join(__dirname, "./preload.js")}`
		}
	})

	downloadWindow.loadURL(
		isDev
			? "http://localhost:3000/log-downloader.html"
			: `file://${path.join(__dirname, "../build/log-downloader.html")}`
	)

	downloadWindow.on('closed', function () {
		downloadWindow = null
	})
}

