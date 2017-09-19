var textGeo = function () {
    

var renderer,
    scene,
    camera,
    myCanvas = document.getElementById('myCanvas');

//RENDERER
renderer = new THREE.WebGLRenderer({ canvas: myCanvas, antialias: true });
renderer.setClearColor(0x000000);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

//CAMERA
camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 3000);

//SCENE
scene = new THREE.Scene();
scene.background = new THREE.Color(0x0b2548);

//LIGHTS
var light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);

var light2 = new THREE.PointLight(0xffffff, 0.5);
scene.add(light2);


//3D text
var mesh;
var loader = new THREE.FontLoader();
loader.load('fonts/droid/droid_sans_bold.typeface.json', function (font) {
    console.log("calling init threejs");
    init(font);
});

// https://threejs.org/docs/#api/geometries/Texgeometry
function init(font) {
    // var theText = "BATOU";
    var theText = document.getElementById("inputText").value;
    console.log(theText);

    var geometry = new THREE.Texgeometry(theText, {
        font: font,
        size: 80,
        height: 20,
        curveSegments: 2,
        bevelEnabled: true,
        bevelThickness: 5,
        bevelSize: 6,
        bevelSegments: 5
    });


    // center the geometry
    // - THREE.Texgeometry isnt centered for unknown reasons. all other geometries are centered
    geometry.computeBoundingBox();
    var center = new THREE.Vector3();
    center.x = (geometry.boundingBox.max.x - geometry.boundingBox.min.x) / 2;
    center.y = (geometry.boundingBox.max.y - geometry.boundingBox.min.y) / 2;
    center.z = (geometry.boundingBox.max.z - geometry.boundingBox.min.z) / 2;
    geometry.vertices.forEach(function (vertex) {
        vertex.sub(center);
    });


    var material = new THREE.MeshLambertMaterial({ color: 0x326fbd });

    mesh = new THREE.Mesh(geometry, material);

    mesh.position.x = 0;
    mesh.position.y = 0;
    mesh.position.z = -1000;

    //Init the render motor
    renderer = new THREE.WebGLRenderer({ canvas: myCanvas, antialias: true });
    //if the browser does not support it:
    // renderer = new THREE.CanvasRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    var container = document.getElementById('contenu');
    renderer.domElement.style.position = "relative";
    container.appendChild(renderer.domElement);


    scene.add(mesh);
    //RENDER LOOP
    render();
}

function render() {

    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;
    renderer.render(scene, camera);

    requestAnimationFrame(render);

}


}();
