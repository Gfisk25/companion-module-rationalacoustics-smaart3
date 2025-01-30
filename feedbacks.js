// feedbacks.js
import { combineRgb } from '@companion-module/base'

// A single feedback ID for "connected" status
export const FEEDBACK_ID_IS_CONNECTED = 'is_connected'

export function getFeedbacks(instance) {
	return {
		[FEEDBACK_ID_IS_CONNECTED]: {
			type: 'boolean',
			name: 'Is Connected',
			description: 'If connected, change color',
			defaultStyle: {
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 204, 0), // green
			},
			options: [],
			callback: () => {
				return instance.isConnected
			},
		},
	}
}
