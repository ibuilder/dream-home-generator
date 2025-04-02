/**
 * IFC Schema definitions for the Dream Home Generator
 * 
 * This file contains the schema definitions used for exporting
 * the home model in a format compatible with IFC standards
 */

// Basic IFC entity structure 
const IFC_SCHEMA = {
    // IFC Header information
    header: {
      file_name: "",
      file_description: ["Dream Home Generator IFC Model"],
      file_schema: ["IFC4"]
    },
    
    // Entity types
    types: {
      IfcProject: {
        GlobalId: "GUID",
        Name: "String",
        Description: "String",
        ObjectType: "String",
        LongName: "String",
        Phase: "String",
        RepresentationContexts: "List",
        UnitsInContext: "IfcUnitAssignment"
      },
      
      IfcBuilding: {
        GlobalId: "GUID",
        OwnerHistory: "IfcOwnerHistory",
        Name: "String",
        Description: "String",
        ObjectType: "String",
        ObjectPlacement: "IfcLocalPlacement",
        Representation: "IfcProductRepresentation",
        LongName: "String",
        CompositionType: "IfcElementCompositionEnum",
        ElevationOfRefHeight: "Double",
        ElevationOfTerrain: "Double",
        BuildingAddress: "IfcPostalAddress"
      },
      
      IfcBuildingStorey: {
        GlobalId: "GUID",
        OwnerHistory: "IfcOwnerHistory",
        Name: "String",
        Description: "String",
        ObjectType: "String",
        ObjectPlacement: "IfcLocalPlacement",
        Representation: "IfcProductRepresentation",
        LongName: "String",
        CompositionType: "IfcElementCompositionEnum",
        Elevation: "Double"
      },
      
      IfcSpace: {
        GlobalId: "GUID",
        OwnerHistory: "IfcOwnerHistory",
        Name: "String",
        Description: "String",
        ObjectType: "String",
        ObjectPlacement: "IfcLocalPlacement",
        Representation: "IfcProductRepresentation",
        LongName: "String",
        CompositionType: "IfcElementCompositionEnum",
        InteriorOrExteriorSpace: "IfcInternalOrExternalEnum",
        ElevationWithFlooring: "Double"
      },
      
      IfcWall: {
        GlobalId: "GUID",
        OwnerHistory: "IfcOwnerHistory",
        Name: "String",
        Description: "String",
        ObjectType: "String",
        ObjectPlacement: "IfcLocalPlacement",
        Representation: "IfcProductRepresentation",
        Tag: "String",
        PredefinedType: "IfcWallTypeEnum"
      },
      
      IfcWindow: {
        GlobalId: "GUID",
        OwnerHistory: "IfcOwnerHistory",
        Name: "String",
        Description: "String",
        ObjectType: "String",
        ObjectPlacement: "IfcLocalPlacement",
        Representation: "IfcProductRepresentation",
        Tag: "String",
        OverallHeight: "Double",
        OverallWidth: "Double",
        PredefinedType: "IfcWindowTypeEnum"
      },
      
      IfcDoor: {
        GlobalId: "GUID",
        OwnerHistory: "IfcOwnerHistory",
        Name: "String",
        Description: "String",
        ObjectType: "String",
        ObjectPlacement: "IfcLocalPlacement",
        Representation: "IfcProductRepresentation",
        Tag: "String",
        OverallHeight: "Double",
        OverallWidth: "Double",
        PredefinedType: "IfcDoorTypeEnum"
      },
      
      IfcRoof: {
        GlobalId: "GUID",
        OwnerHistory: "IfcOwnerHistory",
        Name: "String",
        Description: "String",
        ObjectType: "String",
        ObjectPlacement: "IfcLocalPlacement",
        Representation: "IfcProductRepresentation",
        Tag: "String",
        PredefinedType: "IfcRoofTypeEnum"
      },
      
      IfcSlab: {
        GlobalId: "GUID",
        OwnerHistory: "IfcOwnerHistory",
        Name: "String",
        Description: "String",
        ObjectType: "String",
        ObjectPlacement: "IfcLocalPlacement",
        Representation: "IfcProductRepresentation",
        Tag: "String",
        PredefinedType: "IfcSlabTypeEnum"
      }
    },
    
    // Material definitions
    materials: {
      exterior: {
        brick: {
          color: 0xb25d4a,
          roughness: 0.9,
          metalness: 0.0,
          ifcType: "IfcMaterial"
        },
        vinyl: {
          color: 0xf5f5f5,
          roughness: 0.7,
          metalness: 0.1,
          ifcType: "IfcMaterial"
        },
        wood: {
          color: 0xcd8c52,
          roughness: 0.8,
          metalness: 0.0,
          ifcType: "IfcMaterial"
        },
        stucco: {
          color: 0xece5dd,
          roughness: 0.8,
          metalness: 0.0,
          ifcType: "IfcMaterial"
        },
        stone: {
          color: 0x8f8f8f,
          roughness: 0.9,
          metalness: 0.1,
          ifcType: "IfcMaterial"
        }
      },
      
      roofing: {
        asphalt: {
          color: 0x3d3d3d,
          roughness: 0.8,
          metalness: 0.1,
          ifcType: "IfcMaterial"
        },
        metal: {
          color: 0x8c8c8c,
          roughness: 0.6,
          metalness: 0.8,
          ifcType: "IfcMaterial"
        },
        tile: {
          color: 0xb25d4a,
          roughness: 0.9,
          metalness: 0.0,
          ifcType: "IfcMaterial"
        },
        slate: {
          color: 0x4a6b8c,
          roughness: 0.8,
          metalness: 0.2,
          ifcType: "IfcMaterial"
        }
      },
      
      flooring: {
        hardwood: {
          color: 0xcd8c52,
          roughness: 0.7,
          metalness: 0.0,
          ifcType: "IfcMaterial"
        },
        tile: {
          color: 0xe8e8e8,
          roughness: 0.5,
          metalness: 0.1,
          ifcType: "IfcMaterial"
        },
        carpet: {
          color: 0xcccccc,
          roughness: 1.0,
          metalness: 0.0,
          ifcType: "IfcMaterial"
        },
        laminate: {
          color: 0xd9b38c,
          roughness: 0.5,
          metalness: 0.0,
          ifcType: "IfcMaterial"
        },
        vinyl: {
          color: 0xe6e6e6,
          roughness: 0.4,
          metalness: 0.0,
          ifcType: "IfcMaterial"
        }
      }
    },
    
    // Simplified geometry schemas
    geometry: {
      IfcExtrudedAreaSolid: {
        SweptArea: "IfcProfileDef",
        Position: "IfcAxis2Placement3D", 
        ExtrudedDirection: "IfcDirection",
        Depth: "Double"
      },
      
      IfcRectangleProfileDef: {
        ProfileType: "IfcProfileTypeEnum",
        ProfileName: "String",
        Position: "IfcAxis2Placement2D",
        XDim: "Double",
        YDim: "Double"
      }
    }
  };
  
  // Generate a unique GUID for IFC entities
  function generateIfcGuid() {
    const hexDigits = "0123456789ABCDEF";
    let guid = "";
    
    for (let i = 0; i < 22; i++) {
      guid += hexDigits.charAt(Math.floor(Math.random() * 16));
    }
    
    return guid;
  }
  
  // Create IFC JSON from our model data
  function createIfcJson(modelData) {
    const ifcData = {
      header: {
        file_name: "dream_home_" + Date.now() + ".ifc",
        file_description: ["Dream Home Generator IFC Model"],
        file_schema: ["IFC4"]
      },
      entities: []
    };
    
    // Create the top-level project
    const projectId = generateIfcGuid();
    ifcData.entities.push({
      type: "IfcProject",
      id: projectId,
      attributes: {
        GlobalId: generateIfcGuid(),
        Name: "Dream Home Project",
        Description: "Generated by Dream Home Generator",
        ObjectType: "Project",
        LongName: "Dream Home Project",
        Phase: "Design"
      }
    });
    
    // Create the building
    const buildingId = generateIfcGuid();
    ifcData.entities.push({
      type: "IfcBuilding",
      id: buildingId,
      attributes: {
        GlobalId: generateIfcGuid(),
        Name: "Dream Home",
        Description: modelData.homeType + " style home",
        ObjectType: "Building",
        LongName: "Dream Home",
        CompositionType: "ELEMENT",
        ElevationOfRefHeight: 0.0,
        ElevationOfTerrain: 0.0
      }
    });
    
    // Create storeys based on number of stories
    const storeyIds = [];
    for (let i = 0; i < modelData.stories; i++) {
      const storeyId = generateIfcGuid();
      storeyIds.push(storeyId);
      
      ifcData.entities.push({
        type: "IfcBuildingStorey",
        id: storeyId,
        attributes: {
          GlobalId: generateIfcGuid(),
          Name: i === 0 ? "Ground Floor" : "Floor " + (i + 1),
          Description: "Building Storey",
          ObjectType: "Floor",
          LongName: i === 0 ? "Ground Floor" : "Floor " + (i + 1),
          CompositionType: "ELEMENT",
          Elevation: i * 3.5
        }
      });
    }
    
    // Add geometric elements (simplified for this example)
    // In a complete implementation, this would add detailed elements
    // like walls, doors, windows, slabs, etc.
    
    return ifcData;
  }