

Thing = Proto.clone().newSlots({
	protoType: "Max",
	size: 6000,
	divisions: 30,
	object: null,
	t: 0,
	isTransitioning: false,
	age: 0,
	flattenRatio: 0
}).setSlots({
	init: function()
	{
		var dt = .002
		this._rd = new THREE.Vector3(0, dt, dt)
		this._t = 0
		this._zd = 1
		this._nextShift = 3*60
	},

	open: function()
	{
		scene.add(this._object)
		return this
	},	
	
	close: function()
	{
		scene.remove(this._object)
		return this
	},
	
	update: function() 
	{	
		this._object.rotation.add(this._rd)
		this._object.position.z += this._zd
		
		if (this._t > this._nextShift || Math.abs(this._object.rotation.y) > .45)
		{
			if (Math.random() < .5)
			{
				this._rd.z = - this._rd.z
			}
			
			{
				this._rd.y = - this._rd.y
			}
			this._zd = - this._zd
			
			this._nextShift = this._t + (3 + Math.random()*3)*60 //*100000		
		}
		
		var zmax = 600
		if (this._object.position.z > zmax/2)
		{
			this._object.position.z = zmax/2
		}

		if (this._object.position.z < -zmax)
		{
			this._object.position.z = -zmax
		}
		
		this._t ++	
		this._age ++	
	}
})

