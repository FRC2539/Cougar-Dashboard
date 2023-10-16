# Cougar-Dashboard

A custom FRC dashboard made by Team 2539, Krypton Cougars!

## Normal Usage

Install the app, then connect it to the FRC Dashboard.

### Installing the app

Download the latest setup exe file from [github releases](https://github.com/FRC2539/Cougar-Dashboard/releases) and run that to install the latest version. If the app is already downloaded, this will update it.

### Connecting the app with the FRC Dashboard (WINDOWS)

1. Confirm that the app is installed (the setup executable has been run).
2. Identify the path to the installed app. This path should be `C:\Users\[YOUR USERNAME HERE]\AppData\Local\Programs\Cougar-Dashboard\Cougar-Dashboard.exe`. If you can't find the app at that location, find the desktop shortcut to the dashboard app, right click and open properties, and you will find the path labelled **target**.
3. Edit the configuration file for the driver station app (this assumes the driver station app is already installed). See instructions here: [Official Instructions](https://docs.wpilib.org/en/stable/docs/software/driverstation/manually-setting-the-driver-station-to-start-custom-dashboard.html). When you replace the `DashboardCmdLine`, replace it with `""C:\Users\[YOUR USERNAME HERE]\AppData\Local\Programs\Cougar-Dashboard\Cougar-Dashboard.exe""`, or whichever path you identified in step 2.

### Changing Team Number

To change the team number, you need to edit the configuration file (or create one).

1. Create the file `config.json` in `C:\Users\[your-account]\AppData\Roaming\Cougar-Dashboard`.
2. Add team # configuration to the json file:

```json
{
    "team": "2539"
}
```

## Testing and Development

Development requires a local repo clone, [node.js](https://nodejs.org/en/), and `npm`.

Start by installing all packages with `npm install`.

### Testing

If want to test the electron app before building it, make sure to install electron globally `npm install -g electron`.

To start a development server for the website and the electron app, run `npm run electron-dev`.

### Building the app locally

**Building the app is no longer required for installation. Refer to [the above section](#installing-the-app) for a guide to installing the app.**

1. Run `npm run build`. You may need to create the 'build' folder in local repo before calling this.

2. Run `npm run electron-pack`. This will build out the app, and from there you will have an installable app (should have setup in the name) in the dist/ directory. You can install the app that way.

