// Global variables for measurement tools
let measurementMode = false;
let markupMode = false;
let measureStartPoint = null;
let measureEndPoint = null;
let measurementLine = null;
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();
let markupLabels = [];

// Toggle measurement mode on/off
function toggleMeasurementMode() {
  measurementMode = !measurementMode;
  
  if (measurementMode) {
    markupMode = false;
    $('#toggle-measurement').addClass('active');
    $('#toggle-markup').removeClass('active');
    $('.measurement-info').removeClass('d-none');
    resetMeasurement();
  } else {
    $('#toggle-measurement').removeClass('active');
    $('.measurement-info').addClass('d-none');
    removeMeasurementLine();
  }
}

// Toggle markup mode on/off
function toggleMarkupMode() {
  markupMode = !markupMode;
  
  if (markupMode) {
    measurementMode = false;
    $('#toggle-markup').addClass('active');
    $('#toggle-measurement').removeClass('active');
    $('.measurement-info').addClass('d-none');
    removeMeasurementLine();
  } else {
    $('#toggle-markup').removeClass('active');
  }
}

// Handle mouse clicks in the viewer
function onMouseClick(event) {
  if (!measurementMode && !markupMode) return;
  
  // Convert mouse position to normalized device coordinates
  const rect = renderer.domElement.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  
  // Set up raycaster
  raycaster.setFromCamera(mouse, camera);
  
  // Find intersections
  const intersects = raycaster.intersectObjects(scene.children, true);
  
  if (intersects.length > 0) {
    const intersectionPoint = intersects[0].point;
    
    if (measurementMode) {
      handleMeasurementClick(intersectionPoint);
    } else if (markupMode) {
      createMarkup(intersectionPoint);
    }
  }
}

// Handle mouse movement for measurement line
function onMouseMove(event) {
  if (!measurementMode || !measureStartPoint) return;
  
  // Convert mouse position to normalized device coordinates
  const rect = renderer.domElement.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  
  // Set up raycaster
  raycaster.setFromCamera(mouse, camera);
  
  // Find intersections
  const intersects = raycaster.intersectObjects(scene.children, true);
  
  if (intersects.length > 0) {
    const intersectionPoint = intersects[0].point;
    updateMeasurementLine(intersectionPoint);
  }
}

// Handle measurement point placement
function handleMeasurementClick(point) {
  if (!measureStartPoint) {
    // First click - set start point
    measureStartPoint = point.clone();
    createMeasurementPoint(point, 0xff0000);
  } else {
    // Second click - set end point and finalize
    measureEndPoint = point.clone();
    createMeasurementPoint(point, 0x0000ff);
    finalizeMeasurement();
  }
}

// Create a visual point for measurement
function createMeasurementPoint(position, color) {
  const geometry = new THREE.SphereGeometry(0.1, 16, 16);
  const material = new THREE.MeshBasicMaterial({ color: color });
  const point = new THREE.Mesh(geometry, material);
  point.position.copy(position);
  scene.add(point);
}

// Update the measurement line during movement
function updateMeasurementLine(endPoint) {
  // Remove existing line
  removeMeasurementLine();
  
  // Create new temporary line
  const points = [measureStartPoint, endPoint];
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ color: 0xffff00, linewidth: 2 });
  measurementLine = new THREE.Line(geometry, material);
  scene.add(measurementLine);
  
  // Update distance display
  const distance = measureStartPoint.distanceTo(endPoint);
  $('#measurement-value').text(distance.toFixed(2));
}

// Finalize the measurement line
function finalizeMeasurement() {
  // Create final measurement line
  const points = [measureStartPoint, measureEndPoint];
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ color: 0x00ff00, linewidth: 3 });
  measurementLine = new THREE.Line(geometry, material);
  scene.add(measurementLine);
  
  // Update distance display
  const distance = measureStartPoint.distanceTo(measureEndPoint);
  $('#measurement-value').text(distance.toFixed(2));
  
  // Reset for next measurement
  resetMeasurement();
}

// Reset measurement state
function resetMeasurement() {
  measureStartPoint = null;
  measureEndPoint = null;
}

// Remove the measurement line
function removeMeasurementLine() {
  if (measurementLine) {
    scene.remove(measurementLine);
    measurementLine = null;
  }
}

// Create a markup annotation in the 3D scene
function createMarkup(position) {
  // Create a unique ID for this markup
  const markupId = 'markup-' + Date.now();
  
  // Create visual element in 3D space
  const geometry = new THREE.SphereGeometry(0.2, 16, 16);
  const material = new THREE.MeshBasicMaterial({ color: 0xff3300 });
  const marker = new THREE.Mesh(geometry, material);
  marker.position.copy(position);
  marker.name = markupId;
  scene.add(marker);
  
  // Create DOM label element
  const markupLabel = document.createElement('div');
  markupLabel.className = 'markup-label';
  markupLabel.id = markupId + '-label';
  markupLabel.innerHTML = `
    <div class="mb-1">Markup #${markupLabels.length + 1}</div>
    <input type="text" class="form-control form-control-sm mb-1" placeholder="Enter note...">
    <button class="btn btn-sm btn-danger" onclick="removeMarkup('${markupId}')">Remove</button>
  `;
  $('#viewer-container').append(markupLabel);
  
  // Add to tracking array
  markupLabels.push({
    id: markupId,
    object: marker,
    element: markupLabel,
    position: position.clone()
  });
  
  // Update labels on next frame
  updateMarkupPositions();
}

// Update the position of markup labels to follow 3D points
function updateMarkupPositions() {
  markupLabels.forEach(markup => {
    // Convert 3D position to screen coordinates
    const position = markup.position.clone();
    position.project(camera);
    
    // Convert to CSS coordinates
    const x = (position.x * 0.5 + 0.5) * $('#viewer-container').width();
    const y = (-position.y * 0.5 + 0.5) * $('#viewer-container').height();
    
    // Position label
    $(markup.element).css({
      left: x + 'px',
      top: y + 'px'
    });
  });
  
  // Request next update
  requestAnimationFrame(updateMarkupPositions);
}

// Remove a markup from the scene
function removeMarkup(id) {
  // Find markup by ID
  const index = markupLabels.findIndex(m => m.id === id);
  if (index !== -1) {
    // Remove 3D object
    scene.remove(markupLabels[index].object);
    
    // Remove DOM element
    $(markupLabels[index].element).remove();
    
    // Remove from tracking array
    markupLabels.splice(index, 1);
  }
}

// Expose removeMarkup function to global scope for the button to work
window.removeMarkup = removeMarkup;