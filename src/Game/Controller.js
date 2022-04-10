class Controller {

	input = undefined
	isGamepad = undefined
	keys = undefined

	constructor(isGamepad, phaserInstance) {
		this.isGamepad = isGamepad
		if (isGamepad) {
			phaserInstance.input.gamepad.once('connected', function (pad) {
				this.input = pad;
				console.log("Gamepad connected")
			}, this);
		} else {
			this.input = phaserInstance.input.keyboard
			this.input.addCapture('Z','Q','S','D','E')
			this.keys = this.input.addKeys({ 'up': Phaser.Input.Keyboard.KeyCodes.Z,
								'down': Phaser.Input.Keyboard.KeyCodes.S,
								'left': Phaser.Input.Keyboard.KeyCodes.Q,
								'right': Phaser.Input.Keyboard.KeyCodes.D,
								'action': Phaser.Input.Keyboard.KeyCodes.E,
								'fire': Phaser.Input.Keyboard.KeyCodes.SPACE
							});
			console.log("Keyboard connected")
		}
	}

	isUpDown() {
		if (this.input)
			return this.isGamepad ? this.input.leftStick.y < -0.75 : this.keys.up.isDown
		return false
	}

	isDownDown() {
		if (this.input)
			return this.isGamepad ? this.input.leftStick.y > 0.75 : this.keys.down.isDown
		return false
	}

	isLeftDown() {
		if (this.input)
			return this.isGamepad ? this.input.leftStick.x < -0.75 : this.keys.left.isDown
		return false
	}

	isRightDown() {
		if (this.input)
			return this.isGamepad ? this.input.leftStick.x > 0.75 : this.keys.right.isDown
		return false
	}

	isActionDown() {
		if (this.input)
			return this.isGamepad ? this.input.A >= 0.75 : this.keys.action.isDown
		return false	
	}

	isFireDown() {
		if (this.input)
			return this.isGamepad ? this.input.X >= 0.75 : this.keys.fire.isDown
		return false	
	}

	getInputStatus() {
		// Need to be changed, but not urgent at all
		var up = this.isUpDown() && !left && !right
		var down = this.isDownDown() && !left && !right
		var left = this.isLeftDown() && !up && !down
		var right = this.isRightDown() && !up && !down
		return {
			'up': up && !left && !right,
			'down': down && !left && !right,
			'left': left && !up && !down, 
			'right': right && !up && !down,
			'action': this.isActionDown(),
			'fire': this.isFireDown(),
		}
	}
}