reearth.ui.show(`
[HTML]
`,{width: 500, height: 500});

const randomColor = () => hslToHex(Math.floor(Math.random()*360),80,60)+'ff';

const hslToHex = (h, s, l) => {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

const handles = {};

// ===================================
// Layers Properties
// ===================================
const processLayer = (layer) => {
  const l = {
    id: layer.id,
    extensionId: layer.extensionId,
    title: layer.title,
  }
  if(layer.children){
    l.children = layer.children.map(cl => processLayer(cl));
  }
  return l;
}
const layersUpdateAction = (layers) => {
  reearth.ui.postMessage({
    title: 'layersLayers',
    value: layers
  });
  reearth.ui.postMessage({
    title: 'layersLayersTree',
    value: layers.map(l=>processLayer(l))
  });
}
handles.getLayersLayers = () => {
  layersUpdateAction(reearth.layers.layers);
}

// ===================================
// Append Marker
// ===================================
let markerIndex = 0;
handles.appendMarkerLayer = () => {
  reearth.layers.add({
    extensionId: "marker",
    isVisible: true,
    title: `Marker-${markerIndex}`,
    property: {
      default: {
        location: {
          lat: 49 - 0.5 * markerIndex,
          lng: -102,
        },
        label: true,
        labelText: `Marker from API ${markerIndex.toString()}`,
        labelTypography:{
          fontSize: 18,
          color: randomColor(),
        }
      },
    },
    tags: [],
  });
  markerIndex ++;
  // update layer
  layersUpdateAction(reearth.layers.layers);
}

// ===================================
// Append Photooverlay
// ===================================
const demoPhotoUrls = [
  'https://images.unsplash.com/photo-1655661811387-989070a0fbc3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1858&q=80',
  'https://images.unsplash.com/photo-1655669131176-c23c3a7b9bfa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1612&q=80',
  'https://images.unsplash.com/photo-1655434067144-b962fd5fc053?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80',
  'https://images.unsplash.com/photo-1652114067562-271dec4fd8f7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=772&q=80',
  'https://images.unsplash.com/photo-1653245856773-81ec56faf316?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
];
let photooverlayIndex = 0;
handles.appendPhotooverlayLayer = () => {
  reearth.layers.add({
    extensionId: "photooverlay",
    isVisible: true,
    title: `Photooverlay-${photooverlayIndex}`,
    property: {
      default: {
        location: {
          lat: 49 - 1 * photooverlayIndex,
          lng: -95,
        },
        image: demoPhotoUrls[photooverlayIndex % demoPhotoUrls.length],
        photoOverlayImage: demoPhotoUrls[photooverlayIndex % demoPhotoUrls.length],
      },
    },
    tags: [],
  });
  photooverlayIndex ++;
  // update layer
  layersUpdateAction(reearth.layers.layers);
}

// ===================================
// Append Ellipsoid
// ===================================
let ellipsoidIndex = 0;
handles.appendEllipsoidLayer = () => {
  reearth.layers.add({
    extensionId: "ellipsoid",
    isVisible: true,
    title: `Ellipsolid-${ellipsoidIndex}`,
    property: {
      default: {
        location: {
          lat: 49 - 0.5 * ellipsoidIndex,
          lng: -92,
        },
        radius: 18000 + Math.random() * 5000,
        height: Math.random() * 10000,
        fillColor: randomColor(),
      },
    },
    tags: [],
  });
  ellipsoidIndex ++;
  // update layer
  layersUpdateAction(reearth.layers.layers);
}

// ===================================
// Append Model
// ===================================
const demoModels = [
  {
    url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Fox/glTF-Binary/Fox.glb',
    scale: 1000,
  },{
    url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/CesiumMan/glTF-Binary/CesiumMan.glb',
    scale: 100000,
  }
];
let modelIndex = 0;
handles.appendModelLayer = () => {
  reearth.layers.add({
    extensionId: "model",
    isVisible: true,
    title: `Model-${modelIndex}`,
    property: {
      default: {
        location: {
          lat: 49 - 1 * modelIndex,
          lng: -90,
        },
        model: demoModels[modelIndex % demoModels.length].url,
        scale: demoModels[modelIndex % demoModels.length].scale,
        animation: true,
      },
    },
    tags: [],
  });
  modelIndex ++;
  // update layer
  layersUpdateAction(reearth.layers.layers);
}

// ===================================
// Append Tailset
// ===================================
let tilesetAppended = false;
handles.appendTilesetLayer = () => {
  if(tilesetAppended) return;
  reearth.layers.add({
    extensionId: "tileset",
    isVisible: true,
    title: `Tileset`,
    property: {
      default: {
        tileset: 'https://plateau.reearth.io/13101_chiyoda-ku/tileset.json'
      },
    },
    tags: [],
  });
  tilesetAppended = true;
  // update layer
  layersUpdateAction(reearth.layers.layers);
}

// ===================================
// Append Resource
// ===================================
let resourceAppended = false;
handles.appendResouceLayer = () => {
  if(resourceAppended) return;
  reearth.layers.add({
    extensionId: "resource",
    isVisible: true,
    title: `CZML`,
    property: {
      default: {
        url: 'https://raw.githubusercontent.com/CesiumGS/cesium/master/Apps/SampleData/Vehicle.czml'
      },
    },
    tags: [],
  });
  resourceAppended = true;
  // update layer
  layersUpdateAction(reearth.layers.layers);
}

// ===================================
// Append Polyline
// ===================================
let polylineIndex = 0;
const polylinePoint = (polylineIndex,i) => {
  return {
    lat: 51 + 0.5 * polylineIndex + Math.random(),
    lng: -102 + 2 * i + Math.random(),
    height: 10000 + 50000 * Math.random(),
  }
}
handles.appendPolylineLayer = () => {
  const count = 1 + Math.ceil(Math.random() * 10);
  const coordinates = [];
  for(let i = 0; i < count; i += 1){
    coordinates.push(polylinePoint(polylineIndex,i));
  }
  reearth.layers.add({
    extensionId: "polyline",
    isVisible: true,
    title: `Polyline-${polylineIndex}`,
    property: {
      default: {
        coordinates: coordinates,
        strokeColor: randomColor(),
        strokeWidth: 1 + Math.random() * 5
      },
    },
    tags: [],
  });
  polylineIndex ++;
  // update layer
  layersUpdateAction(reearth.layers.layers);
}

// ===================================
// Append Polygon
// ===================================
let polygonIndex = 0;
const polygonPoint = (polygonIndex,i,count) => {
  const length = 0.5 + 0.5 * Math.random();
  const radian = i / count * Math.PI * 2;
  return {
    lat: 51 + 1.5 * polygonIndex + Math.sin(radian) * length,
    lng: -105 + Math.cos(radian) * length,
    height: 10000 + 50000 * Math.random(),
  }
}
handles.appendPolygonLayer = () => {
  const count = 2 + Math.ceil(Math.random() * 4);
  const polygon = [];
  for(let i = 0; i < count; i += 1){
    polygon.push(polygonPoint(polygonIndex,i,count));
  }
  reearth.layers.add({
    extensionId: "polygon",
    isVisible: true,
    title: `Polygon-${polygonIndex}`,
    property: {
      default: {
        polygon: [polygon],
        stroke: true,
        strokeColor: randomColor(),
        strokeWidth: 1 + Math.random() * 5,
        fill: true,
        fillColor: randomColor(),
      },
    },
    tags: [],
  });
  polygonIndex ++;
  // update layer
  layersUpdateAction(reearth.layers.layers);
}

// ===================================
// Append Rect
// ===================================
let rectIndex = 0;
handles.appendRectLayer = () => {
  reearth.layers.add({
    extensionId: "rect",
    isVisible: true,
    title: `Rect-${rectIndex}`,
    property: {
      default: {
        rect: { 
          west: -107.5 - Math.random(), 
          east: -107 + Math.random(), 
          north: 51 + rectIndex + Math.random(), 
          south: 51 + rectIndex - Math.random(), },
        fillColor: randomColor(),
        extrudedHeight: 10000,
        outlineColor: randomColor(),
        outlineWidth: 1 + Math.random() * 5,
        height: 10000 + Math.random() * 10000,
        extrudedHeight: 10000 + Math.random() * 10000,
      },
    },
    tags: [],
  });
  rectIndex ++;
  // update layer
  layersUpdateAction(reearth.layers.layers);
}


// ===================================
// Append Folder
// ===================================
let folderIndex = 0;
handles.appendFolderLayer = () => {
  reearth.layers.add({
    extensionId: "",
    isVisible: true,
    title: `Folder-${folderIndex}`,
    children: [],
    tags: [],
  });
  // update layer
  layersUpdateAction(reearth.layers.layers);
}

// ===================================
// Append Marker to parent
// ===================================
let childMarkerIndex = 0;
handles.appendMarkerToParent = (payload) => {
  reearth.layers.add({
    extensionId: "marker",
    isVisible: true,
    title: `Marker-${childMarkerIndex}`,
    property: {
      default: {
        location: {
          lat: 49 - 0.5 * childMarkerIndex,
          lng: -109,
        },
        label: true,
        labelText: `Child Marker ${childMarkerIndex.toString()}`,
        labelTypography:{
          fontSize: 18,
          color: randomColor(),
        }
      },
    },
    tags: [],
  }, payload.parentId);
  childMarkerIndex ++;
  // update layer
  layersUpdateAction(reearth.layers.layers);
}

// ===================================
// Append Marker with infobox
// ===================================
let markerWithInfoboxAppended = false;
handles.appendMarkerWithInfoboxLayer = () => {
  if(markerWithInfoboxAppended) return;
  reearth.layers.add({
    extensionId: "marker",
    isVisible: true,
    title: `Marker with infobox`,
    property: {
      default: {
        location: {
          lat: 50,
          lng: -109,
        },
        label: true,
        labelText: `Marker infobox`,
        labelTypography:{
          fontSize: 18,
          color: randomColor(),
        }
      },
    },
    infobox: {
      blocks:[
        {
          extensionId: "textblock",
          pluginId: "reearth",
          property:{
            default:{
              text: 'HELLO WORLD'
            }
          }
        },
        {
          extensionId: "imageblock",
          pluginId: "reearth",
          property:{
            default:{
              image: 'https://images.unsplash.com/photo-1655661811387-989070a0fbc3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1858&q=80'
            }
          }
        }
      ],
      property:{
        default:{
          title: 'Marker Infobox Title'
        }
      }
    },
    tags: [],
  });
  markerWithInfoboxAppended = true;
  // update layer
  layersUpdateAction(reearth.layers.layers);
}

// ===================================
// Append Marker with Folder
// ===================================
let markerWithFolderAppended = false;
handles.appendMarkerWithFolderLayer = () => {
  if(markerWithFolderAppended) return;
  reearth.layers.add({
    extensionId: "",
    isVisible: true,
    title: `Marker-Folder-0`,
    children: [
      {
        extensionId: "marker",
        isVisible: true,
        title: `Marker-0-0`,
        property: {
          default: {
            location: {
              lat: 48,
              lng: -112,
            },
            label: true,
            labelText: `Marker-0-0`,
            labelTypography:{
              fontSize: 18,
              color: randomColor(),
            }
          },
        },
        tags: [],
      },
      {
        extensionId: "",
        isVisible: true,
        title: `Marker-Folder-1`,
        children: [
          {
            extensionId: "marker",
            isVisible: true,
            title: `Marker-1-0`,
            property: {
              default: {
                location: {
                  lat: 47.5,
                  lng: -111,
                },
                label: true,
                labelText: `Marker-1-0`,
                labelTypography:{
                  fontSize: 18,
                  color: randomColor(),
                }
              },
            },
            tags: [],
          },
          {
            extensionId: "marker",
            isVisible: true,
            title: `Marker-1-1`,
            property: {
              default: {
                location: {
                  lat: 47,
                  lng: -111,
                },
                label: true,
                labelText: `Marker-1-1`,
                labelTypography:{
                  fontSize: 18,
                  color: randomColor(),
                }
              },
            },
            tags: [],
          },
        ]
      },
      {
        extensionId: "marker",
        isVisible: true,
        title: `Marker-0-1`,
        property: {
          default: {
            location: {
              lat: 46.5,
              lng: -112,
            },
            label: true,
            labelText: `Marker-0-1`,
            labelTypography:{
              fontSize: 18,
              color: randomColor(),
            }
          },
        },
        tags: [],
      },
    ],
    tags: [],
  });
  markerWithFolderAppended = true;
  // update layer
  layersUpdateAction(reearth.layers.layers);
}

// ===================================
// Override Property
// ===================================
handles.layersOverrideProperty = (payload) => {
  try {
    const properties = eval(`(${payload.properties})`);
    reearth.layers.overrideProperty(payload.id, properties);
  } catch (error) {
    console.log(error);
  }
  
}

// ===================================
// FIndById
// ===================================
handles.layersFindById = (payload) => {
  const layer = reearth.layers.findById(payload.id);
  const layerData = layer ? {
    id: layer.id,
    children: layer.children,
    extensionId: layer.extensionId,
    infobox: layer.infobox,
    isVisible: layer.isVisible,
    pluginId: layer.pluginId,
    property: layer.property,
    propertyId: layer.propertyId,
    tags: layer.tags,
    title: layer.title,
    type: layer.type,
    creator: layer.creator,
  } : {};

  const overriddenProperties = reearth.layers.overriddenProperties[payload.id] ?? {};

  reearth.ui.postMessage({
    title: 'layersFindByIdResult',
    value: {
      layerData,
      overriddenProperties
    }
  });
}

// ===================================
// Select Layer
// ===================================
handles.layersSelect = (payload) => {
  reearth.layers.select(payload.id);
}

// ===================================
// Flyto
// ===================================
handles.cameraFlyToPlayground = () => {
  reearth.visualizer.camera.flyTo({
    lng: -95.3347028122335,
    lat: 42.02136253163602,
    height: 1454623.7781587807,
    heading: 5.329070518200751e-15,
    pitch: -1.1992122922732107,
    roll: 6.2831853071795765,
    fov: 0.75
  });
}
handles.cameraFlyToTailset = () => {
  reearth.visualizer.camera.flyTo({
    lng: 139.74670369973546,
    lat: 35.659869744800325,
    height: 2015.9398450375584,
    heading: 0.09500238074897371,
    pitch: -0.6734953976277236,
    roll: 0.00011756776520588375,
    fov: 0.75
  });
}

// ===================================
// Message
// ===================================
reearth.on("message", msg => {
  clog("message",msg);
  if (msg && msg.action) {
    handles[msg.action]?.(msg.payload);
  }
});

// ===================================
// Select
// ===================================
reearth.on("select", msg => {
  clog("select",msg);
  reearth.ui.postMessage({
    title: 'selectedId',
    value: msg
  });
})

// ===================================
// Cameramove
// ===================================
reearth.on("cameramove", msg => {
  clog("cameramove",msg);
})

// ===================================
// Helper Console Log
// ===================================
const clog = (eventName,data) => {
  console.log(
    "%c Re:earth %c %s",
    "background-color:#FF9671;border-radius:2px;color:#000",
    "",
    "%c "+eventName+" %c %s",
    "background-color:#00D0B9;border-radius:2px;color:#000",
    "",
    JSON.stringify(data)
  );
};