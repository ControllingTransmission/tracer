
Visual = Proto.clone().newSlots({
	protoType: "Visual",
	layers: null,
	renderer: null,
	camera: null,
	scene: null,
	light: null,
	selectedLayerNumber: 0,
	downKeys: {}
}).setSlots({
	go: function()
	{
		this.setup()
		this.run()
		return this
	},
	
	addLayer: function(layer)
	{
		this.layers().append(layer)
		return this
	},
	
	removeLayer: function(layer)
	{
		layer.close()
		this.layers().remove(layer)
		return this
	},
	
	run: function()
	{
		this.setLayers([])
		
		this.addLayer(BackgroundGroup.clone())
		this.addLayer(SquaresGroup.clone().open())
		//this.addLayer(CubesGroup.clone().open())
		//this.addLayer(ScanLinesGroup.clone().open())
		
		this.animate()	
		document.body.style.backgroundColor = "red"
	},

	setup: function()
	{
		this.setScene(new THREE.Scene())
		this.setupRenderer()
		//this.setupPerspectiveCamera()
		this.setupOrthoCamera()
		this.setupLight()
		this.setupEvents()
	},
	
	setupRenderer: function()
	{
		var container = document.createElement('div');
		document.body.appendChild(container);
		this.setRenderer(new THREE.WebGLRenderer({ antialias: true }))
		this.renderer().setSize(window.innerWidth, window.innerHeight);
		container.appendChild(this.renderer().domElement);
	},

	setupOrthoCamera: function()
	{
		var width = 8000
		var height = 8000
		var near = -2000
		var far = 2000
		this.setCamera(new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, near, far ))		
		this.camera().position.x = 0;
		this.camera().position.y = 0;
		this.camera().position.z = 800;
		this.camera().lookAt(new THREE.Vector3(0, 0, 0));		
	},
		
	setupPerspectiveCamera: function()
	{		
		this.setCamera(new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 8000))
		this.camera().position.x = 0;
		this.camera().position.y = 0;
		this.camera().position.z = 1000;
		this.camera().lookAt(new THREE.Vector3(0, 0, 0));		
	},
	
	setupEvents: function()
	{	
		var self = this
		window.addEventListener('resize', function () { self.onWindowResize() }, false);
		$(document).bind('keydown', function(e) { self.keydown(e) })		
		$(document).bind('keyup', function(e) { self.keyup(e) })
	},
	
	setupLight: function()
	{	
		this.setLight(new THREE.DirectionalLight(0xffffff))
		this.light().position.set(0, 50, 50);
		this.light().target.position.set(0, 0, 0);
		this.scene().add(this.light())
	},

	animate: function() 
	{
		var self = this
		requestAnimationFrame(function () { self.animate() });
		
		TWEEN.update();
		
		this.layers().forEach(function(layer) { layer.update() })
		this.render();
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
	},
	
	// -------------------------------
	
	keyForKeyCode: function(code)
	{
		var codeToKey = { 
			219: "[", 
			221: "]", 
			188: ",", 
			190: ".",
			189: "-",
		}
		var k = codeToKey[code]
		
		if (k == null)
	    {
			k = String.fromCharCode(code);
		}
		
		return k
	},
	
	selectLayerWithEvent: function(e)
	{
	    var k = this.keyForKeyCode(e.keyCode);
		e.key = k
		
		var knum = parseInt(k)

		//console.log("e.keyCode: " + e.keyCode + " " + e.key)

		if (isNaN(knum) == false)
		{
			this.setSelectedLayerNumber(knum)
			console.log("selecting layer ", knum)
			return true
		}
		return false
	},
	
	selectedLayer: function()
	{
		var n = this.selectedLayerNumber()
		
		if (n != null && n < this.layers().length)
		{
			return this.layers()[n]
		}		
		
		return null
	},
	
	keydown: function(e)
	{
		console.log("e.keyCode " + e.keyCode)
		
		if (e.keyCode == 186) // ;
		{
			this.setupOrthoCamera()
			return 
		}
		
		if (e.keyCode == 222) // '
		{
			this.setupPerspectiveCamera()
			return 
		}
		
		Keyboard.shiftKey = e.shiftKey
		//console.log("Keyboard.shiftKey " + Keyboard.shiftKey)
		// track down key to avoid key repeats
		if (this.downKeys()[e.keyCode]) 
		{
			return;
		}
		
		this.downKeys()[e.keyCode] = true
		
		// choose a layer with number keys, send all other keys to selected layer
		if(this.selectLayerWithEvent(e) == false)
		{
			var layer = this.selectedLayer()
			//console.log("sending to layer " + layer)
			if (layer && layer.keydown)
			{
				layer.keydown(e)
			}			
		}		
	},
	
	keyup: function(e)
	{
		this.downKeys()[e.keyCode] = false 
		
		if(this.selectLayerWithEvent(e) == false)
		{
			var layer = this.selectedLayer()
			if (layer && layer.keyup)
			{
				layer.keyup(e)
			}			
		}
	},
})

Keyboard = {}

/*
Keyboard.shiftKey = e.shiftKey
Keyboard.altKey   = e.altKey
Keyboard.ctrlKey  = e.ctrlKey
var retChar = 13
var escChar = 27
var sqChar = 192

var char = String.fromCharCode(e.keyCode).toLowerCase()
var space = 32

if (e.keyCode == 32)
{
}
*/

