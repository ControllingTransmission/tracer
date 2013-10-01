
document.addEventListener("DOMContentLoaded", function () { Visual.go () }, false)
function run()
{
	init();
	objects = [CubesGroup.clone().open(), ScanLinesGroup.clone().open()]
	//objects = [Square.clone().open()]
	animate()	
	document.body.style.backgroundColor = "red"
}

document.addEventListener("DOMContentLoaded", run, false)

function setupWebGl()
{
	container = document.createElement('div');
	document.body.appendChild(container);
	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(window.innerWidth, window.innerHeight);
	container.appendChild(renderer.domElement);
	scene = new THREE.Scene();	
}

function init()
{
	sharedProjector = new THREE.Projector();

	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 4000);
	camera.position.x = 0;
	camera.position.y = 0;
	camera.position.z = 1200;
	
	camera.lookAt(new THREE.Vector3(0, 0, 0));
	setupWebGl()	
	
	window.addEventListener('resize', onWindowResize, false);

	scene.add(new THREE.AmbientLight( 0x222222));

	light = new THREE.DirectionalLight(0xffffff);
	light.position.set(0, 50, 50);
	light.target.position.set(0, 0, 0);
	scene.add(light)
		
	setupBindings()
}

function onWindowResize() 
{
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

function initPostprocessing() {

	postprocessing.scene = new THREE.Scene();

	postprocessing.camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2,  window.innerHeight / 2, window.innerHeight / - 2, -10000, 10000 );
	postprocessing.camera.position.z = 100;

	postprocessing.scene.add( postprocessing.camera );

	var pars = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBFormat };
	postprocessing.rtTextureDepth = new THREE.WebGLRenderTarget( window.innerWidth, height, pars );
	postprocessing.rtTextureColor = new THREE.WebGLRenderTarget( window.innerWidth, height, pars );



	var bokeh_shader = THREE.BokehShader;

	postprocessing.bokeh_uniforms = THREE.UniformsUtils.clone( bokeh_shader.uniforms );

	postprocessing.bokeh_uniforms[ "tColor" ].value = postprocessing.rtTextureColor;
	postprocessing.bokeh_uniforms[ "tDepth" ].value = postprocessing.rtTextureDepth;

	postprocessing.bokeh_uniforms[ "textureWidth" ].value = window.innerWidth;

	postprocessing.bokeh_uniforms[ "textureHeight" ].value = height;

	postprocessing.materialBokeh = new THREE.ShaderMaterial( {

		uniforms: postprocessing.bokeh_uniforms,
		vertexShader: bokeh_shader.vertexShader,
		fragmentShader: bokeh_shader.fragmentShader,
		defines: {
			RINGS: shaderSettings.rings,
			SAMPLES: shaderSettings.samples
		}

	} );

	postprocessing.quad = new THREE.Mesh( new THREE.PlaneGeometry( window.innerWidth, window.innerHeight ), postprocessing.materialBokeh );
	postprocessing.quad.position.z = - 500;
	postprocessing.scene.add( postprocessing.quad );

}

function shaderUpdate() {
	postprocessing.materialBokeh.defines.RINGS = shaderSettings.rings;
	postprocessing.materialBokeh.defines.SAMPLES = shaderSettings.samples;

	postprocessing.materialBokeh.needsUpdate = true;

}

function animate() 
{
	requestAnimationFrame(animate);
	TWEEN.update();
	objects.forEach(function(obj) { obj.update() })
	render();
	
	
	// if (Math.random()>.5)
	// {
	// 	document.body.style.backgroundColor = "red"
	// }
	// else if (Math.random()>.5)
	// {
	// 	document.body.style.backgroundColor = "white"
	// }
	// else
	// {
	// 	document.body.style.backgroundColor = "blue"
	// }
	

}

function render()
{
	renderer.render(scene, camera);
}

function setupBindings()
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
		objects.forEach(function (obj) { if (obj.keydown) { obj.keydown(e) } })
	})
}
