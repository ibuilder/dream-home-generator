// Global variable for the house model
let houseModel = null;

// Create a placeholder house for initial display
function createPlaceholderHouse() {
  // Remove existing house if any
  if (houseModel) {
    scene.remove(houseModel);
  }
  
  houseModel = new THREE.Group();
  
  // Simple house shape
  const houseGeometry = new THREE.BoxGeometry(8, 6, 10);
  const houseMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xe8e8e8,
    roughness: 0.7,
    metalness: 0.1
  });
  const house = new THREE.Mesh(houseGeometry, houseMaterial);
  house.position.y = 3;
  house.castShadow = true;
  house.receiveShadow = true;
  houseModel.add(house);
  
  // Roof
  const roofGeometry = new THREE.ConeGeometry(7, 3, 4);
  const roofMaterial = new THREE.MeshStandardMaterial({
    color: 0x8b4513,
    roughness: 0.8,
    metalness: 0.2
  });
  const roof = new THREE.Mesh(roofGeometry, roofMaterial);
  roof.position.y = 7.5;
  roof.rotation.y = Math.PI / 4;
  roof.castShadow = true;
  houseModel.add(roof);
  
  // Door
  const doorGeometry = new THREE.BoxGeometry(1.5, 3, 0.1);
  const doorMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
  const door = new THREE.Mesh(doorGeometry, doorMaterial);
  door.position.set(0, 1.5, 5.05);
  houseModel.add(door);
  
  // Windows
  const windowGeometry = new THREE.BoxGeometry(1.5, 1.5, 0.1);
  const windowMaterial = new THREE.MeshStandardMaterial({ color: 0x87ceeb });
  
  // Front windows
  const frontWindow1 = new THREE.Mesh(windowGeometry, windowMaterial);
  frontWindow1.position.set(-2.5, 3, 5.05);
  houseModel.add(frontWindow1);
  
  const frontWindow2 = new THREE.Mesh(windowGeometry, windowMaterial);
  frontWindow2.position.set(2.5, 3, 5.05);
  houseModel.add(frontWindow2);
  
  // Side windows
  const sideWindow1 = new THREE.Mesh(windowGeometry, windowMaterial);
  sideWindow1.position.set(-4.05, 3, 2);
  sideWindow1.rotation.y = Math.PI / 2;
  houseModel.add(sideWindow1);
  
  const sideWindow2 = new THREE.Mesh(windowGeometry, windowMaterial);
  sideWindow2.position.set(-4.05, 3, -2);
  sideWindow2.rotation.y = Math.PI / 2;
  houseModel.add(sideWindow2);
  
  const sideWindow3 = new THREE.Mesh(windowGeometry, windowMaterial);
  sideWindow3.position.set(4.05, 3, 2);
  sideWindow3.rotation.y = Math.PI / 2;
  houseModel.add(sideWindow3);
  
  const sideWindow4 = new THREE.Mesh(windowGeometry, windowMaterial);
  sideWindow4.position.set(4.05, 3, -2);
  sideWindow4.rotation.y = Math.PI / 2;
  houseModel.add(sideWindow4);
  
  scene.add(houseModel);
}

// Generate a custom house based on form inputs
function generateHome() {
  $('#loading-overlay').removeClass('d-none');
  
  // Simulate progress
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 5;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(() => {
        createCustomHouse();
        $('#loading-overlay').addClass('d-none');
      }, 500);
    }
    
    $('#generation-progress').css('width', progress + '%').attr('aria-valuenow', progress);
    
    // Update status message
    if (progress < 20) {
      $('#generation-status').text('Analyzing requirements...');
    } else if (progress < 40) {
      $('#generation-status').text('Creating floor plans...');
    } else if (progress < 60) {
      $('#generation-status').text('Building 3D structure...');
    } else if (progress < 80) {
      $('#generation-status').text('Adding details and finishes...');
    } else {
      $('#generation-status').text('Finalizing your dream home...');
    }
  }, 200);
}

