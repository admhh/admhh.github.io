// "use strict"; // https://stackoverflow.com/q/1335851/72470
                
//                 // aspect ratio
//                 aspect = 1;

//                 // create a basic scene and camera
//                 // initialise the scene, and draw it for the first time.
//                 init();
//                 animate();

//                 // Scene initialisation. This function is only run once, at the very beginning.
//                 async function init() {
//                     scene = new THREE.Scene();

//                     // Set up the camera, move it to (3, 4, 5) and look at the origin (0, 0, 0).
//                     camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
//                     camera.position.set(3, 4, 5);
//                     camera.lookAt(new THREE.Vector3(0, 0, 0));

//                     // Draw a helper grid in the x-z plane (note: y is up).
//                     scene.add(new THREE.GridHelper(10, 20, 0xffffff));

//                     // take line code from documentation https://threejs.org/docs/#api/en/geometries/CylinderGeometry 

//                     const geometry_axis = new THREE.CylinderGeometry(0.0035,0.0035,100,100);

//                     const materialX = new THREE.MeshBasicMaterial( {color: 0xff0000});
//                     x_axis = new THREE.Mesh(geometry_axis, materialX);
//                     scene.add(x_axis);
//                     x_axis.rotation.z += Math.PI / 2;
//                     const materialY = new THREE.MeshBasicMaterial( {color: 0x00ff00});
//                     y_axis = new THREE.LineSegments(geometry_axis, materialY);
//                     scene.add(y_axis);
//                     y_axis.rotation.y += Math.PI / 2;
//                     const materialZ = new THREE.MeshBasicMaterial( {color: 0x0000ff});
//                     z_axis = new THREE.LineSegments(geometry_axis, materialZ);
//                     scene.add(z_axis);
//                     z_axis.rotation.x += Math.PI / 2;


//                     // create a point at the origin for the camera to pivot around
//                     var geometry_pivot = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0,0,0)]);
//                     cameraPivot = new THREE.Points(geometry_pivot, new THREE.PointsMaterial({color:0xff0000,size:0}));
//                     scene.add(cameraPivot);

//                     // create a point that the camera can translate off of
//                     var geometry_frame = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(3,4,5)]);
//                     cameraFrame = new THREE.Points(geometry_frame, new THREE.PointsMaterial({color:0xff0000,size:0}));
//                     scene.add(cameraFrame);
//                     cameraFrame.material.transparent = true;
//                     cameraPivot.add(cameraFrame);
//                     cameraPivot.add(camera);
//                     // Basic ambient lighting.
//                     scene.add(new THREE.AmbientLight(0xA0A0A0));
//                     // TASK: add more complex lighting for 'face' rendering mode (requirement 4).
//                     var dirLight = new THREE.DirectionalLight(0xffffff, 1);
//                     dirLight.translateX(-1);
//                     dirLight.translateZ(0.5);
//                     scene.add(dirLight);

//                     // Set up the Web GL renderer.
//                     renderer = new THREE.WebGLRenderer({ antialias: true });
//                     renderer.setPixelRatio(window.devicePixelRatio); // HiDPI/retina rendering
//                     renderer.setSize(window.innerWidth, window.innerHeight);
//                     document.body.appendChild(renderer.domElement);

//                     // Handle resizing of the browser window.
//                     window.addEventListener('resize', handleResize, false);

//                     // const geometry_bunny = new THREE.BufferGeometry();

//                     // // load the bunny
//                     // // https://threejs.org/docs/#examples/en/loaders/OBJLoader
//                     // let bunnyPromise = new Promise(function(resolve) {
//                     //     const loader = new THREE.OBJLoader();
//                     //     loader.load(
//                     //         'bunny-5000.obj',
//                     //         function(object) {
//                     //             // load the bunny and return it
//                     //             console.log(object);
//                     //             var b = object.children[0]; // access the mesh contained in object
//                     //             resolve(b);
//                     //         },
//                     //         function(xhr) {
//                     //             console.log((xhr.loaded / xhr.total * 100) + '% loaded');
//                     //         },
//                     //         function(error) {
//                     //             console.log('An error happened');
//                     //         }
//                     //     );
//                     // });
//                     // BUNNY_MASTER = await bunnyPromise;
//                     // BUNNY_MASTER.material = MATERIAL_BUNNY;
//                     // bunny = BUNNY_MASTER.clone();
//                     // bunny.geometry.computeVertexNormals();
//                     // bunny.geometry.normalizeNormals();
//                     // bunnyPivot.add(bunny);
                    
//                     // boundBunny();

//                     // // add a texture to the cube
//                     // const textureLoader = new THREE.TextureLoader();
//                     // textureLoader.setPath('textures/');

//                     // let cubePromise = new Promise(function(resolve) {
//                     //     var ct = [
//                     //         new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load('textures/yellow_concrete.png'), color:CUBE_COLOR, specular:CUBE_SPECULAR, shininess:CUBE_SHININESS, emissive:CUBE_EMISSIVE}),
//                     //         new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load('textures/yellow_concrete_powder.png'), color:CUBE_COLOR, specular:CUBE_SPECULAR, shininess:CUBE_SHININESS, emissive:CUBE_EMISSIVE}),
//                     //         new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load('textures/yellow_glazed_terracotta.png'), color:CUBE_COLOR, specular:CUBE_SPECULAR, shininess:CUBE_SHININESS, emissive:CUBE_EMISSIVE}),
//                     //         new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load('textures/yellow_terracotta.png'), color:CUBE_COLOR, specular:CUBE_SPECULAR, shininess:CUBE_SHININESS, emissive:CUBE_EMISSIVE}),
//                     //         new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load('textures/yellow_wool.png'), color:CUBE_COLOR, specular:CUBE_SPECULAR, shininess:CUBE_SHININESS, emissive:CUBE_EMISSIVE}),
//                     //         new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load('textures/yellow_shulker_box.png'), color:CUBE_COLOR, specular:CUBE_SPECULAR, shininess:CUBE_SHININESS, emissive:CUBE_EMISSIVE})
//                     //     ];
//                     //     resolve(ct);
//                     // });

//                     // MATERIAL_CUBE = await cubePromise;
//                     // cube.material = MATERIAL_CUBE;

//                 }

//             function handleResize() {
//                 camera.aspect = window.innerWidth / window.innerHeight;
//                 camera.updateProjectionMatrix();
//                 renderer.setSize(500, 500);
//             }

//             function animate() {
//                 requestAnimationFrame(animate);
//             }



import * as THREE from 'three';

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.outputColorSpace = THREE.SRGBColorSpace;

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor("#000000");
renderer.setPixelRatio(window.devicePixelRatio);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, 1, 1, 1000)
camera.position.set(4, 5, 11);

const groundGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);
groundGeometry.rotateX(-Math.PI / 2);
const groundMaterial = new THREE.MeshStandardMaterial({
    color: '#555555',
    side: THREE.DoubleSide
});
const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
scene.add(groundMesh);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();

console.log("script ran")