class Barrer extends Entity {

	static uid = 0;

	constructor(x, y) {
		super("Barrer", x, y, Game.phaserInstance.physics.add.sprite(x, y, 'levelbarrer') )
		this.instance.body.immovable = true;
        Game.entities.push(this)
        Game.entities.filter(e => e._name == "Test").forEach((p)=>{
            Game.phaserInstance.physics.add.collider(p.instance, this.instance);
        })
	}

}
