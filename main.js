import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { UnrealBloomPass } from 'three-stdlib';  // Using 'three-stdlib' for UnrealBloomPass
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';


// Create scene, camera, and renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);  // Set background to black


const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(5, 2, 0);  // Move camera back to see model
camera.lookAt(0, 0, 0);  // Ensure camera looks at the model's center


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


// Create OrbitControls for camera interaction
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;  // Enable damping (inertia)
controls.dampingFactor = 0.25;
controls.minDistance = 1;       // Set the minimum zoom distance
controls.maxDistance = 50;      // Set the maximum zoom distance
controls.update();


// Add lighting
const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1);  // White light
scene.add(ambientLight);


const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1);
directionalLight.position.set(1, 1, 1).normalize();
scene.add(directionalLight);


const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);


// Add UnrealBloomPass
const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
composer.addPass(bloomPass);


renderer.autoClear = false;


// Load the GLB model
const loader = new GLTFLoader();
loader.load('/background.glb', function (gltf) {
    console.log('Model loaded:', gltf);
    scene.add(gltf.scene);
    gltf.scene.position.set(0, -1, 0);  // Adjust model position
    gltf.scene.scale.set(0.5, 0.5, 0.5); // Adjust model size if needed


   
}, undefined, function (error) {
    console.error('An error occurred while loading the model:', error);
});


// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();  // Update controls in the animation loop
    composer.render();
}
animate();


// Adjust the renderer when the window is resized
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// welcome.js
document.addEventListener('DOMContentLoaded', () => {
  const POP = document.getElementById('Welcome');
  const startButton = document.getElementById('play');

  // Show the pop-up when the page loads
  POP.classList.add('View');

  // Hide the pop-up when the "Let's Start" button is clicked
  startButton.addEventListener('click', () => {
      POP.classList.remove('View');
      POP.classList.add('New');
  });
});


// Function to create the hidden box object
export function createHiddenObject1() {
  const hiddenObject1 = new THREE.Mesh(
      new THREE.SphereGeometry(0.2, 32, 32), // A cube with width, height, and depth of 1 unit
      new THREE.MeshBasicMaterial({ color: 0xff0000 })  // Red color for visibility
  );
  hiddenObject1.position.set(2.1, -0.7, 0.7);  // Set initial position
  hiddenObject1.scale.set(0.1, 0.1, 0.1);
  // hiddenObject2.scale.set(1.5, 1.5, 1.5);
  hiddenObject1.visible = true;  // Initially hidden
  return hiddenObject1;
}


// Add more objects as needed
export function createHiddenObject2() {
  const hiddenObject2 = new THREE.Mesh(
      new THREE.SphereGeometry(0.42, 20, 20),
      new THREE.MeshBasicMaterial({ color: 0x00ff00 })  // Green color for visibility
  );
  hiddenObject2.position.set(0.45, 0, -1.26);  // Position object somewhere
  hiddenObject2.scale.set(0.12, 0.12, 0.12);  // Makes the sphere 0.5x larger in all directions
  hiddenObject2.visible = true;  // Initially hidden
  return hiddenObject2;
}


function createHiddenObject3() {
  const hiddenObject3 = new THREE.Mesh(
      new THREE.SphereGeometry(0.04, 8, 8),  // Adjust size here if needed
      new THREE.MeshBasicMaterial({ color: 0x0000ff })  // Blue color for visibility
  );
  hiddenObject3.position.set(1, -0.8, -0.5);  // Position for the "Skills" object
  hiddenObject2.scale.set(0.1, 0.1, 0.1);
  hiddenObject3.visible = true;  // Initially hidden
  return hiddenObject3;
}


function createHiddenObject4() {
  const hiddenObject4 = new THREE.Mesh(
      new THREE.SphereGeometry(0.02, 6, 6),  // Adjust size here if needed
      new THREE.MeshBasicMaterial({ color: 0xffff00 })  // Yellow color for visibility
  );
  hiddenObject4.position.set(-1.9, 1.15, -2.7);  // Position for the "Projects" object
  hiddenObject2.scale.set(0.01, 0.01, 0.1);
  hiddenObject4.visible = true;  // Initially hidden
  return hiddenObject4;
}


