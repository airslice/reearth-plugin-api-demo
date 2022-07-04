reearth.ui.show(`
[HTML]
`,{width: 500, height: 500});

const randomColor = () => '#'+['00','99','ff'].sort(()=>Math.random()>0.5 ? -1 : 1).join('')+'ff';

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
handles.getLayersLayers = () => {
  // process flat layers data to nested
  const layers = reearth.layers.layers.map(l=>processLayer(l));
  reearth.ui.postMessage({
    title: 'layersLayers',
    value: layers
  });
}

handles.getLayersExtensionIds = () => {
  reearth.ui.postMessage({
    title: 'layersExtensionIds',
    value: reearth.layers.extensionIds
  });
}

// ===================================
// Append Marker
// ===================================
let markerIndex = 0;
handles.appendMarkerLayer = () => {
  reearth.layers.append({
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
  reearth.layers.append({
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
}

// ===================================
// Append Ellipsoid
// ===================================
let ellipsoidIndex = 0;
handles.appendEllipsoidLayer = () => {
  reearth.layers.append({
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
  reearth.layers.append({
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
}

// ===================================
// Append Tailset
// ===================================
let tilesetAppended = false;
handles.appendTilesetLayer = () => {
  if(tilesetAppended) return;
  reearth.layers.append({
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
}

// ===================================
// Append Resource
// ===================================
let resourceAppended = false;
handles.appendResouceLayer = () => {
  if(resourceAppended) return;
  reearth.layers.append({
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
}

// ===================================
// Append Folder
// ===================================
let folderIndex = 0;
handles.appendFolderLayer = () => {
  reearth.layers.append({
    extensionId: "",
    isVisible: true,
    title: `Folder-${folderIndex}`,
    children: [],
    tags: [],
  });
}

// ===================================
// Append Marker to parent
// ===================================
let childMarkerIndex = 0;
handles.appendMarkerToParent = (payload) => {
  reearth.layers.append({
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
}

// ===================================
// Append Marker with infobox
// ===================================
let markerWithInfoboxAppended = false;
handles.appendMarkerWithInfoboxLayer = () => {
  if(markerWithInfoboxAppended) return;
  reearth.layers.append({
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
}

// ===================================
// Override Property
// ===================================
handles.layersOverrideProperty = (payload) => {
  try {
    const properties = eval(`(${payload.properties})`);
    console.log(properties);
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
    type: layer.type
  } : {};

  reearth.ui.postMessage({
    title: 'layersFindByIdResult',
    value: layerData
  });
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