class Enemy extends Entity {

	static uid = 0;
	target = null;

	constructor(x, y) {
		super("Enemy", x, y, Game.phaserInstance.physics.add.sprite(x, y, 'gazouille'))
		Game.phaserInstance.physics.add.collider(this.instance, Game.currentLevel.walls);
		this.instance.body.immovable = true;
		this.instance.anims.create({
			key: 'left',
			frames: this.instance.anims.generateFrameNumbers('gazouille', { start: 4, end: 7 }),
			frameRate: 10,
			repeat: -1
		});
	
		this.instance.anims.create({
			key: 'right',
			frames: this.instance.anims.generateFrameNumbers('gazouille', { start: 0, end: 3 }),
			frameRate: 10,
			repeat: -1
		});


		this.instance.anims.play('left')
	}

	update(){
		this.moveToPlayer()
	}

	moveToPlayer(){
		if(!this.enemy) return
		let x = this.instance.x
		let y = this.instance.y

		let bx = this.enemy.instance.x 
		let by = this.enemy.instance.y
		
		if (x < bx){
            this.instance.setVelocityX(50)
			if(this.faceDirection != "right")this.instance.anims.play('right'); this.faceDirection = "right"
        } else if(x > bx) {
			this.instance.setVelocityX(-50)
			if(this.faceDirection != "left")this.instance.anims.play('left'); this.faceDirection = "left"
		}
        	
        if (y < by)
		{
            this.instance.setVelocityY(50)
		} else if(y > by) {
			this.instance.setVelocityY(-50)
		}

	}
	add_target(entity){
		console.log("NEW ENNEMY")
		console.log(entity)
		Game.phaserInstance.physics.add.collider(this.instance, entity.instance, entity.oneHit, null, entity);
		this.enemy = entity
	}

	died(){
		new Money(this.instance.x, this.instance.y)

		let i = Game.entities.findIndex((e)=>{
			return e._uid == this._uid && e._name == "Enemy"
		})
		Game.entities.splice(i,1)
		this.instance.destroy()

		if(Game.entities.filter((e) => e._name == "Enemy").length == 0){
			new Door(250, 250)
		}
	}
}