// Create and add objects from objects.js
const hiddenObject1 = createHiddenObject1();
scene.add(hiddenObject1);


const hiddenObject2 = createHiddenObject2();
scene.add(hiddenObject2);


const hiddenObject3 = createHiddenObject3();
scene.add(hiddenObject3);


const hiddenObject4 = createHiddenObject4();
scene.add(hiddenObject4);


// Raycaster and mouse for interaction
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();


function onMouseClick(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;


  raycaster.setFromCamera(mouse, camera);


  const intersects = raycaster.intersectObjects(scene.children);
  console.log('Intersects:', intersects);  // Log intersects to debug


  if (intersects.length > 0) {
      const clickedObject = intersects[0].object;


      console.log('Clicked Object:', clickedObject);  // Log clicked object for debugging


      let message = "";  // Create a variable to hold the message
    


      if (clickedObject === hiddenObject1) {
          hiddenObject1.visible = true;  // Reveal the hidden object
          console.log('Hidden Object 1 clicked:', hiddenObject1.visible);  // Log visibility
          message = "I have the knowledge of Web Development(HTML, CSS, JS, Node js), programming languages: Python, C++, C.\n Level 3: 📍Find a yellow ball (hint:Street light)";
      } else if (clickedObject === hiddenObject2) {
          hiddenObject2.visible = true;  // Reveal the second hidden object
          console.log('Hidden Object 2 clicked:', hiddenObject2.visible);  // Log visibility
          message = "Congratulations on unloacking all the levels.\n Here, you go!🏆🏅" ;
      } else if (clickedObject === hiddenObject3) {
        hiddenObject3.visible = true;
        message = "Hii! My name is Pallavi Singh. \n Currently I'm pursuing M.Sc in Informatics from Institute of Informatics and Communication, University of Delhi.I am a Tech Fanatic Guy. \n Level 2: 📍Find a red ball (hint: Observe the Car)";
      } else if (clickedObject === hiddenObject4) {
        hiddenObject4.visible = true;
        message = "I have worked on project of FullStack Web Development, ML and DS.\n Exploring Google Cloud now!\n Level 4: 📍Find a green ball and collect your rewards🎉 (hint:look at roofs)";
      }


      // Display the custom popup with the message
      if (message) {
        document.getElementById('BOX-message').innerText = message;
        document.getElementById('BOX').style.display = 'flex';
      }


      if (message) {
        document.getElementById('BOX-message').innerText = message;
        document.getElementById('BOX').style.display = 'flex';  // Trigger popup display
    }
   


    }
  }


  // Close the popup when the "Close" button is clicked
document.getElementById('close-BOX').addEventListener('click', function () {
  document.getElementById('BOX').style.display = 'none';
});
 


// Add event listener for mouse clicks
window.addEventListener('click', onMouseClick, false);

'use strict';

// popup.js
document.addEventListener('DOMContentLoaded', () => {
  const contactImage = document.getElementById('contact');
  const popup = document.getElementById('popup'); // Get the popup element

  // Show the pop-up when the contact image is clicked
  contactImage.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent click from bubbling up
      popup.classList.remove('popup-hidden'); // Show the pop-up
      popup.classList.add('popup-visible'); // Add class to make it visible
  });

  // Close the pop-up when the close button is clicked
  document.getElementById('close-popup').addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent click from bubbling up
      popup.classList.remove('popup-visible'); // Hide the pop-up
      popup.classList.add('popup-hidden'); // Add class to hide
  });

  // Close the pop-up when clicking outside of it
  window.addEventListener('click', (e) => {
      if (!popup.contains(e.target) && e.target !== contactImage) {
          popup.classList.remove('popup-visible'); // Hide the pop-up
          popup.classList.add('popup-hidden'); // Add class to hide
      }
  });
});
