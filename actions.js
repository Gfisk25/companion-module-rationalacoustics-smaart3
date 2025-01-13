module.exports = function (self) {
	self.setActionDefinitions({
		sample_action: {
			name: 'My First Action',
			options: [
				{
					id: 'num',
					type: 'number',
					label: 'Test',
					default: 5,
					min: 0,
					max: 100,
				},
			],
			callback: async (event) => {
				console.log('Hello world!', event.options.num)
			},
		},
		// Sends command to reset averages
		resetAvg: {
			name: 'Reset Average',
			options: [
				{
					sequenceNumber: '10',
					action: 'set',
					target:'activeMeasurements',
					},
					
			],
			callback: (event) => {
				this.sendData(payload);
				this.resetAvg();
			}
		},
	})
}


/* /**
	 * Sends command to reset averages
	 * @access public
	 * @since 1.0.0
	 
resetAvg() {
	let payload = {
		"sequenceNumber":10,
		'action':'set',
		'target':'activeMeasurements',
		'properties': [
			{
				'runningAverage': 0
			}
		]
	};

	
} */



/*  
	actions(system) {
		this.setActions({
			'resetAvg': {
				label: 'Reset Average',
				callback: (action) => {
					this.resetAvg();
				}
			},
			'selectTabByName': {
				label: 'Select Tab By Name',
				options: [
					{
						type: 'textinput',
						label: 'Tab Name',
						id: 'tabName'
					}
				],
				callback: (action) => {
					this.selectTab(action.options.tabName);
				}
			},
			'startAllMeasurements': {
				label: 'Start Measurements By Tab Name',
				options: [
					{
						type: 'textinput',
						label: 'Tab Name',
						id: 'tabName'
					}
				],
				callback: (action) => {
					this.startAllMeasurements(action.options.tabName);
				}
			},
			'startGenerator': {
				label: 'Start signal generator',
				callback: (action) => {
					this.generatorState(true);
				}
			},
			'stopGenerator': {
				label: 'Stop signal generator',
				callback: (action) => {
					this.generatorState(false);
				}
			},
			'setGeneratorLevel': {
				label: 'Set Generator Level',
				options: [
					{
					type: 'number',
					label: 'Level (dB FS)',
					id: 'level',
					min: -200,
					max: 0,
					default: 0,
					required: true
					}
				],
				callback: (action) => {
					this.setGeneratorLevel(action.options.level);
				}
			},
			'startTrackingAll': {
				label: 'Start delay tracking for current tab',
				callback: (action) => {
					this.trackingState(true);
				}
			},
			'stopTrackingAll': {
				label: 'Stop delay tracking for current tab',
				callback: (action) => {
					this.trackingState(false);
				}
			},
			'zoomX': {
				label: 'Zoom X Axis',
				options: [
					{
						type: 'dropdown',
						label: 'Direction',
						id: 'selectedDirection',
						default: '+',
						tooltip: 'Which direction do you want?',
						choices: [
						{ id: '+', label: 'In' },
						{ id: '-', label: 'Out' }
						],
						minChoicesForSearch: 0
					}
				],
				callback: (action) => {
					this.issueCommand('option + command'+action.options.selectedDirection);
				}
			},
			'zoomY': {
				label: 'Zoom Y Axis',
				options: [
					{
						type: 'dropdown',
						label: 'Direction',
						id: 'selectedDirection',
						default: '+',
						tooltip: 'Which direction do you want?',
						choices: [
						{ id: '+', label: 'In' },
						{ id: '-', label: 'Out' }
						],
						minChoicesForSearch: 0
					}
				],
				callback: (action) => {
					this.issueCommand(action.options.selectedDirection);
				}
			},
			'zoomXY': {
				label: 'Zoom X and Y Axis',
				options: [
					{
						type: 'dropdown',
						label: 'Direction',
						id: 'selectedDirection',
						default: '+',
						tooltip: 'Which direction do you want?',
						choices: [
						{ id: '+', label: 'In' },
						{ id: '-', label: 'Out' }
						],
						minChoicesForSearch: 0
					}
				],
				callback: (action) => {
					this.issueCommand('command'+action.options.selectedDirection);
				}
			},
			'setZoomPreset': {
				label: 'Set Zoom Preset',
				options: [
					{
						type: 'dropdown',
						label: 'Preset',
						id: 'zoomPreset',
						default: '5', //Default Zoom
						tooltip: 'Which zoom preset do you want?',
						choices: [
						{ id: '5', label: 'Default zoom' },
						{ id: '1', label: 'Zoom 1' },
						{ id: '2', label: 'Zoom 2' },
						{ id: '3', label: 'Zoom 3' },
						{ id: '4', label: 'Zoom 4' }
						],
						minChoicesForSearch: 0
					}
				],
				callback: (action) => {
					this.issueCommand("option + "+action.options.zoomPreset);
				}
			},
			'arrowKeys': {
				label: 'Send Arrow Keys',
				options: [
					{
						type: 'dropdown',
						label: 'Direction',
						id: 'selectedDirection',
						default: 'up',
						tooltip: 'Which direction do you want?',
						choices: [
						{ id: 'up', label: 'Up' },
						{ id: 'down', label: 'Down' },
						{ id: 'left', label: 'Left' },
						{ id: 'right', label: 'Right' }
						],
						minChoicesForSearch: 0
					}
				],
				callback: (action) => {
					this.issueCommand('cursor '+action.options.selectedDirection);
				}
			},
			'cycleZOrder': {
				label: 'Cycle Z Order',
				options: [
					{
						type: 'dropdown',
						label: 'Direction',
						id: 'selectedDirection',
						default: 'forward',
						tooltip: 'Which direction do you want?',
						choices: [
						{ id: 'forward', label: 'Forward' },
						{ id: 'backward', label: 'Backward' }
						],
						minChoicesForSearch: 0
					}
				],
				callback: (action) => {
					if(action.options.selectedDirection == 'forward'){
						this.issueCommand('Z');
					}
					else if (action.options.selectedDirection == 'backward') {
						this.issueCommand('shift + Z');
					}
				}
			},
			'hideTrace': {
				label: 'Hide Trace',
				callback: (action) => {
					this.issueCommand('H');
				}
			},
			'hideAllTraces': {
				label: 'Hide All Traces',
				callback: (action) => {
					this.issueCommand('shift + command + H');
				}
			},
			'togglePeakHold': {
				label: 'Toggle Peak Hold',
				callback: (action) => {
					this.issueCommand('P');
				}
			},
			'toggleInputMeters': {
				label: 'Toggle Input Meters',
				callback: (action) => {
					this.issueCommand('shift + E');
				}
			},
			'toggleInputMeterOrientation': {
				label: 'Toggle Input Meter Orientation',
				callback: (action) => {
					this.issueCommand('shift + option + E');
				}
			},
			'toggleSPLHistory': {
				label: 'Toggle SPL History',
				callback: (action) => {
					this.issueCommand('option + H');
				}
			},
			'toggleMeters': {
				label: 'Toggle SPL Meters',
				callback: (action) => {
					this.issueCommand('E');
				}
			},
			'selectViewPreset': {
				label: 'Select View Preset',
				options: [
					{
						type: 'dropdown',
						label: 'Preset',
						id: 'viewPreset',
						default: 'S', //Default Zoom
						tooltip: 'Which zoom preset do you want?',
						choices: [
						{ id: 'S', label: 'Spectrum' },
						{ id: 'T', label: 'Transfer' },
						{ id: '1', label: 'User View 1' },
						{ id: '2', label: 'User View 2' },
						{ id: '3', label: 'User View 3' },
						{ id: '4', label: 'User View 4' },
						{ id: '5', label: 'User View 5' },
						{ id: '6', label: 'User View 6' },
						{ id: '7', label: 'User View 7' },
						{ id: '8', label: 'User View 8' },
						{ id: '9', label: 'User View 9' },
						{ id: '0', label: 'Multi-Spectrum' }
						],
						minChoicesForSearch: 0
					}
				],
				callback: (action) => {
					this.issueCommand(action.options.viewPreset);
				}
			},
			'moveFrontTrace': {
				label: 'Trace Y Offset',
				options: [
					{
						type: 'dropdown',
						label: 'Direction',
						id: 'selectedDirection',
						default: 'up',
						tooltip: 'Which direction do you want?',
						choices: [
						{ id: 'up', label: 'Up' },
						{ id: 'down', label: 'Down' }
						],
						minChoicesForSearch: 0
					}
				],
				callback: (action) => {
					this.issueCommand('command + cursor '+action.options.selectedDirection);
				}
			},
			'clearTraceOffset': {
				label: 'Clear Top Trace Y Offset',
				callback: (action) => {
					this.issueCommand('Y');
				}
			},
			'clearAllTraceOffset': {
				label: 'Clear All Y Offsets',
				callback: (action) => {
					this.issueCommand('command + Y');
				}
			},
			'toggleBar': {
				label: 'Toggle Bar',
				options: [
					{
						type: 'dropdown',
						label: 'Bar',
						id: 'selectedBar',
						default: 'O',
						tooltip: 'Which direction do you want?',
						choices: [
						{ id: 'O', label: 'Control' },
						{ id: 'U', label: 'Command' },
						{ id: 'B', label: 'Data' }
						],
						minChoicesForSearch: 0
					}
				],
				callback: (action) => {
					this.issueCommand(action.options.selectedBar);
				}
			},
			'lockCursorToPeak': {
				label: 'Lock Cursor To Peak',
				callback: (action) => {
					this.issueCommand('command + P');
				}
			},
			'clearLockedCursor': {
				label: 'Clear Locked Cursor',
				callback: (action) => {
					this.issueCommand('command + X');
				}
			},
			'moveLockedCursor': {
				label: 'Move Locked Cursor',
				options: [
					{
						type: 'dropdown',
						label: 'Direction',
						id: 'selectedDirection',
						default: 'left',
						tooltip: 'Which direction do you want?',
						choices: [
						{ id: 'left', label: 'Left' },
						{ id: 'right', label: 'Right' }
						],
						minChoicesForSearch: 0
					}
				],
				callback: (action) => {
					this.issueCommand('command + cursor '+action.options.selectedDirection);
				}
			},
			'cyclePlot':{
				label: 'Cycle Preferred Plot',
				callback: (action) => {
					this.issueCommand("M");
				}
			}
		});
 */