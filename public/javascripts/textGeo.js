
var renderer,
    scene,
    camera;
myCanvas = document.getElementById('threecanvas');
canvasWidth = myCanvas.parentNode.clientWidth;
canvasHeight = myCanvas.parentNode.clientHeight;
console.log("myCanvas ", myCanvas);
console.log(canvasWidth);
console.log(canvasHeight);


//RENDERER
renderer = new THREE.WebGLRenderer({ canvas: myCanvas, antialias: true, alpha: true });
renderer.setClearColor(0x000000);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(canvasWidth, canvasHeight);

//CAMERA
camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 3000);

//SCENE
scene = new THREE.Scene();
scene.background = new THREE.Color(255, 255, 255);

//LIGHTS
var light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);

var light2 = new THREE.PointLight(0xffffff, 0.5);
scene.add(light2);


// Parameters from the url: #text&fontSel& ...
//Take the string after the '#'
var hash = document.location.hash.substr(1);
//Store in an array the paramaters that are separated by '&'
var hashParams = hash.split('&');

//Store the parameters in a JSON, taking into account that we know the order in the string 
var params = {  textHash: hashParams[0] || "BATOU",  //"BATOU" is the text by default
                fontSel: hashParams[1] || 0};        //by default the first font

//Store the paths of all the fonts in our project following the same order as in the dropdown menu
var fontsTable = [  "../public/fonts/helvetiker_regular.typeface.json", 
'../public/fonts/optimer_regular.typeface.json',
'../public/fonts/gentilis_regular.typeface.json',
'../public/fonts/droid/droid_sans_regular.typeface.json',
'../public/fonts/droid/droid_serif_regular.typeface.json'   ];

//Choose the font path associated to the dropdown menu selected item
var fontSelPath = fontsTable[+params.fontSel];


//3D TEXT
var mesh;
var loader = new THREE.FontLoader();
loader.load(fontSelPath, function (font) {
    console.log("calling init threejs");
    init(font);
});

function init(font) {    
    // https://threejs.org/docs/#api/geometries/TextGeometry
    var geometry = new THREE.TextGeometry(params.textHash, {
        font: font,
        size: 80,
        height: 20,
        curveSegments: 10,
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

    //Lambert material reacts to the light
    var material = new THREE.MeshLambertMaterial({ color: 0x326fbd });

    mesh = new THREE.Mesh(geometry, material);

    mesh.position.x = 0;
    mesh.position.y = 0;
    mesh.position.z = -700;

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



