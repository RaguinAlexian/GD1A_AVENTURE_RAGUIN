const gameWidthSize = document.documentElement.clientWidth
const gameHeightSize = document.documentElement.clientHeight
const WALL_SIZE = 64
const SHOT_DELAY_SEC = 1

let isGamepad = false
let playerUid = undefined

function getConfig(gravitySettings = {y: 200}, type= Phaser.AUTO) {
	console.log(gravitySettings)
	return {
		scale: {
			autoCenter: Phaser.Scale.CENTER_BOTH,
			width: gameWidthSize,
			height: gameHeightSize
		},
		type: type,
		input: {
			gamepad: true
		},
		physics: {
			default: 'arcade',
			arcade: {
				gravity: gravitySettings
			}
		},
		scene: [
			Menu, Play, Level2
		]
	}

}