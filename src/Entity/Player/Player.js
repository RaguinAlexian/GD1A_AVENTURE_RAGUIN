const invulnerability_time = 5
class Player extends Entity {
	static uid = 0
	hp = 3
	hpbar = null
	invulnerability = null
	money = 0

	constructor(name, x, y, instance) {
		super(name, x, y, instance)
		
		this.shots = Game.phaserInstance.physics.add.group({
			key: 'shot',
		})
		instance.body.immovable = true;
		this.shots.clear(true, true)
		this.shots.runChildUpdate = true
		this.nextShotPossible = 0
		this.faceDirection = 'down'
		this.life = 3
	}

	get velocity() { return this._velocity }

	set velocity(velocity) { this._velocity = velocity}

	set velocityX(x) { this._velocity.x = x }

	set velocityY(y) { this._velocity.y = y }

	get uid() { return this._uid }

	get name() { return this._name }

	set name(name) { this._name = name }

	get sprite() { return this._sprite }

	set sprite(sprite) { this._sprite = sprite }

	getFacingDirection() {
		switch (this.faceDirection) {
			case 'up':
				return {x: 0, y: -1}
			case 'down':
				return {x: 0, y: 1}
			case 'left':
				return {x: -1, y: 0}
			case 'right':
				return {x: 1, y: 0}
			default:
				return {x: 0, y: 0}
		}
	}

	update(inputStatus) {
		this.clock = new Date().getTime()

		if (inputStatus.up)  {
			this.velocity.y -= 200
			if (this.instance.anims.currentAnim == null || this.instance.anims.currentAnim.key != 'up') {
			this.instance.anims.play('up')
			this.faceDirection = 'up'
		}
	}
		if (inputStatus.down) {
			this.velocity.y += 200
			if (this.instance.anims.currentAnim == null || this.instance.anims.currentAnim.key != 'down') {
			this.instance.anims.play('down')
			this.faceDirection = 'down'
		}
	}
		if (inputStatus.left) {
			this.velocity.x -= 200
			if (this.instance.anims.currentAnim == null || this.instance.anims.currentAnim.key != 'left') {
			this.instance.anims.play('left')
			this.faceDirection = 'left'
		}
	}
		if (inputStatus.right) {
			this.velocity.x += 200
			if (this.instance.anims.currentAnim == null || this.instance.anims.currentAnim.key != 'right') {
				this.instance.anims.play('right')
				this.faceDirection = 'right'
			}
		}
		
		if (inputStatus.action) {
			console.log('action :', inputStatus.action)
		}

		if (inputStatus.fire) {
			if (this.clock > this.nextShotPossible) {
				var shot = Game.phaserInstance.physics.add.sprite(this.instance.x + 1 * this.getFacingDirection().x, this.instance.y + 1 * this.getFacingDirection().y, 'shot')
				shot.anims.create({
					key: 'idle',
					frames: shot.anims.generateFrameNumbers('shot', { start: 0, end: 3}),
					frameRate: 10,
					repeat: -1
				});
				shot.anims.play('idle')
				//this.shots.push(new Shot(this.instance.x + 1 * this.getFacingDirection().x, this.instance.y + 1 * this.getFacingDirection().y, this.getFacingDirection()))
				this.shots.add(shot)
				this.shots.getLast(true).setVelocity(500 * this.getFacingDirection().x, 500 * this.getFacingDirection().y)
				
				this.nextShotPossible = this.clock + SHOT_DELAY_SEC * 1000
				Game.entities.filter(e => e._name=="Enemy").forEach((enemy)=>{
					Game.phaserInstance.physics.add.collider(enemy.instance, shot, function () {
						console.log(Game.entities)
						
						shot.destroy()
						enemy.died()
					});
				})
			}
		}

		this.instance.setVelocityY(this.velocity.y)
		this.instance.setVelocityX(this.velocity.x)
		this.velocity = { x: 0, y: 0 }	

	}

	checkInvulnerability(){
		if(!this.invulnerability) return false
		let diffTime = Math.abs(Date.now() - this.invulnerability);
		const seconds = diffTime / 1000
		return invulnerability_time > seconds
	}
	


	greff_hpbar(bar){
		this.hpbar = bar
		this.updateLife()
	}

	updateLife(m = 0){
		this.hp += m
		this.hpbar.setCrop(0, 0, 18*(this.hp+1), 32)
	}

	oneHit(){
		if(this.checkInvulnerability()) return
		this.invulnerability = Date.now()
		this.updateLife(-1)
	}

	winMoney(){
		console.log("WIN MONEY")
		this.textMoney.setText(++this.money);

	}
}