// Create a custom house based on user selections
function createCustomHouse() {
  // Get form values
  const squareFootage = $('#square-footage').val();
  const homeType = $('#home-type').val();
  const stories = $('#stories').val();
  const bedrooms = $('#bedrooms').val();
  const bathrooms = $('#bathrooms').val();
  
  // Remove existing house
  if (houseModel) {
    scene.remove(houseModel);
  }
  
  houseModel = new THREE.Group();
  
  // Scale house based on square footage
  const scale = Math.sqrt(squareFootage / 2000);
  const width = 10 * scale;
  const depth = 12 * scale;
  const height = 3.5 * stories;
  
  // Main house structure
  const houseGeometry = new THREE.BoxGeometry(width, height, depth);
  
  // Choose material based on exterior selection
  let exteriorColor;
  switch($('#exterior').val()) {
    case 'brick':
      exteriorColor = 0xb25d4a;
      break;
    case 'vinyl':
      exteriorColor = 0xf5f5f5;
      break;
    case 'wood':
      exteriorColor = 0xcd8c52;
      break;
    case 'stucco':
      exteriorColor = 0xece5dd;
      break;
    case 'stone':
      exteriorColor = 0x8f8f8f;
      break;
    default:
      exteriorColor = 0xf5f5f5;
  }
  
  const houseMaterial = new THREE.MeshStandardMaterial({ 
    color: exteriorColor,
    roughness: 0.7,
    metalness: 0.1
  });
  
  const house = new THREE.Mesh(houseGeometry, houseMaterial);
  house.position.y = height / 2;
  house.castShadow = true;
  house.receiveShadow = true;
  houseModel.add(house);
  
  // Roof
  let roofGeometry;
  let roofHeight = 2;
  
  if (homeType === 'modern') {
    // Flat roof for modern
    roofGeometry = new THREE.BoxGeometry(width + 0.5, 0.5, depth + 0.5);
  } else if (homeType === 'ranch') {
    // Low pitch roof for ranch
    roofGeometry = new THREE.ConeGeometry(Math.max(width, depth) / 1.5, roofHeight, 4);
  } else {
    // Default pitched roof
    roofGeometry = new THREE.ConeGeometry(Math.max(width, depth) / 1.5, roofHeight + (stories * 0.5), 4);
  }
  
  let roofColor;
  switch($('#roof').val()) {
    case 'asphalt':
      roofColor = 0x3d3d3d;
      break;
    case 'metal':
      roofColor = 0x8c8c8c;
      break;
    case 'tile':
      roofColor = 0xb25d4a;
      break;
    case 'slate':
      roofColor = 0x4a6b8c;
      break;
    case 'flat':
      roofColor = 0x2d2d2d;
      break;
    default:
      roofColor = 0x3d3d3d;
  }
  
  const roofMaterial = new THREE.MeshStandardMaterial({
    color: roofColor,
    roughness: 0.8,
    metalness: 0.2
  });
  
  const roof = new THREE.Mesh(roofGeometry, roofMaterial);
  
  if (homeType === 'modern') {
    roof.position.y = height + 0.25;
  } else {
    roof.position.y = height + (roofHeight / 2);
    roof.rotation.y = Math.PI / 4;
  }
  
  roof.castShadow = true;
  houseModel.add(roof);
  
  // Door
  const doorWidth = 1.2;
  const doorHeight = 2.5;
  const doorGeometry = new THREE.BoxGeometry(doorWidth, doorHeight, 0.1);
  const doorMaterial = new THREE.MeshStandardMaterial({ color: 0x5c3c22 });
  const door = new THREE.Mesh(doorGeometry, doorMaterial);
  door.position.set(0, doorHeight / 2, depth / 2 + 0.05);
  houseModel.add(door);
  
  // Windows
  const windowWidth = 1.2;
  const windowHeight = 1.5;
  const windowGeometry = new THREE.BoxGeometry(windowWidth, windowHeight, 0.1);
  
  let windowColor;
  switch($('#windows').val()) {
    case 'single-hung':
    case 'double-hung':
      windowColor = 0x87ceeb;
      break;
    case 'casement':
      windowColor = 0x98d6ea;
      break;
    case 'picture':
      windowColor = 0x78c5d6;
      break;
    case 'bay':
      windowColor = 0x89d2e8;
      break;
    default:
      windowColor = 0x87ceeb;
  }
  
  const windowMaterial = new THREE.MeshStandardMaterial({ 
    color: windowColor,
    opacity: 0.8,
    transparent: true
  });
  
  // Add windows based on number of bedrooms and home size
  const frontWindowCount = Math.min(4, Math.ceil(width / 3));
  const sideWindowCount = Math.min(4, Math.ceil(depth / 3));
  
  // Front windows
  for (let i = 0; i < frontWindowCount; i++) {
    if (i === Math.floor(frontWindowCount / 2) && frontWindowCount % 2 === 1) {
      continue; // Skip the middle position for the door
    }
    
    const spacing = width / (frontWindowCount + 1);
    const xPos = (i + 1) * spacing - width / 2;
    
    // First floor windows
    const frontWindow = new THREE.Mesh(windowGeometry, windowMaterial);
    frontWindow.position.set(xPos, windowHeight / 2 + 1, depth / 2 + 0.05);
    houseModel.add(frontWindow);
    
    // Second floor windows if applicable
    if (stories >= 2) {
      const upperWindow = new THREE.Mesh(windowGeometry, windowMaterial);
      upperWindow.position.set(xPos, windowHeight / 2 + 1 + 3.5, depth / 2 + 0.05);
      houseModel.add(upperWindow);
    }
  }
  
  // Side windows
  for (let i = 0; i < sideWindowCount; i++) {
    const spacing = depth / (sideWindowCount + 1);
    const zPos = (i + 1) * spacing - depth / 2;
    
    // Left side
    const leftWindow = new THREE.Mesh(windowGeometry, windowMaterial);
    leftWindow.position.set(-width / 2 - 0.05, windowHeight / 2 + 1, zPos);
    leftWindow.rotation.y = Math.PI / 2;
    houseModel.add(leftWindow);
    
    // Right side
    const rightWindow = new THREE.Mesh(windowGeometry, windowMaterial);
    rightWindow.position.set(width / 2 + 0.05, windowHeight / 2 + 1, zPos);
    rightWindow.rotation.y = Math.PI / 2;
    houseModel.add(rightWindow);
    
    // Upper floor windows if applicable
    if (stories >= 2) {
      const upperLeftWindow = new THREE.Mesh(windowGeometry, windowMaterial);
      upperLeftWindow.position.set(-width / 2 - 0.05, windowHeight / 2 + 1 + 3.5, zPos);
      upperLeftWindow.rotation.y = Math.PI / 2;
      houseModel.add(upperLeftWindow);
      
      const upperRightWindow = new THREE.Mesh(windowGeometry, windowMaterial);
      upperRightWindow.position.set(width / 2 + 0.05, windowHeight / 2 + 1 + 3.5, zPos);
      upperRightWindow.rotation.y = Math.PI / 2;
      houseModel.add(upperRightWindow);
    }
  }
  
  // Add garage if selected
  const garageSize = parseInt($('#garage').val());
  if (garageSize > 0) {
    const garageWidth = 3 * garageSize;
    const garageDepth = 6;
    const garageHeight = 3;
    
    const garageGeometry = new THREE.BoxGeometry(garageWidth, garageHeight, garageDepth);
    const garageMaterial = new THREE.MeshStandardMaterial({ 
      color: exteriorColor,
      roughness: 0.7,
      metalness: 0.1
    });
    
    const garage = new THREE.Mesh(garageGeometry, garageMaterial);
    garage.position.set(-width / 2 - garageWidth / 2, garageHeight / 2, depth / 4);
    garage.castShadow = true;
    garage.receiveShadow = true;
    houseModel.add(garage);
    
    // Garage door
    const garageDoorWidth = 2.8 * garageSize;
    const garageDoorHeight = 2.5;
    const garageDoorGeometry = new THREE.BoxGeometry(garageDoorWidth, garageDoorHeight, 0.1);
    const garageDoorMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    
    const garageDoor = new THREE.Mesh(garageDoorGeometry, garageDoorMaterial);
    garageDoor.position.set(-width / 2 - garageWidth / 2, garageDoorHeight / 2, depth / 4 + garageDepth / 2 + 0.05);
    houseModel.add(garageDoor);
  }
  
  // Add patio if selected
  if ($('#patio').is(':checked')) {
    const patioWidth = width / 2;
    const patioDepth = 4;
    const patioGeometry = new THREE.BoxGeometry(patioWidth, 0.2, patioDepth);
    const patioMaterial = new THREE.MeshStandardMaterial({ color: 0x9a9a9a });
    
    const patio = new THREE.Mesh(patioGeometry, patioMaterial);
    patio.position.set(width / 4, 0.1, depth / 2 + patioDepth / 2 + 0.5);
    patio.receiveShadow = true;
    houseModel.add(patio);
  }
  
  // Add deck if selected
  if ($('#deck').is(':checked')) {
    const deckWidth = width / 1.5;
    const deckDepth = 5;
    const deckGeometry = new THREE.BoxGeometry(deckWidth, 0.3, deckDepth);
    const deckMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
    
    const deck = new THREE.Mesh(deckGeometry, deckMaterial);
    deck.position.set(-width / 4, 0.15, -depth / 2 - deckDepth / 2 - 0.5);
    deck.receiveShadow = true;
    houseModel.add(deck);
    
    // Add railings
    const railingHeight = 1;
    const railingGeometry = new THREE.BoxGeometry(deckWidth, railingHeight, 0.1);
    const railingMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
    
    const backRailing = new THREE.Mesh(railingGeometry, railingMaterial);
    backRailing.position.set(-width / 4, railingHeight / 2 + 0.3, -depth / 2 - deckDepth - 0.5);
    houseModel.add(backRailing);
    
    const leftRailing = new THREE.Mesh(railingGeometry, railingMaterial);
    leftRailing.position.set(-width / 4 - deckWidth / 2, railingHeight / 2 + 0.3, -depth / 2 - deckDepth / 2 - 0.5);
    leftRailing.rotation.y = Math.PI / 2;
    houseModel.add(leftRailing);
    
    const rightRailing = new THREE.Mesh(railingGeometry, railingMaterial);
    rightRailing.position.set(-width / 4 + deckWidth / 2, railingHeight / 2 + 0.3, -depth / 2 - deckDepth / 2 - 0.5);
    rightRailing.rotation.y = Math.PI / 2;
    houseModel.add(rightRailing);
  }
  
  // Add pool if selected
  if ($('#pool').is(':checked')) {
    const poolWidth = 6;
    const poolDepth = 10;
    const poolGeometry = new THREE.BoxGeometry(poolWidth, 0.5, poolDepth);
    const poolMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x4a8fe7,
      opacity: 0.8,
      transparent: true
    });
    
    const pool = new THREE.Mesh(poolGeometry, poolMaterial);
    pool.position.set(width + poolWidth / 2 + 2, -0.25, 0);
    houseModel.add(pool);
    
    // Pool deck
    const poolDeckGeometry = new THREE.BoxGeometry(poolWidth + 2, 0.1, poolDepth + 2);
    const poolDeckMaterial = new THREE.MeshStandardMaterial({ color: 0xd9d0c1 });
    
    const poolDeck = new THREE.Mesh(poolDeckGeometry, poolDeckMaterial);
    poolDeck.position.set(width + poolWidth / 2 + 2, -0.45, 0);
    houseModel.add(poolDeck);
  }
  
  scene.add(houseModel);
  
  // Reset view
  resetView();
}
