// Initialize the application when DOM is loaded
$(document).ready(function() {
    // Initialize 3D viewer
    initViewer();
    
    // Add event listeners for buttons
    $('#toggle-measurement').click(toggleMeasurementMode);
    $('#toggle-markup').click(toggleMarkupMode);
    $('#reset-view').click(resetView);
    $('#export-ifc').click(exportIFC);
    $('#export-blender').click(exportBlender);
    $('#view-mode-toggle').click(toggleViewMode);
    $('#floor-plan-toggle').click(showFloorPlan);
    $('#generate-btn').click(generateHome);
    
    // Add window resize handler
    window.addEventListener('resize', onWindowResize);
    
    // Add mouse event listeners for the viewer
    renderer.domElement.addEventListener('click', onMouseClick);
    renderer.domElement.addEventListener('mousemove', onMouseMove);
  });