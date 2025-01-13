const { InstanceBase, Regex, runEntrypoint, InstanceStatus } = require('@companion-module/base')
const UpgradeScripts = require('./upgrades')
const UpdateActions = require('./actions')
const UpdateFeedbacks = require('./feedbacks')
const UpdateVariableDefinitions = require('./variables')
const WebSocket     = require('ws');


class ModuleInstance extends InstanceBase {  //PREV constructor(system, id, config) {
	constructor(internal) {
		super(internal)
	}


	//PREV 
	//  this.defineConst('RECONNECT_TIMEOUT', 10); // Number of seconds to try reconnect
	//	this.reconnecting = null;
	//	this.closing = false;
	//	this.actions(); // export actions

	async init(config) {
		this.config = config

		this.updateStatus(InstanceStatus.Ok)

		this.updateActions() // export actions
		this.updateFeedbacks() // export feedbacks
		this.updateVariableDefinitions() // export variable definitions
	
	//PREV
	//updateConfig(config) {
	//	this.config = config;
	//	this.logout();
	//	if(this.config.host && this.config.port) {
	//		this.login();
		
	



	/**
	 * Main initialization when it's ok to login
	 * @access public
	 * @since 1.0.0
	 */
	
		this.status(this.STATUS_UNKNOWN);
//		this.initVariables();

		if(this.config.host && this.config.port) {
			this.login();
		}
	}

	/**
	 * Try login again after timeout
	 * @param {Int} timeout Timeout to try reconnection
	 * @access public
	 * @since 1.0.0
	 */
	keep_login_retry(timeout) {
		if(this.reconnecting) {
			return;
		}

		this.log('info', 'Attempting to reconnect in ' + timeout + ' seconds.');
		this.reconnecting = setTimeout(this.login.bind(this), timeout * 1000);
	}

	/**
	 * Login to the device
	 * @param {Boolean} retry Set to true to continue retrying logins (only after a good first connection)
	 * @access public
	 * @since 1.0.0
	 */
	login() {
		this.logout();

		this.closing = false;

		if(this.reconnecting) {
			clearTimeout(this.reconnecting);
			this.reconnecting = null;
		}

		// Connect to remote control websocket of ProPresenter
		this.socket = new WebSocket('ws://'+this.config.host+':'+this.config.port+'/api/v3/');

		this.socket.on('open', () => {
			this.status(this.STATUS_OK);
			this.sendData({
				'sequenceNumber':1,
				'action':'get'
			});
		});

		this.socket.on('error', (err) => {
			console.log(err);
			this.status(this.STATUS_ERROR, err.message);
		});

		this.socket.on('close', (code, reason) => {
			this.status(this.STATUS_ERROR, 'Disconnected from Smaart');
			if(!this.closing){
				this.keep_login_retry(this.RECONNECT_TIMEOUT);
			}
		});

		this.socket.on('message', (message) => {
			try {
				let jsonMsg = JSON.parse(message);

				if(jsonMsg['response']['error'] != undefined) {
					if(jsonMsg['response']['error'] === "incorect password") {
						this.status(this.STATUS_ERROR);
						this.log('error', 'Password is incorrect.');
						this.keep_login_retry(10);
					}
				}
				else{
					this.status(this.STATUS_OK);

					if((jsonMsg['sequenceNumber'] === 1) && (jsonMsg['response']['authenticationRequired'])) {
						this.log('info', 'Authenticating');
						this.sendData({
							"action":"set",
							"properties": [
								{
									"password": this.config.password
								}
							]
						});
					}
				}
			}
			catch (e) {
				this.status(this.STATUS_ERROR);
				this.log('error', 'Parsing Error.');
			}
		});
	}



	async configUpdated(config) {
		this.config = config
	}

// Return config fields for web config
	getConfigFields() {
		return [
			{
				type: 'static-text',
				id: 'info',
				width: 12,
				label: 'Information',
				value: 'This will connect with Rational Acoustics Smaart server.<br> If using Smaart V9 or newer this module will not work!'
			},
			{
				type: 'textinput',
				id: 'host',
				label: 'Target IP',
				width: 8,
				regex: Regex.IP,
			},
			{
				type: 'textinput',
				id: 'port',
				label: 'Target Port',
				width: 4,
				regex: Regex.PORT,
			},
			{
				type: 'static-text',
				id: 'info',
				width: 12,
				label: 'Information',
				value: 'If authentication is not used leave password blank.'
			},
			{
				type: 'textinput',
				id: 'password',
				label: 'Password',
				width: 6
			}
		]
	}

	updateActions() {
		UpdateActions(this)
	}

	updateFeedbacks() {
		UpdateFeedbacks(this)
	}

	updateVariableDefinitions() {
		UpdateVariableDefinitions(this)
	}

	
	

	sendData(jsonPayload) {
		if(this.socket != undefined){
			this.socket.send(JSON.stringify(jsonPayload));
		}
		else{
			this.log('error', 'Not connected!');
		}
	}

	

	/**
	 * Sends command to change tabs
	 * @access public
	 * @since 1.0.0
	 */
	selectTab(tabName) {
		let payload = {
			"sequenceNumber":11,
			"action":"set",
			"target":"tabs",
			"properties": [
				{
					"activeTab":tabName
				}
			]
		};

		this.sendData(payload);
	}

	/**
	 * Sends command to start all measurments on a tab
	 * @access public
	 * @since 1.0.0
	 */
	startAllMeasurements(tabName) {
		let payload = {
			"sequenceNumber":12,
			"action":"set",
			"target": {
				"tabName":tabName,
				"measurementName": "allMeasurements"
			},
			"properties": [
				{"active": true }
			]
		};

		this.sendData(payload);
	}

	/**
	 * Sends command to turn the generator on or off
	 * @access public
	 * @since 1.0.0
	 */
	generatorState(state) {
		let payload = {
			"sequenceNumber":13,
			"action":"set",
			"target":"signalGenerator",
			"properties": [
				{ "active":state }
			]
		};

		this.sendData(payload);
	}

	/**
	 * Sends command to set the generator level
	 * @access public
	 * @since 1.0.0
	 */
	setGeneratorLevel(level) {
		let payload = {
		    "sequenceNumber":14,
		    "action":"set",
		    "target":"signalGenerator",
		    "properties": [
		        { "gain":level }
		    ]
		};

		this.sendData(payload);
	}

	/**
	 * Sends command to turn tracking for an entire tab on or off
	 * @access public
	 * @since 1.0.0
	 */
	trackingState(state) {
		let payload = {
			"sequenceNumber":15,
			"action":"set",
			"target": {
				"measurementName": "allTransferFunctionMeasurements"
			},
			"properties": [
				{ "trackingDelay": state }
			]
		};
		this.sendData(payload);
	}

	/**
	 * Sends command to issueCommand handler
	 * @access public
	 * @since 1.0.0
	 */
	issueCommand(command) {
		let payload = {
			"sequenceNumber":16,
			"action":"issueCommand",
			"properties": [
				{ "keypress": command }
			]
		};
		console.log(payload);
		this.sendData(payload);
	}


	// When module gets deleted
	async destroy() {
		this.log('debug', 'destroy') //NEW

		this.closing = true;
		if(this.reconnecting) {
			clearTimeout(this.reconnecting);
			this.reconnecting = null;
		}

		if (this.socket !== undefined) {
			// Disconnect if already connected
			if (this.socket.readyState !== 3 /*CLOSED*/) {
				this.socket.terminate();
			}
			delete this.socket;
		}
		
	}
}

exports = module.exports = instance; //OLD

runEntrypoint(ModuleInstance, UpgradeScripts) //NEW
