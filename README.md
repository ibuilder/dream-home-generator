# Dream Home Generator

A web-based application for designing and visualizing custom home designs with 3D modeling capabilities and IFC export functionality.

## Overview

Dream Home Generator allows users to create personalized home designs by specifying various parameters like square footage, number of bedrooms, exterior materials, and other features. The application then generates a 3D model that can be viewed, measured, annotated, and exported in formats compatible with BIM software and Blender.

## Features

- **Comprehensive Design Forms**: Customize your dream home with detailed specifications
- **Real-time 3D Visualization**: View your design in an interactive Three.js viewer
- **Measurement Tools**: Calculate distances within your 3D model
- **Markup Tools**: Add annotations and notes to specific areas
- **Multiple View Modes**: Switch between 3D perspective and floor plan views
- **Export Capabilities**: Export your design as IFC-compatible JSON or Blender-ready files

## File Structure

```
dream-home-generator/
│
├── index.html                 # Main HTML page
│
├── css/
│   └── styles.css             # Custom styles for the application
│
├── js/
│   ├── main.js                # Main JavaScript initialization
│   ├── viewer.js              # Three.js viewer setup
│   ├── house-builder.js       # House generation functions
│   ├── measurement.js         # Measurement and markup tools
│   ├── exporters.js           # IFC and Blender export functionality
│   └── ifc-schema.js          # IFC schema definitions
│
└── README.md                  # Project documentation
```

## Technologies Used

- **HTML5**: Structure and content
- **CSS3**: Styling and layout
- **Bootstrap 5**: UI components and responsive design
- **JavaScript**: Core functionality and interactivity
- **jQuery**: DOM manipulation and event handling
- **Three.js**: 3D visualization and modeling
- **OrbitControls**: Camera controls for 3D navigation

## Getting Started

1. Clone the repository or download the files
2. Open `index.html` in a modern web browser
3. Fill out the design forms with your preferences
4. Click "Generate Dream Home" to create your 3D model
5. Use the provided tools to explore, measure, and annotate your design
6. Export the model in your preferred format

## IFC Export

The IFC (Industry Foundation Classes) export creates a JSON file that follows the IFC schema structure. This allows for interoperability with Building Information Modeling (BIM) software. The exported file includes:

- Building specifications
- Structural components
- Materials and finishes
- Utilities information
- Geometric data

## Blender Export

The Blender export creates a JSON file compatible with Blender's import functionality. This allows users to further refine and render their designs in Blender. The exported file includes:

- Geometries
- Materials
- Object hierarchies
- Transformation matrices

## Extending the Application

You can extend this application by:

1. Adding more home types and architectural styles
2. Implementing additional export formats
3. Creating more detailed interior layouts
4. Adding furniture and fixtures
5. Implementing lighting simulations
6. Adding terrain and landscaping features

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Three.js for the 3D rendering capabilities
- Bootstrap for the responsive UI components
- Font Awesome for the icon set