# Auto Api Explorer
This project should give you an overview of how to implement [High Mobility's](https://www.high-mobility.com/) OAuth and [hm-node-sdk](https://www.npmjs.com/package/hmkit) library. It consists of two pages - login page to start the authentication flow and a dashboard that displays car's diagnostics state and lets you to toggle door locks.

## Table of contents
* [Requirements](#requirements)
* [Getting Started](#getting-started)
	* [Setting up the project](#setting-up-the-project)
	* [Configuration](#configuration)
	* [Running the server](#running-the-server)

## Requirements
* [Node v8.9.0+](https://nodejs.org/en/)
* [High mobility developer user account](https://developers.high-mobility.com)
	* Vehicle (with *diagnostics* and *door locks* capabilities)
	* Cloud app (with *diagnostics* and *door locks* permissions)

## Getting started

### Setting up the project

Clone the project
```
git clone https://github.com/highmobility/hm-node-auto-api-explorer.git
```

Open your cloned project folder
```
cd hm-node-auto-api-explorer
```

Install dependencies
```
npm install
```

### Configuration
Create a .env config file based on .env.example
```
cp .env.example .env
```

You need to configure all 7 missing variables. To do so, log in to your High Mobility's developer account. Firstly, you need a *cloud app* and a *vehicle* that are linked. Your vehicle has to support *diagnostics* and *door locks* capabilities and the app needs to have permissions for them.

* **`HM_APP_ID`** - This is displayed at your cloud app's page. If you don't have a cloud app, just create a new one and link it to your vehicle.
* **`HM_CLIENT_CERTIFICATE`** and **`HM_CLIENT_PRIVATE_KEY`** are also displayed at your cloud app's page. You can see *Node* and *REST* snippets if you navigate to *CLIENT CERITFICATE* tab. Certificate and private key that we need are used in *Node* snippet as HMKit constructor parameters. First parameter is client certificate and the second parameter is private key.
* **`OAUTH_CLIENT_ID`**, **`OAUTH_CLIENT_SECRET`**, **`OAUTH_AUTH_URI`** and **`OAUTH_TOKEN_URI`** can be found at *Team Settings* (top right corner dropdown menu) > *OAuth Client*. Before leaving this page, you also need to configure `REDIRECT URI`. You can find the input at the bottom of the page - set it to `http://localhost:3000/auth/oauth-callback`.

### Running the server
**!! Do not forget to launch your vehicle's emulator in [developer center](https://developers.high-mobility.com) before running the server.**
After you have launched the emulator, run the app with this command:
```
npm start
```
Open `http://localhost:3000` in browser.