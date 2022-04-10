var Menu = new Phaser.Class({

	Extends: Phaser.Scene,

	initialize:

		function Background() {
			Phaser.Scene.call(this, { key: 'MENU' });
		},

	preload: function () {
		this.load.image('menuBg', 'assets/Menu/menuBg.png')
	},

	create: function () {
		
		Game.phaserInstance = this

		bg = this.add.image(0, 0, 'menuBg').setOrigin(0)
		bg.setScale(0.6)
		Game.controller = new Controller(isGamepad, this)
		Game.controller.keys.action.on('down', function (event) {
			console.log('From Menu to Play');
			this.scene.start('PLAY');
			Game.controller = undefined
			alreadyLoadedOnce = false
		}, this);
	},

	update: function () {
		console.log(Game.controller.getInputStatus().fire)
	}

});