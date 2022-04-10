class Key extends Entity {

	static uid = 0;

	constructor(x, y) {
		super("Key", x, y, Game.phaserInstance.physics.add.sprite(x, y, 'key'))
        Game.entities.filter(e => e._name == "Test").forEach((p)=>{
            Game.phaserInstance.physics.add.collider(p.instance, this.instance, () => {
                console.log("KEY RECUPEREE")
                console.log(Game.entities)
                Game.entities.filter(e => e._name == "Barrer").forEach((barrer, i) => {
                    barrer.instance.destroy()
                })
                this.instance.destroy()
            });
        })
	}

}
