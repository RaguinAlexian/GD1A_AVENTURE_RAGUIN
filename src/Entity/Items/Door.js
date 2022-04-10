class Door extends Entity {

	static uid = 0;

	constructor(x, y) {
		super("Door", x, y, Game.phaserInstance.physics.add.sprite(x, y, 'door'))
        Game.entities.filter(e => e._name == "Test").forEach((p)=>{
            Game.phaserInstance.physics.add.collider(p.instance, this.instance, () => {
                Game.phaserInstance.scene.start('LEVEL2');
                Game.controller = undefined

            });
        })
	}

}
