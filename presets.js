// presets.js
import { combineRgb } from '@companion-module/base'

export function getPresets() {
	const presets = {}

	// Helper function for building button presets
	function makePreset(presetId, category, name, text, downActions, feedbacks = []) {
		return {
			type: 'button',
			category,
			name,
			style: {
				text,
				size: '14',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			steps: [
				{
					down: downActions,
					up: [],
				},
			],
			feedbacks,
		}
	}

	// 1) Signal Generator On
	presets['signalGeneratorOn'] = makePreset(
		'signalGeneratorOn',
		'Signal Generator',
		'Signal Generator On',
		'SG ON',
		[{ actionId: 'signalGeneratorOn' }]
	)

	// 2) Signal Generator Off
	presets['signalGeneratorOff'] = makePreset(
		'signalGeneratorOff',
		'Signal Generator',
		'Signal Generator Off',
		'SG OFF',
		[{ actionId: 'signalGeneratorOff' }]
	)

	// 3) Signal Generator Toggle
	presets['signalGeneratorToggle'] = makePreset(
		'signalGeneratorToggle',
		'Signal Generator',
		'Signal Generator Toggle',
		'SG Toggle',
		[{ actionId: 'signalGeneratorToggle' }]
	)

	// 4) White Noise
	presets['signalGeneratorWhite'] = makePreset(
		'signalGeneratorWhite',
		'Signal Generator',
		'Signal Generator White Noise',
		'SG White',
		[{ actionId: 'signalGeneratorWhite' }]
	)

	// 5) Pink Noise
	presets['signalGeneratorPink'] = makePreset(
		'signalGeneratorPink',
		'Signal Generator',
		'Signal Generator Pink Noise',
		'SG Pink',
		[{ actionId: 'signalGeneratorPink' }]
	)

	// 6) Transfer On
	presets['transferOn'] = makePreset(
		'transferOn',
		'Transfer Function',
		'Transfer Function ON',
		'XFER ON',
		[{ actionId: 'transferOn' }]
	)

	// 7) Transfer Off
	presets['transferOff'] = makePreset(
		'transferOff',
		'Transfer Function',
		'Transfer Function OFF',
		'XFER OFF',
		[{ actionId: 'transferOff' }]
	)

	// 8) Transfer Toggle
	presets['transferToggle'] = makePreset(
		'transferToggle',
		'Transfer Function',
		'Transfer Function Toggle',
		'XFER Toggle',
		[{ actionId: 'transferToggle' }]
	)

	// 9) Reset Average
	presets['resetAvg'] = makePreset(
		'resetAvg',
		'Actions',
		'Reset Average',
		'Reset Avg',
		[{ actionId: 'resetAvg' }]
	)

	// 10) Snap to top
	presets['snapToTop'] = makePreset(
		'snapToTop',
		'Actions',
		'Snap to top',
		'Snap Top',
		[
			{
				actionId: 'snapTo',
				options: { snapDirection: 'TOP' },
			},
		]
	)

	// 11) Snap to bottom
	presets['snapToBottom'] = makePreset(
		'snapToBottom',
		'Actions',
		'Snap to bottom',
		'Snap Btm',
		[
			{
				actionId: 'snapTo',
				options: { snapDirection: 'BOTTOM' },
			},
		]
	)

	// 12) Spline Toggle
	presets['toggleSpline'] = makePreset(
		'toggleSpline',
		'Actions',
		'Spline Toggle',
		'Spline Tog',
		[{ actionId: 'toggleSpline' }]
	)

	return presets
}