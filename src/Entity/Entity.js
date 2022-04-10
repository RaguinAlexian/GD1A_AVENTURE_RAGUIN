class Entity {

	static uid = 0;

	constructor(name, x, y, instance) {
		this._pos = {
			x: x,
			y: y,
		}
		this._velocity = {
			x: 0,
			y: 0
		}
		this._name = name
		this._uid = Entity.uid++;
		//this.animationCoolDown = Infinity
		this.instance = instance
		
		this.clock = new Date().getTime()
	}

	get velocity() { return this._velocity }

	set velocity(velocity) { this._velocity = velocity}

	set velocityX(x) { this._velocity.x = x }

	set velocityY(y) { this._velocity.y = y }

	get uid() { return this._uid }

	get name() { return this._name }

	set name(name) { this._name = name }
}