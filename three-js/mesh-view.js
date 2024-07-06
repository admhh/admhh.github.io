import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

var scene_created = false;
var frog_grabbed = false;

export function createScene() {

    if (!scene_created) {

        // https://github.com/dgreenheck/threejs-gltf-import/blob/main/main.js

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.outputColorSpace = THREE.SRGBColorSpace;

        const small_scale = 1 / 3;
        const large_scale = 1 / 6;

        const image = document.getElementById('dissertation-frog-image');

        function resizeWindow() {

            const orientation = document.getOrientation();
            
            // resize the canvas
            if (orientation == 'portrait') {
                renderer.setSize(window.innerWidth * small_scale, window.innerWidth * small_scale, false);
            } else {
                renderer.setSize(window.innerWidth * large_scale, window.innerWidth * large_scale, false);
            }

            // resize the image while we're at it

            if (image != [] && image != null) {
                if (orientation == 'portrait') {
                    image.style.width = window.innerWidth * small_scale;
                    image.style.height = window.innerWidth * small_scale;
                } else {
                    image.style.width = window.innerWidth * large_scale;
                    image.style.height = window.innerWidth * large_scale;
                }
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
        renderer.domElement.style.marginLeft = "10%";
        renderer.domElement.style.marginRight = "10%";
        renderer.domElement.style.cursor = "pointer";
        renderer.domElement.id = "frog-renderer";

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
        controls.autoRotateSpeed = 2.5;
        controls.target = new THREE.Vector3(0, 1, 0);
        controls.update();

        // when the frog is grabbed, stop autorotate
        renderer.domElement.addEventListener('click', function () {
            controls.autoRotate = false;
            frog_grabbed = true;
        });

        const spotLight = new THREE.SpotLight(0xffffff, 1, 0, Math.PI, 1, 0);
        spotLight.position.set(4000, 5000, 11000);
        spotLight.lookAt(new THREE.Vector3(0, 0, 0));
        spotLight.castShadow = true;
        spotLight.shadow.bias = -0.0001;

        spotLight.shadow.camera.left = -200;
        spotLight.shadow.camera.right = 200;
        spotLight.shadow.camera.top = 200;
        spotLight.shadow.camera.bottom = -200;

        camera.add(spotLight);

        // get site colour 
        const colour = getComputedStyle(document.body).getPropertyValue('--secondary-colour');

        // create loading circle
        var geometry = new THREE.CircleGeometry( 0.6, 6, 1.5 * Math.PI, 0); 
        var material = new THREE.MeshBasicMaterial( { color: colour } ); 
        material.side = THREE.DoubleSide;
        var circle = new THREE.Mesh( geometry, material ); 
        circle.rotateY(Math.PI);
        circle.translateY(1);
        scene.add( circle );

        var progress = 0.0;

        const loader = new OBJLoader();

        var frog_original;
        var frog_corrupted;

        // regular frog
        loader.load(
            './three-js/frog.obj',
            function(object) {
                // when the frog is loaded, first extract the mesh
                const frog_mesh = object.children[0];

                // then give the mesh a material
                const mesh_material = new THREE.MeshPhongMaterial({color:0xeeeeee, specular:0xffffff, shininess:4, emissive:0x000000});
                mesh_material.flatShading = true;
                mesh_material.side = THREE.DoubleSide;
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

                frog_mesh.name = 'frog';

                controls.autoRotate = true;

                scene.add(frog_mesh);
                
                frog_original = frog_mesh;

                scene.remove(circle);
            },
            function(xhr) {

                if (( xhr.loaded / xhr.total ) >= progress) {
                    progress += 0.05;
                    scene.remove(circle);
                    geometry = new THREE.CircleGeometry(
                        0.6,
                        40,
                        0.5 * Math.PI,
                        // 0,
                        // Math.PI * 2 * ( xhr.loaded / xhr.total )
                        Math.PI * 2 * progress
                    );
                    material = new THREE.MeshBasicMaterial( { color: colour } ); 
                    circle = new THREE.Mesh( geometry, material ); 
                    material.side = THREE.DoubleSide;
                    circle.rotateY(Math.PI);
                    circle.translateY(1);
                    scene.add( circle );

                }

                
            },
            function ( error ) {
                console.log( 'An error happened' );
            }
        );
        
        // corrupted frog
        loader.load(
            './three-js/frog-corrupted.obj',
            function(object) {
                // when the frog is loaded, first extract the mesh
                const frog_mesh = object.children[0];

                // then give the mesh a material
                const mesh_material = new THREE.MeshPhongMaterial({color:0xeeeeee, specular:0xffffff, shininess:4, emissive:0x000000});
                mesh_material.flatShading = true;
                mesh_material.side = THREE.DoubleSide;
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

                frog_mesh.name = 'frog-corrupted';

                frog_mesh.visible = false;

                scene.add(frog_mesh);

                frog_corrupted = frog_mesh;

                scene.remove(circle);
            },
            function(xhr) {

            },
            function ( error ) {
                console.log( 'An error happened' );
            }
        );

        const ambientLight = new THREE.AmbientLight(0xaaaaaa, 0.7);
        scene.add(ambientLight);


        window.addEventListener('resize', () => {
            resizeWindow();
        });


        function animate() {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        }
        
        // deactivate three js when off screen
        let options = {
            rootMargin: "0px",
            threshold: 0.1,
        };
        
        let observer = new IntersectionObserver(function (entries) {
            if (!entries[0].isIntersecting) {
                try {
                    controls.autoRotate = false;
                } catch {
                // not much to do yet
                }
            } else {
                if (!frog_grabbed && frog_original != null) {
                    controls.autoRotate = true;
                }
            }
        }, options);
        
        const target = document.getElementById("frog-renderer");
        observer.observe(target);

        animate();

        const frog_original_button = document.getElementById('frog-original-button');
        const frog_corrupted_button = document.getElementById('frog-corrupted-button');

        console.log(scene);

        frog_original_button.onclick = function () {

            frog_original_button.className = 'selected';
            frog_corrupted_button.className = '';

            document.frog_prefix = '';

            image.src = "./imgs/frogs/" + document.frog_prefix + document.frog_index + ".png";

            frog_original.visible = true;
            frog_corrupted.visible = false;
        }

        frog_corrupted_button.onclick = function () {

            frog_original_button.className = '';
            frog_corrupted_button.className = 'selected';

            document.frog_prefix = 'corrupted-';

            image.src = "./imgs/frogs/" + document.frog_prefix + document.frog_index + ".png";

            frog_original.visible = false;
            frog_corrupted.visible = true;
        }

        scene_created = true;
    }
}