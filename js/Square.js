
Square = Thing.clone().newSlots({
	protoType: "Square"
}).setSlots({
	init: function()
	{
		/*
		var dt = .002
		this._rd = new THREE.Vector3(0, dt, dt)
		this._t = 0
		this._zd = 1
		this._nextShift = 3*60
		*/
		this.setup()
		//document.body.style.backgroundColor = "red"
	},
	
	setup: function()
	{		
		var geometry = new THREE.PlaneGeometry(500, 500, 1, 1);
		
		var material = new THREE.MeshLambertMaterial( 
			{
				color: new THREE.Color().setRGB(0,0,0), 
				wireframe: false, 
				wireframeLinewidth: 6,
				opacity: 1,
				transparent: true
			} );

	    this._object = new THREE.Mesh(geometry, material);
	},
/*
	update: function() 
	{	
		this._object.rotation.add(this._rd)
		this._object.position.z += this._zd

		this._t ++		
	}
	*/
})

