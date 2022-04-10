class Shot extends Entity {

	static uid = 0;

	constructor(x, y, dirVector) {
		super("shot", null, x, y, Game.phaserInstance.physics.add.sprite(x, y, 'shot'))
		this.instance.setVelocity(500 * dirVector.x, 500 * dirVector.y)
		this.instance.anims.create({
			key: 'idle',
			frames: this.instance.anims.generateFrameNumbers('shot', { start: 0, end: 3}),
			frameRate: 10,
			repeat: -1
		});
		this.instance.anims.play('idle')
	}
}