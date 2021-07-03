const electron = require("electron")

const { app, BrowserWindow } = electron

const { exec } = require("child_process")

const path = require("path")
const isDev = require("electron-is-dev")

const ALWAYS_USE_PYTHON = false

const PYTHON_SERVER_COMMAND = "conda activate && python -m pynetworktables2js"

// Uses an executable for portability on windows
const EXECUTABLE_SERVER_COMMAND = "pynetworktables2js --team=2539"

let mainWindow = null

let pythonServer

app.on("ready", () => {
	createWindow()

	if(process.platform != "win32" || ALWAYS_USE_PYTHON) pythonServer = startPythonServer()
	else pythonServer = startExecutableServer()
})

app.on("window-all-closed", () => {
	app.quit()

	killPythonServer(pythonServer)
})

app.on("activate", () => {
	if (mainWindow === null) {
		createWindow()
	}
})

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 1024,
		height: 550,
		title: "Cougar Dashboard",
	})

	mainWindow.loadURL(
		isDev
			? "http://localhost:3000"
			: `file://${path.join(__dirname, "../build/index.html")}`
	)

	mainWindow.on("closed", function () {
		mainWindow = null
	})

	mainWindow.on("page-title-updated", function (e) {
		e.preventDefault()
	})
}

function executeCommand(command) {
	const process = exec(command, (error, stdout, stderr) => {
		if (error) {
			console.error(`exec error: ${error}`)
			return
		}

		console.log(`stdout: ${stdout}`)
		console.error(`stderr: ${stderr}`)
	})

	return process
}

function startPythonServer() {
	// Start the pynetworktables2js server
	const command = PYTHON_SERVER_COMMAND

	// Ouput the current command being used
	console.log(`Using: ${command} \n for pynetworktables2js`)

	const serverProcess = executeCommand(command)

	return serverProcess
}

function startExecutableServer() {
	// Start the pynetworktables2js server
	const command = EXECUTABLE_SERVER_COMMAND

	// Ouput the current command being used
	console.log(`Using: ${command} \n for pynetworktables2js`)

	const serverProcess = executeCommand(command)

	return serverProcess
}

function killPythonServer(serverProcess) {
	// Store the process ID of the python server
	const pid = serverProcess.pid

	console.log(`Python Server Process ID: ${pid}`)

	// Try to kill the process
	serverProcess.kill()
}
