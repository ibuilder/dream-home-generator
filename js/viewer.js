// Global variables for Three.js
let scene, camera, renderer, controls;
let houseModel = null;

// Initialize the 3D viewer
function initViewer() {
  // Create scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf0f0f0);
  
  // Create camera
  camera = new THREE.PerspectiveCamera(75, $('#viewer-container').width() / $('#viewer-container').height(), 0.1, 1000);
  camera.position.set(10, 5, 10);
  
  // Create renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize($('#viewer-container').width(), $('#viewer-container').height());
  renderer.shadowMap.enabled = true;
  $('#viewer-container').append(renderer.domElement);
  
  // Add orbit controls
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  
  // Add lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(10, 20, 10);
  directionalLight.castShadow = true;
  scene.add(directionalLight);
  
  // Add ground
  const groundGeometry = new THREE.PlaneGeometry(50, 50);
  const groundMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x7ec850,
    roughness: 0.8,
    metalness: 0.2
  });
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.1;
  ground.receiveShadow = true;
  scene.add(ground);
  
  // Grid helper
  const gridHelper = new THREE.GridHelper(50, 50);
  scene.add(gridHelper);
  
  // Create placeholder house
  createPlaceholderHouse();
  
  // Start animation loop
  animate();
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

// Window resize handler
function onWindowResize() {
  camera.aspect = $('#viewer-container').width() / $('#viewer-container').height();
  camera.updateProjectionMatrix();
  renderer.setSize($('#viewer-container').width(), $('#viewer-container').height());
}

// Reset the camera view
function resetView() {
  camera.position.set(10, 5, 10);
  controls.target.set(0, 0, 0);
  controls.update();
}

// Toggle between perspective and orthographic views
function toggleViewMode() {
  const isOrtho = camera instanceof THREE.OrthographicCamera;
  
  if (isOrtho) {
    // Switch to perspective
    const aspect = $('#viewer-container').width() / $('#viewer-container').height();
    camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
    camera.position.set(10, 5, 10);
    controls.object = camera;
    $('#view-mode-toggle').html('<i class="fas fa-cube"></i> 3D View');
  } else {
    // Switch to orthographic
    const width = 20;
    const height = width / ($('#viewer-container').width() / $('#viewer-container').height());
    camera = new THREE.OrthographicCamera(-width/2, width/2, height/2, -height/2, 0.1, 1000);
    camera.position.set(10, 10, 10);
    controls.object = camera;
    $('#view-mode-toggle').html('<i class="fas fa-cube"></i> Ortho View');
  }
  
  controls.update();
}

// Show floor plan view (top-down orthographic)
function showFloorPlan() {
  // Switch to top-down orthographic view
  const width = 30;
  const height = width / ($('#viewer-container').width() / $('#viewer-container').height());
  camera = new THREE.OrthographicCamera(-width/2, width/2, height/2, -height/2, 0.1, 1000);
  camera.position.set(0, 20, 0);
  camera.lookAt(0, 0, 0);
  controls.object = camera;
  controls.update();
}