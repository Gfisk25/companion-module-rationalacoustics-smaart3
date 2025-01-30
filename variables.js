// variables.js

const VARIABLE_DEFINITIONS = [
	{ variableId: 'connected', name: 'Smaart is connected' },
]

export function updateVariables(instance) {
	// 1) Define them:
	instance.setVariableDefinitions(VARIABLE_DEFINITIONS)

	// 2) Set their current values:
	instance.setVariableValues({
		connected: instance.isConnected ? 'true' : 'false',
	})
}
