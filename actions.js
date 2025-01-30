// actions.js
export function getActions(instance) {
	return {
		resetAvg: {
			name: 'Reset Average',
			options: [],
			callback: async () => {
				if (!instance.socket || !instance.socket.isConnected) return
				instance.socket.send('AVERAGE_RESET\n').catch((err) => instance.log('error', err))
			},
		},
		selectTabByName: {
			name: 'Select Tab By Name',
			options: [
				{
					type: 'textinput',
					label: 'Tab Name',
					id: 'tabName',
					default: '',
				},
			],
			callback: async (event) => {
				if (!instance.socket || !instance.socket.isConnected) return
				instance.socket
					.send(`TAB_SELECT_BY_NAME ${event.options.tabName}\n`)
					.catch((err) => instance.log('error', err))
			},
		},
		startAllMeasurements: {
			name: 'Start Measurements By Tab Name',
			options: [
				{
					type: 'textinput',
					label: 'Tab Name',
					id: 'tabName',
					default: '',
				},
			],
			callback: async (event) => {
				if (!instance.socket || !instance.socket.isConnected) return
				instance.socket
					.send(`START_MEASUREMENTS_BY_TAB_NAME ${event.options.tabName}\n`)
					.catch((err) => instance.log('error', err))
			},
		},
		stopAllMeasurements: {
			name: 'Stop Measurements By Tab Name',
			options: [
				{
					type: 'textinput',
					label: 'Tab Name',
					id: 'tabName',
					default: '',
				},
			],
			callback: async (event) => {
				if (!instance.socket || !instance.socket.isConnected) return
				instance.socket
					.send(`STOP_MEASUREMENTS_BY_TAB_NAME ${event.options.tabName}\n`)
					.catch((err) => instance.log('error', err))
			},
		},
		toggleMeasurement: {
			name: 'Toggle Measurement by Name',
			description: 'Tab name + measurement name. Ex: "CL5 - Input 1"',
			options: [
				{
					type: 'textinput',
					label: 'Measurement Tab',
					id: 'tabName',
					default: '',
				},
				{
					type: 'textinput',
					label: 'Measurement Name',
					id: 'measurementName',
					default: '',
				},
			],
			callback: async (event) => {
				if (!instance.socket || !instance.socket.isConnected) return
				instance.socket
					.send(`TOGGLE_MEASUREMENT ${event.options.tabName}||${event.options.measurementName}\n`)
					.catch((err) => instance.log('error', err))
			},
		},
		toggleSpline: {
			name: 'Toggle Spline',
			options: [],
			callback: async () => {
				if (!instance.socket || !instance.socket.isConnected) return
				instance.socket.send('TOGGLE_SPLINE\n').catch((err) => instance.log('error', err))
			},
		},
		snapTo: {
			name: 'Snap to top or bottom',
			options: [
				{
					type: 'dropdown',
					label: 'Snap to',
					id: 'snapDirection',
					default: 'TOP',
					choices: [
						{ id: 'TOP', label: 'Top' },
						{ id: 'BOTTOM', label: 'Bottom' },
					],
				},
			],
			callback: async (event) => {
				if (!instance.socket || !instance.socket.isConnected) return
				instance.socket.send(`SNAP_TO_${event.options.snapDirection}\n`).catch((err) => instance.log('error', err))
			},
		},
		signalGeneratorToggle: {
			name: 'Toggle Signal Generator',
			options: [],
			callback: async () => {
				if (!instance.socket || !instance.socket.isConnected) return
				instance.socket.send('SIGNAL_GENERATOR_TOGGLE\n').catch((err) => instance.log('error', err))
			},
		},
		signalGeneratorOn: {
			name: 'Signal Generator ON',
			options: [],
			callback: async () => {
				if (!instance.socket || !instance.socket.isConnected) return
				instance.socket.send('SIGNAL_GENERATOR_ON\n').catch((err) => instance.log('error', err))
			},
		},
		signalGeneratorOff: {
			name: 'Signal Generator OFF',
			options: [],
			callback: async () => {
				if (!instance.socket || !instance.socket.isConnected) return
				instance.socket.send('SIGNAL_GENERATOR_OFF\n').catch((err) => instance.log('error', err))
			},
		},
		signalGeneratorWhite: {
			name: 'Signal Generator White Noise',
			options: [],
			callback: async () => {
				if (!instance.socket || !instance.socket.isConnected) return
				instance.socket.send('SIGNAL_GENERATOR_WHITE\n').catch((err) => instance.log('error', err))
			},
		},
		signalGeneratorPink: {
			name: 'Signal Generator Pink Noise',
			options: [],
			callback: async () => {
				if (!instance.socket || !instance.socket.isConnected) return
				instance.socket.send('SIGNAL_GENERATOR_PINK\n').catch((err) => instance.log('error', err))
			},
		},
		signalGeneratorFrequency: {
			name: 'Set Signal Generator Frequency (Hz)',
			description: 'Enter a numeric frequency in Hz',
			options: [
				{
					type: 'textinput',
					label: 'Frequency (Hz)',
					id: 'frequency',
					default: '',
				},
			],
			callback: async (event) => {
				if (!instance.socket || !instance.socket.isConnected) return
				instance.socket
					.send(`SIGNAL_GENERATOR_FREQUENCY ${event.options.frequency}\n`)
					.catch((err) => instance.log('error', err))
			},
		},
		signalGeneratorLevel: {
			name: 'Set Signal Generator Level (dBFS)',
			description: 'Negative numbers typical, e.g. -20 dBFS',
			options: [
				{
					type: 'textinput',
					label: 'Level (dBFS)',
					id: 'level',
					default: '',
				},
			],
			callback: async (event) => {
				if (!instance.socket || !instance.socket.isConnected) return
				instance.socket
					.send(`SIGNAL_GENERATOR_LEVEL ${event.options.level}\n`)
					.catch((err) => instance.log('error', err))
			},
		},
		transferToggle: {
			name: 'Toggle Transfer Function Mode',
			options: [],
			callback: async () => {
				if (!instance.socket || !instance.socket.isConnected) return
				instance.socket.send('TRANSFER_TOGGLE\n').catch((err) => instance.log('error', err))
			},
		},
		transferOn: {
			name: 'Transfer Function Mode ON',
			options: [],
			callback: async () => {
				if (!instance.socket || !instance.socket.isConnected) return
				instance.socket.send('TRANSFER_ON\n').catch((err) => instance.log('error', err))
			},
		},
		transferOff: {
			name: 'Transfer Function Mode OFF',
			options: [],
			callback: async () => {
				if (!instance.socket || !instance.socket.isConnected) return
				instance.socket.send('TRANSFER_OFF\n').catch((err) => instance.log('error', err))
			},
		},
	}
}
