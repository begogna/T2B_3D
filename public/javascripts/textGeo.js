
var renderer,
    scene,
    camera;
myCanvas = document.getElementById('threecanvas');
canvasWidth =myCanvas.parentNode.clientWidth;
canvasHeight =myCanvas.parentNode.clientHeight;
console.log("myCanvas ", myCanvas);
console.log(canvasWidth);
console.log(canvasHeight);


    //RENDERER
    renderer = new THREE.WebGLRenderer({ canvas: myCanvas, antialias: true, alpha: true});
    console.log("dos");
    renderer.setClearColor(0x000000);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(canvasWidth, canvasHeight);
    // renderer.setClearColor(0x000000, 0);

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

    //3D text
    var mesh;
    var loader = new THREE.FontLoader();
    loader.load('../public/fonts/droid/droid_sans_bold.typeface.json', function (font) {
        console.log("calling init threejs");
        init(font);
    });

    // https://threejs.org/docs/#api/geometries/TextGeometry
function init(font) {    
        
        var textHash = "BATOU";
        
        // Take the text from the hash (url after #)
        var hash = document.location.hash.substr( 1 );
    
        // check on lenght 
        if ( hash.length !== 0 ) {
            textHash = hash;
        }
    // for using the hash we need http://localhost:8080/index/#batou
        console.log("the text is ", textHash);
    
        var theText = "BATOU";
        // var theText = document.getElementById('text3D').value;
    
        var geometry = new THREE.TextGeometry(textHash, {
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



