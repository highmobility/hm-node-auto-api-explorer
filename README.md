# Auto Api Explorer
This project should give you an overview of how to implement High Mobility's OAuth and [hm-node-sdk](https://www.npmjs.com/package/hmkit) library. It consists of two pages - login page to start the authentication flow and a dashboard that displays car's diagnostics state and lets you to toggle door locks.

## Table of contents
* [Requirements](#requirements)
* [Getting Started](#getting-started)
	* [Setting up the project](#setting-up-the-project)
	* [Configuration](#configuration)
	* [Running the server](#running-the-server)

## Requirements
* Node v8.9.0+
* High mobility developer user account
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
npm i
```

### Configuration
Create a .env config file based on .env.example
```
cp .env.example .env
```

You can see that app port and url already have default values but you need to configure the missing ones. To do so, log in to your High Mobility's developer account.

Firstly, you need a *cloud app* and a *vehicle* that are linked. Your vehicle has to support *diagnostics* and *door locks* capabilities and the app needs to have permissions for them. You can find **`HM_APP_ID`**, **`HM_CLIENT_CERTIFICATE`** and **`HM_CLIENT_PRIVATE_KEY`** settings from your cloud app detailed view *(Client certificate and private key can be found in 'client certificate' > 'node' example)*.

Secondly, navigate to *Team Settings* > *OAuth Client* (top right corner dropdown menu). Here you can find **`OAUTH_CLIENT_ID`** *(client id)*, **`OAUTH_CLIENT_SECRET`** *(client secret)*, **`OAUTH_AUTH_URL`** *(auth url)*, **`OAUTH_TOKEN_URL`** *(token url)* settings. Copy and paste them to your `.env` file. Last thing to do on this page is to set your `REDIRECT URI`. You can find the input at the bottom of the page - set it to `http://localhost:3000/auth/oauth-callback`.

### Running the server
Launch your vehicle's emulator in developer center and run the server.
```
npm start
```