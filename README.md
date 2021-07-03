# Cougar-Dashboard
A custom FRC dashboard made by Team 2539, Krypton Cougars!

## Usage
### Requirements
To use this, you need to have node.js and npm installed.

#### WINDOWS:
No other requirements

#### MAC or LINUX:
Currently the network tables server uses python on platforms other than windows.
That means it is also required to have python 3 installed on the computer.

After installing python, install [pynetworktables2js](https://github.com/robotpy/pynetworktables2js) with `pip install pynetworktables2js`.

To test out the server, run `python -m pynetworktables2js` (once it is installed).

### Building the app
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
