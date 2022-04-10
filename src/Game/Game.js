class Game {

	static DEBUG = false	

	static entities = new Array()
	static stack = new Array()
	static isRunning = true
	static phaserInstance = undefined
	static controller = undefined
	static currentLevel = undefined
	
	static setPhaserInstance(phaserInstance) {
		if (phaserInstance)
			return false
		console.log(phaserInstance)
		Game.phaserInstance = phaserInstance
		return true
	}

	static addEntity(entity) {
		if (Game.DEBUG)
			console.log("has been created ->", entity)
		Game.entities.push(entity)
	}

	static removeAllEntities() {
		if (Game.DEBUG)
			console.log("Remove all entities")
		while (Game.entities.length > 0)
			Game.entities.pop()
	}

	static getEntity(uid) {
		var entityFound = Game.entities.filter(e => e.uid == uid)
		if (entityFound.length != 1)
			return undefined
		return entityFound[0]
	}
	static getPlayer() {
		return Game.entities.find(e => e._name == "Test")
	}


	static removeEntityById(uid) {
		Game.entities = Game.entities.filter(e => e.uid != uid)
	}

	static drawEntities() {
		Game.entities.forEach(entity => {
			if (!entity.isDead || entity.animationCoolDown > 0)
				entity.draw()
			// Need to be replace by a check to the animator, I'm just bored (-_-')
			// I'll just pass fonction to animator in the class call
			// Like in Ange Class, it would have is own animation if I do one someday in the near future maybe, who knows...
			entity.animationCoolDown--;
			if (entity.animationCoolDown <= 0)
				entity.startIdleAnimation()
		});
	}

	static removedDeadEntities() {
		Game.entities = Game.entities.filter(e => (!(e.animationCoolDown == Infinity && e.isDead)))
	}

	static createLevelFromTile(tiles, phaserInstance) {
		let level = {
			walls: phaserInstance.physics.add.staticGroup()
		}
		for (let i = 0; i < tiles.length; i++) {
			const tileList = tiles[i];
			for (let j = 0; j < tileList.length; j++) {
				let tile = tileList[j];
				if (tile == 'X')
					level.walls.create(WALL_SIZE / 2 + j * WALL_SIZE, WALL_SIZE / 2 + i * WALL_SIZE, 'wall')
			}
		}
		return level
	}

}