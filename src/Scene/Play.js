let alreadyLoadedOnce = false
let enemies = []
var Play = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:

    function Background ()
    {
        Phaser.Scene.call(this, { key: 'PLAY'});
    },

    preload: function ()
    {
		this.load.image('wall', 'assets/Entity/wall.png');
		this.load.image('door', 'assets/Entity/wall.png');
		this.load.image('money', 'assets/Entity/Argent.png');
		this.load.image('hp_bar', 'assets/Entity/hp_bar.png');
		this.load.spritesheet(
			'player',
			'assets/Entity/player.png',
        	{ frameWidth: 32, frameHeight: 32 }
    	);
		this.load.spritesheet(
			'gazouille',
			'assets/Entity/gazouille.png',
        	{ frameWidth: 32, frameHeight: 32 }
    	);
		this.load.spritesheet(
			'shot',
			'assets/Entity/shot.png',
        	{ frameWidth: 32, frameHeight: 32 }
    	);
		this.load.image('playBg', 'assets/Menu/playBg.png')
    },

    create: function ()
    {

		Game.phaserInstance = this


        this.add.image(0, 0, 'playBg').setOrigin(0, 0)

		Game.currentLevel = Game.createLevelFromTile([
			'XXXXXXXXXXXXX',
			'X............................................X',
			'X............................................X',
			'X............................................X',
			'X............................................X',
			'X............................................X',
			'X............................................X',
			'X............................................X',
			'X............................................X',
			'X............................................X',
			'X............................................X',
			'X............................................X',
			'X............................................X',
			'X............................................X',
			'X............................................X',
			'X............................................X',
			'X............................................X',
			'X............................................X',
			'X............................................X',
			'X............................................X',
			'X............................................X',
			'X............................................X',
			'X............................................X',
			'X............................................X',
			'X............................................X',
			'X............................................X',
			'X............................................X',
			'X............................................X',
			'X............................................X',
			'X............................................X',
			'X............................................X',
			'X............................................X',
			'X............................................X',
			'X............................................X',
			'X............................................X',
			'X............................................X',
			'X............................................X',
			'X...........',
			'X...........X',
			'X...........X',
			'X...........X',
			'X...........X',
			'XXXXXXXXXXXXX',
		], this)

		player = this.physics.add.sprite(600, 200, 'player')
		hpBar = this.physics.add.sprite(100, 50, 'hp_bar')
		hpBar.setScrollFactor(0,0);
		iconMoney = this.physics.add.sprite(170, 50, 'money')
		iconMoney.setScrollFactor(0,0);


		// MAX 72
		// SIZE REC 18

		hpBar.setCrop(0, 0, 72, 32)
		//player.setBounce(0.2)
		//player.setCollideWorldBounds(true)
	
		this.anims.create({
			key: 'left',
			frames: this.anims.generateFrameNumbers('player', { start: 12, end: 15 }),
			frameRate: 10,
			repeat: -1
		});

		this.anims.create({
			key: 'up',
			frames: this.anims.generateFrameNumbers('player', { start: 8, end: 11 }),
			frameRate: 10,
			repeat: -1
		});

		this.anims.create({
			key: 'down',
			frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
			frameRate: 10,
			repeat: -1
		});

		this.anims.create({
			key: 'right',
			frames: this.anims.generateFrameNumbers('player', { start: 4, end: 7 }),
			frameRate: 10,
			repeat: -1
		});

		this.physics.add.collider(player, Game.currentLevel.walls)

		if (!Game.controller) {
			Game.controller = new Controller(isGamepad, this)
			alreadyLoadedOnce = true
		}
		let playerEntity = new Player('Test', 400, 400, player)
		playerEntity.greff_hpbar(hpBar)
		playerUid = playerEntity.uid
		Game.addEntity(playerEntity)
		
		this.cameras.main.setBounds(0, 0, 3200, 1536)


		for (let i = 0; i < 2; i++) {
			let x = Math.random()*800 + 400
			let y = Math.random()*800 + 400
			let enemy = new Enemy(x, y)
			enemy.add_target(playerEntity)
			Game.addEntity(enemy)
		}

		this.cameras.main.startFollow(player)


		text = this.add.text(190, 40, "0", {
			font: "18px Arial",
			fill: "black",
			align: "left"
		});
		text.setScrollFactor(0,0);

		playerEntity.textMoney = text
	

		
	},

	update: function()
	{
        if(!Game.controller) return
		inputStatus = Game.controller.getInputStatus()
		player = Game.getEntity(playerUid)

		if (!player)
			throw "Player don't exist anymore"
		player.update(inputStatus)

		Game.entities.forEach(entity => {
			if(entity != player)entity.update()
		});


	}

});