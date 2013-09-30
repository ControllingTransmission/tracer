
Visual = Proto.clone().newSlots({
	protoType: "Square",
	objects: null,
	renderer: null,
	camera: null,
	scene: null,
	light: null
}).setSlots({
	go: function()
	{
		this.setup()
		this.run()
	},
	
	run: function()
	{
		this._objects = [SquaresGroup.clone().open()]
		//this._objects = [SquaresGroup.clone().open(), SquaresGroup.clone().open()]
		//this._objects[0]._object.position.z = -1000
		this.animate()	
		document.body.style.backgroundColor = "red"
	},

	setup: function()
	{
		this.setupRenderer()
		this.setupCamera()
		this.setupScene()
		this.setupLight()
		this.setupBindings()
	},
	
	setupRenderer: function()
	{
		var container = document.createElement('div');
		document.body.appendChild(container);
		this.setRenderer(new THREE.WebGLRenderer({ antialias: true }))
		this.renderer().setSize(window.innerWidth, window.innerHeight);
		container.appendChild(this.renderer().domElement);
	},
	
	setupCamera: function()
	{
		this.setCamera(new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 4000))
		this.camera().position.x = 0;
		this.camera().position.y = 0;
		this.camera().position.z = 1200;
		this.camera().lookAt(new THREE.Vector3(0, 0, 0));		
	},
	
	setupScene: function()
	{	
		this.setScene(new THREE.Scene())
		var self = this
		window.addEventListener('resize', function () { self.onWindowResize() }, false);
	},
	
	setupLight: function()
	{	
		this.setLight(new THREE.DirectionalLight(0xffffff))
		this.light().position.set(0, 50, 50);
		this.light().target.position.set(0, 0, 0);
		this.scene().add(this.light())
	},
	
	setupBindings: function()
	{
		$(document).bind('keydown', function(e) { 
			/*
			Keyboard.shiftKey = e.shiftKey
			Keyboard.altKey   = e.altKey
			Keyboard.ctrlKey  = e.ctrlKey
			var retChar = 13
			var escChar = 27
			var sqChar = 192

			var char = String.fromCharCode(e.keyCode).toLowerCase()
			*/
			var space = 32

			if (e.keyCode == 32)
			{
			}
			//console.log("e.keyCode: " + e.keyCode)
			this._objects.forEach(function (obj) { if (obj.keydown) { obj.keydown(e) } })
		})		
	},

	animate: function() 
	{
		var self = this
		requestAnimationFrame(function () { self.animate() });
		
		TWEEN.update();
		
		this._objects.forEach(function(obj) { obj.update() })
		this.render();

		//this.flickerBackground()
	},
	
	flickerBackground: function()
	{
		 if (Math.random() > .5)
		 {
		 	document.body.style.backgroundColor = "red"
		 }
		 else if (Math.random() > .5)
		 {
		 	document.body.style.backgroundColor = "white"
		 }
		 else
		 {
		 	document.body.style.backgroundColor = "blue"
		 }
	},
	
	render: function()
	{
		this.renderer().render(this.scene(), this.camera());
	},

	onWindowResize: function() 
	{
		this.camera().aspect = window.innerWidth / window.innerHeight;
		this.camera().updateProjectionMatrix();
		this.renderer().setSize(window.innerWidth, window.innerHeight);
	}
})


