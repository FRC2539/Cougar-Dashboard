# Cougar-Dashboard
A custom FRC dashboard made by Team 2539, Krypton Cougars!

## Usage
### Requirements
To use this, you need to have node.js and npm installed.

Currently the network tables server uses python (pynetworktables2js).
That is run by calling `python -m pynetworktables2js` (once it is installed).

I plan to encapsulate this into the electron app in the future, so this may change.

### Building the app
First, you need to clone the repo locally.

Next, call `npm install` to install all of the packages.

#### Testing and Development
Note: If you are developing the app and want to test the electron app before building it, make sure to install electron globally `npm i -g electron`.

To start a development server for the website and the electron app, call `npm run electron-dev`.

#### Production (building and installing the app)
First, run `npm run build`. You may need to create the 'build' folder in local repo before calling this.

Next, run `npm run electron-pack`. This will build out the app, and from there you will have an installable app (should have setup in the name). You can install the app that way. 

This last step may change in the future. Right now, you need to start the pynetworktables2js server first and then run the app (see 'Requirements'). 
I hope to change this, but for now, that is a required step.
