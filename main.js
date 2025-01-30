// main.js
const {
	InstanceBase,
	runEntrypoint,
	Regex,
	InstanceStatus,
	TCPHelper,
} = require('@companion-module/base')


const UpgradeScripts = require('./upgrades') // or []
const UpdateActions = require('./actions')
const UpdateFeedbacks = require('./feedbacks')
const UpdateVariableDefinitions = require('./variables')
const UpdatePresets = require('./presets')

class ModuleInstance extends InstanceBase {
	constructor(internal) {
		super(internal)

		// Track TCP socket and connection status
		this.socket = undefined
		this.isConnected = false
	}

	/**
	 * Called once the instance is created, with user config loaded.
	 */
	async init(config) {
		this.config = config

		// Attempt to connect immediately
		this.initTCP()

		// Register all definitions
		this.updateActions()
		this.updateFeedbacks()
		this.updatePresets()
		this.updateVariableDefinitions()
	}

	/**
	 * Called when module is removed/disabled. Close resources here.
	 */
	async destroy() {
		this.log('debug', 'destroy')
		this.closeSocket()
	}

	/**
	 * Called when user updates config fields (host/port).
	 */
	async configUpdated(config) {
		this.config = config
		this.initTCP()
	}

	/**
	 * Defines the config fields seen in "Edit Instance" (IP, port).
	 */
	getConfigFields() {
		return [
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
		]
	}

	/**
	 * Create or reconnect the TCP socket to Smaart.
	 */
	initTCP() {
		this.closeSocket()

		// If no host is configured, mark as bad config
		if (!this.config.host) {
			this.updateStatus(InstanceStatus.BadConfig, 'No host configured')
			this.isConnected = false
			return
		}

		// Mark status as connecting
		this.updateStatus(InstanceStatus.Connecting, 'Connecting to Smaart...')
		this.isConnected = false

		// Create a new TCPHelper to connect
		this.socket = new TCPHelper(this.config.host, this.config.port)

		// Listen for status changes
		this.socket.on('status_change', (status, message) => {
			this.log('debug', `Socket status: ${status}, message: ${message || ''}`)
			switch (status) {
				case 'ok':
					this.updateStatus(InstanceStatus.Ok, 'Connected')
					this.isConnected = true
					break

				case 'connecting':
					this.updateStatus(InstanceStatus.Connecting, 'Connecting...')
					this.isConnected = false
					break

				case 'disconnected':
					this.updateStatus(InstanceStatus.Disconnected, 'Disconnected')
					this.isConnected = false
					break

				default:
					// e.g. 'unknown_error', etc.
					this.updateStatus(InstanceStatus.UnknownError, message)
					this.isConnected = false
					break
			}
		})

		// Listen for incoming data
		this.socket.on('data', (chunk) => {
			const dataStr = chunk.toString('utf8').trim()
			this.log('debug', `Received from Smaart: ${dataStr}`)
			// If needed, parse or handle Smaart responses here
		})

		// Listen for errors
		this.socket.on('error', (err) => {
			this.log('error', `Socket error: ${err.message}`)
			this.updateStatus(InstanceStatus.ConnectionFailure, err.message)
			this.isConnected = false
		})
	}

	/**
	 * Close the socket if it exists.
	 */
	closeSocket() {
		if (this.socket) {
			this.socket.destroy()
			this.socket = undefined
		}
	}

	/**
	 * Load and register all actions from actions.js
	 */
	updateActions() {
		UpdateActions(this)
	}

	/**
	 * Load and register all feedbacks from feedbacks.js
	 */
	updateFeedbacks() {
		UpdateFeedbacks(this)
	}

	/**
	 * Load and register all presets from presets.js
	 */
	updatePresets() {
		UpdatePresets(this)
	}

	/**
	 * Load and register variable definitions from variables.js
	 */
	updateVariableDefinitions() {
		UpdateVariableDefinitions(this)
	}
}

// If you have no upgrade scripts, replace UpgradeScripts with []
runEntrypoint(ModuleInstance, UpgradeScripts)
