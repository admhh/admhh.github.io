import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

var scene_created = false;

export function createScene() {

    if (!scene_created) {

        // https://github.com/dgreenheck/threejs-gltf-import/blob/main/main.js

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.outputColorSpace = THREE.SRGBColorSpace;

        function resizeWindow() {
            if (window.innerWidth <= 700) {
                renderer.setSize(window.innerWidth / 3, window.innerWidth / 3);
            } else {
                renderer.setSize(window.innerWidth / 6, window.innerWidth / 6);
            }
        }

        resizeWindow();

        
        renderer.setClearColor(0x000000);
        renderer.setPixelRatio(window.devicePixelRatio);

        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        // add the renderer to the document
        // document.body.appendChild(renderer.domElement);
        const container = document.getElementById('frog-container');
        container.appendChild(renderer.domElement);

        renderer.domElement.className = "image-small";

        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(45, 1, 1, 1000);
        // position the camera far away and zoomed in to get an orthographic effect
        camera.position.set(0, 2, 110);
        camera.zoom = 31.0;
        camera.updateProjectionMatrix();
        scene.add(camera);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.enablePan = false;
        controls.enableZoom = true;
        controls.minDistance = 50;
        controls.maxDistance = 200;
        // controls.minPolarAngle = 0.5;
        // controls.maxPolarAngle = 1.5;
        controls.autoRotate = false;
        controls.target = new THREE.Vector3(0, 1, 0);
        controls.update();

        // const groundGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);
        // groundGeometry.rotateX(-Math.PI / 2);
        // const groundMaterial = new THREE.MeshStandardMaterial({
        // color: 0x555555,
        // side: THREE.DoubleSide
        // });
        // const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
        // groundMesh.castShadow = false;
        // groundMesh.receiveShadow = true;
        // scene.add(groundMesh);

        const spotLight = new THREE.SpotLight(0xffffff, 1, 0, Math.PI, 1, 0);
        spotLight.position.set(4000, 5000, 11000);
        spotLight.lookAt(new THREE.Vector3(0, 0, 0));
        spotLight.castShadow = true;
        spotLight.shadow.bias = -0.0001;
        camera.add(spotLight);

        // const pointLight = new THREE.PointLight( 0xffffff );
        // pointLight.position.set(4,5,11);
        // camera.add(pointLight);

        const loader = new OBJLoader();

        loader.load(
            './three-js/frog.obj',
            function(object) {
                // when the frog is loaded, first extract the mesh
                const frog_mesh = object.children[0];

                // then give the mesh a material
                const mesh_material = new THREE.MeshPhongMaterial({color:0xeeeeee, specular:0xffffff, shininess:4, emissive:0x000000});
                mesh_material.flatShading = true;
                frog_mesh.material = mesh_material;
            
                frog_mesh.geometry.computeVertexNormals();
                frog_mesh.geometry.normalizeNormals();

                frog_mesh.scale.x = 0.01;
                frog_mesh.scale.y = 0.01;
                frog_mesh.scale.z = 0.01;

                frog_mesh.rotateZ(-Math.PI / 2);
                frog_mesh.position.set(-1.5, 2.51, 0);

                frog_mesh.castShadow = true;
                frog_mesh.receiveShadow = true;

                console.log(frog_mesh);

                scene.add(frog_mesh);
            },
            function(xhr) {
                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
            },
            function ( error ) {
                console.log( 'An error happened' );
            }
        );

        // const dirLight = new THREE.DirectionalLight(0xffffff, 1.0);
        // dirLight.castShadow = true;
        // dirLight.position.set(-1, 1, -1);

        const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
        scene.add(ambientLight);


        window.addEventListener('resize', () => {
            resizeWindow();
        });

        function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
        }

        animate();

        scene_created = true;
    }
}