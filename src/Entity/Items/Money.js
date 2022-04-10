class Money extends Entity {

	static uid = 0;

	constructor(x, y) {
		super("Money", x, y, Game.phaserInstance.physics.add.sprite(x, y, 'money'))
        Game.entities.filter(e => e._name == "Test").forEach((p)=>{
            console.log(p.instance, this.instance)
            Game.phaserInstance.physics.add.collider(p.instance, this.instance, () => {
                p.winMoney()
                this.instance.destroy()
            });
        })
	}

}
