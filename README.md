# Cougar-Dashboard
A custom FRC dashboard made by Team 2539, Krypton Cougars!

## Usage
### Requirements
To use this, you need to have node.js and npm installed.

#### WINDOWS:
No other requirements

#### MAC or LINUX:
Currently the network tables server uses python on platforms other than windows.
That means it is also required to have python 3 (3.8 preferred) installed on the computer.

After installing python, install [pynetworktables2js](https://github.com/robotpy/pynetworktables2js) with `pip install pynetworktables2js`.

To test out the server, run `python -m pynetworktables2js` (once it is installed).

### Installing the app
On a windows driver station, building the app is no longer required. Simply download the latest setup exe file from the github releases and run that to install the latest version. If there is an update, download that newer version and run the setup and it will update.

### Building the app
**Building the app is no longer required for installation. Refer to the above section for a guide to installing the app.**

First, you need to clone the repo locally.

Next, call `npm install` to install all of the packages.

#### Production (building and installing the app)
*Step 1 is for MAC and LINUX*
1) Go to public/electron.js and set `PYTHON_SERVER_COMMAND` to `python -m pynetworktables`, or the equivalent if it is different on your computer.

2) Run `npm run build`. You may need to create the 'build' folder in local repo before calling this.

3) Run `npm run electron-pack`. This will build out the app, and from there you will have an installable app (should have setup in the name) in the dist/ directory. You can install the app that way. 

#### Testing and Development
Note: If you are developing the app and want to test the electron app before building it, make sure to install electron globally `npm i -g electron`.

To start a development server for the website and the electron app, call `npm run electron-dev`.

Optionally, if you want to use python on windows, simply follow the steps in *Requirements* and *Production* for *MAC* and *LINUX*.
Then, set `ALWAYS_USE_PYTHON = true` in public/electron.js to use python on windows. 

### Connecting the app with the FRC Dashboard (WINDOWS)
1) Confirm that the app is installed (the setup executable has been run).
2) Identify the path to the installed app. This path should be `C:\Users\[YOUR USERNAME HERE]\AppData\Local\Programs\Cougar-Dashboard\Cougar-Dashboard.exe`. If you can't find the app at that location, find the desktop shortcut to the dashboard app, right click and open properties, and you will find the path labelled **target**.
3) Edit the configuration file for the driver station app (this assumes the driver station app is already installed). See instructions here: [Official Instructions](https://docs.wpilib.org/en/stable/docs/software/driverstation/manually-setting-the-driver-station-to-start-custom-dashboard.html). When you replace the `DashboardCmdLine`, replace it with `""C:\Users\[YOUR USERNAME HERE]\AppData\Local\Programs\Cougar-Dashboard\Cougar-Dashboard.exe""`, or whichever path you identified in step 2. 
