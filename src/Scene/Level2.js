
var Level2 = new Phaser.Class({

	Extends: Phaser.Scene,

	initialize:

		function Background() {
			Phaser.Scene.call(this, { key: 'LEVEL2' });
		},

	preload: function () {
        console.log("NEW LEVEL : 2")
		this.load.image('playBg', 'assets/Menu/playBg.png')
		this.load.image('levelbarrer', 'assets/Entity/barrer.png')
		this.load.image('key', 'assets/Entity/bonus.png')
	},

	create: function () {

		Game.phaserInstance = this

        this.add.image(0, 0, 'playBg').setOrigin(0, 0)

		Game.currentLevel = Game.createLevelFromTile([
			'X............................................X',
			'X............................................X',
			'X............................................X',
			'XXXXXXXX.....................................X',
			'XXXXXXXX.....................................X',
			'X..................X.........................X',
			'X............................................X',
			'X............................................X',
			'X............................................X',
			'X...........XXXX.............................X',
			'X...........XXXX.............................X',
			'X...........XXXX.............................X',
			'X............................................X',
			'X............................................X',
			'X............................................X',
			'X............................................X',
			'X........X...................................X',
			'X............................................X',
			'X.................X..........................X',
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
		], this)

		player = this.physics.add.sprite(600, 200, 'player')
		hpBar = this.physics.add.sprite(100, 50, 'hp_bar')
		hpBar.setScrollFactor(0,0);
		iconMoney = this.physics.add.sprite(170, 50, 'money')
		iconMoney.setScrollFactor(0,0);


        
		hpBar.setCrop(0, 0, 72, 32)

        playerEntity = Game.entities.find((e) => e._name == "Test")
		playerUid = playerEntity._uid
        playerEntity.instance = player
        playerEntity.greff_hpbar(hpBar)

        let barrer = new Barrer(1000,0)
        barrer = new Barrer(1000,500)

        let key = new Key(250,450)
        
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

		
		this.cameras.main.setBounds(0, 0, 3200, 1536)


		this.cameras.main.startFollow(player)


		text = this.add.text(190, 40, playerEntity.money, {
			font: "18px Arial",
			fill: "black",
			align: "left"
		});
		text.setScrollFactor(0,0);

		playerEntity.textMoney = text
        playerEntity.upd
	
	},

	update: function () {
        if(!Game.controller) return
		inputStatus = Game.controller.getInputStatus()
		player = Game.getPlayer()

		if (!player)
			throw "Player don't exist anymore"
		player.update(inputStatus)

		Game.entities.forEach(entity => {
			if(entity != player && entity.update)entity.update()
		});
	}

});