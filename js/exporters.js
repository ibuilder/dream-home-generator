// Export house model as IFC JSON
function exportIFC() {
    // Create a simplified IFC structure as JSON
    const homeSpecs = {
      type: 'IfcBuilding',
      name: 'Dream Home',
      specs: {
        squareFootage: $('#square-footage').val(),
        homeType: $('#home-type').val(),
        stories: $('#stories').val(),
        bedrooms: $('#bedrooms').val(),
        bathrooms: $('#bathrooms').val(),
        exterior: $('#exterior').val(),
        roof: $('#roof').val(),
        flooring: $('#flooring').val(),
        countertops: $('#countertops').val()
      },
      utilities: {
        electrical: $('#electrical').val(),
        waterHeater: $('#water-heater').val(),
        hvac: $('#hvac').val(),
        garage: $('#garage').val(),
        smartThermostat: $('#smart-thermostat').is(':checked'),
        smartLighting: $('#smart-lighting').is(':checked'),
        securitySystem: $('#security-system').is(':checked')
      },
      rooms: {
        homeOffice: $('#office').is(':checked'),
        basement: $('#basement').is(':checked'),
        gameRoom: $('#game-room').is(':checked'),
        homeTheater: $('#theater').is(':checked')
      },
      outdoorFeatures: {
        patio: $('#patio').is(':checked'),
        deck: $('#deck').is(':checked'),
        pool: $('#pool').is(':checked')
      },
      geometry: exportGeometry()
    };
    
    // Convert to string
    const ifcJson = JSON.stringify(homeSpecs, null, 2);
    
    // Create download link
    const blob = new Blob([ifcJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dream_home_ifc.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
  
  // Export house model for Blender
  function exportBlender() {
    // Create a format more suitable for Blender import
    const blenderData = {
      metadata: {
        version: 4.5,
        type: 'Object',
        generator: 'Dream Home Generator'
      },
      geometries: [],
      materials: [],
      object: {
        type: 'Group',
        name: 'DreamHome',
        children: []
      }
    };
    
    // Create simplified export of the current scene
    scene.traverse(function(object) {
      if (object.isMesh) {
        // Add geometry
        const geomIndex = blenderData.geometries.length;
        if (object.geometry.isBufferGeometry) {
          const positions = object.geometry.attributes.position.array;
          const vertices = [];
          for (let i = 0; i < positions.length; i += 3) {
            vertices.push(positions[i], positions[i + 1], positions[i + 2]);
          }
          
          blenderData.geometries.push({
            type: object.geometry.type,
            uuid: object.geometry.uuid,
            data: {
              vertices: vertices,
              normals: [],
              uvs: []
            }
          });
        }
        
        // Add material
        const matIndex = blenderData.materials.length;
        blenderData.materials.push({
          type: 'MeshStandardMaterial',
          uuid: object.material.uuid,
          color: object.material.color.getHex(),
          roughness: object.material.roughness || 0.5,
          metalness: object.material.metalness || 0.0
        });
        
        // Add object
        blenderData.object.children.push({
          type: 'Mesh',
          name: object.name || 'Part',
          uuid: object.uuid,
          matrix: object.matrix.elements,
          geometry: object.geometry.uuid,
          material: object.material.uuid
        });
      }
    });
    
    // Convert to string
    const blenderJson = JSON.stringify(blenderData, null, 2);
    
    // Create download link
    const blob = new Blob([blenderJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dream_home_blender.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
  
  // Export geometry for IFC
  function exportGeometry() {
    const geometryData = [];
    
    scene.traverse(function(object) {
      if (object.isMesh && object.parent === houseModel) {
        // Get position and size
        const position = object.position.clone();
        const size = new THREE.Vector3();
        
        if (object.geometry.isBoxGeometry) {
          size.copy(object.geometry.parameters);
        } else if (object.geometry.isSphereGeometry) {
          size.set(
            object.geometry.parameters.radius * 2,
            object.geometry.parameters.radius * 2,
            object.geometry.parameters.radius * 2
          );
        } else if (object.geometry.isConeGeometry) {
          size.set(
            object.geometry.parameters.radius * 2,
            object.geometry.parameters.height,
            object.geometry.parameters.radius * 2
          );
        }
        
        // Add rotation
        const rotation = object.rotation.clone();
        
        geometryData.push({
          type: object.geometry.type,
          position: [position.x, position.y, position.z],
          rotation: [rotation.x, rotation.y, rotation.z],
          size: [size.x, size.y, size.z],
          color: '#' + object.material.color.getHexString()
        });
      }
    });
    
    return geometryData;
  }