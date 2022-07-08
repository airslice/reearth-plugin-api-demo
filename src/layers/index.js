// ===================================
// COMMON Events
// ===================================
const bindCommonEvent = (event) => {
  document.getElementById(event.eleId).addEventListener("click", (e) => {
    parent.postMessage({
      action: event.action,
    }, "*");
  });
}

const commonEvents = [
  // layers
  {
    eleId: "layers-get-layers",
    action: "getLayersLayers",
  },
  {
    eleId: "layers-append-marker",
    action: "appendMarkerLayer",
  },
  {
    eleId: "layers-append-photooverlay",
    action: "appendPhotooverlayLayer",
  },
  {
    eleId: "layers-append-ellipsoid",
    action: "appendEllipsoidLayer",
  },
  {
    eleId: "layers-append-model",
    action: "appendModelLayer",
  },
  {
    eleId: "layers-append-tileset",
    action: "appendTilesetLayer",
  },
  {
    eleId: "layers-append-resource",
    action: "appendResourceLayer",
  },
  {
    eleId: "layers-append-polyline",
    action: "appendPolylineLayer",
  },
  {
    eleId: "layers-append-polygon",
    action: "appendPolygonLayer",
  },
  {
    eleId: "layers-append-rect",
    action: "appendRectLayer",
  },
  {
    eleId: "layers-append-folder",
    action: "appendFolderLayer",
  },
  {
    eleId: "layers-append-marker-with-infobox",
    action: "appendMarkerWithInfoboxLayer",
  },
  {
    eleId: "layers-append-marker-with-folder",
    action: "appendMarkerWithFolderLayer",
  },
  // helper
  {
    eleId: "camera-flyto-playground",
    action: "cameraFlyToPlayground",
  },
  {
    eleId: "camera-flyto-tileset",
    action: "cameraFlyToTailset",
  },
]

commonEvents.map((event) => {
  bindCommonEvent(event);
})

// ===================================
// Override Property
// ===================================
document.getElementById("layers-override-property").addEventListener("click", (e) => {
  const id = document.getElementById("layers-override-property-target-id").value;
  if(!id) return;
  const properties = document.getElementById("layers-override-property-properties").value;
  parent.postMessage({
    action: "layersOverrideProperty",
    payload: {
      id,
      properties
    }
  }, "*");
});

// ===================================
// Layers find by id
// ===================================
const layersFindById = (e) => {
  const id = document.getElementById("layers-find-by-id-id").value;
  parent.postMessage({
    action: "layersFindById",
    payload: {
      id,
    }
  }, "*");
};
document.getElementById("layers-find-by-id").addEventListener("click", layersFindById);

// ===================================
// Layers append to parent
// ===================================
document.getElementById("layers-append-marker-to-parent").addEventListener("click", (e) => {
  const parentId = document.getElementById("layers-append-to-parent-id").value;
  if(!parentId) return;
  parent.postMessage({
    action: "appendMarkerToParent",
    payload: {
      parentId,
    }
  }, "*");
});

// ===================================
// Layers Tree
// ===================================
const layerTypeS = {
  marker: 'M',
  photooverlay: 'P',
  ellipsoid: 'E',
  model: 'O',
  tileset: 'T',
  resource: 'S',
  polyline: 'L',
  polygon: 'G',
  rect: 'R',
}
const processLayer = (l, tar) => {
  const wrap = document.createElement('div');
  wrap.className = 'layer-wrap';
  const item = document.createElement('a');
  item.className = 'layer-item';
  item.title = l.id;
  item.id = l.id;
  const itemType = document.createElement('span');
  itemType.className = 'layer-type';
  itemType.title = l.extensionId ?? 'folder';
  itemType.innerHTML = layerTypeS[l.extensionId] ?? 'F';
  const itemTitle = document.createElement('span');
  itemTitle.className = 'layer-title';
  itemTitle.innerHTML = l.title;

  item.appendChild(itemType);
  item.appendChild(itemTitle);
  wrap.appendChild(item);

  if(l.children){
    const folder = document.createElement('div');
    folder.className = 'layer-folder';
    l.children.forEach(c => {
      processLayer(c, folder);
    })
    wrap.appendChild(folder);
  }
  tar.appendChild(wrap);
}
const rebuildLayersTree = (layers) => {
  if(layers){
    const ctn = document.getElementById('layers-get-layers-tree');
    ctn.innerHTML = ""; 
    layers.forEach(l=>{
      processLayer(l,ctn);
    })
  }
  const layerItems = document.getElementsByClassName('layer-item');
  Array.prototype.forEach.call(layerItems,(ele)=>{
    ele.addEventListener('click',(e)=>{
      parent.postMessage({
        action: "layersSelect",
        payload: {
          id: ele.id,
        }
      }, "*");
    })
  })
  if(selectedId){
    setCurrentLayerHighlight(selectedId);
  }
}
const setCurrentLayerHighlight = (id) => {
  const layerItems = document.getElementsByClassName('layer-item');
  Array.prototype.forEach.call(layerItems,(ele)=>{
    ele.className = 'layer-item';
  })
  const cur = document.getElementById(id);
  if(cur) cur.className = 'layer-item active';
}

// ===================================
// Receive Message
// ===================================
let selectedId = null;

addEventListener("message", e => {
  clog(e.data);
  if (e.source !== parent || !e.data.title) return;
  switch(e.data.title){
    case 'layersLayers':
      document.getElementById("layers-get-layers-result").value = JSON.stringify(e.data.value);
      break;
    case 'layersLayersTree':
      rebuildLayersTree(e.data.value);
      break;
    case 'layersExtensionIds':
      document.getElementById("layers-get-extension-ids-result").value = JSON.stringify(e.data.value);
      break;
    case 'selectedId':
      document.getElementById("selected-id").value = e.data.value;
      // fill find by id and trigger find
      if(selectedId !== e.data.value){
        document.getElementById("layers-find-by-id-id").value = e.data.value;
        layersFindById();
      }
      // highlight layers tree
      if(selectedId !== e.data.value){
        setCurrentLayerHighlight(e.data.value);
      }
      selectedId = e.data.value;
      break;
    case 'layersFindByIdResult':
      document.getElementById("layers-find-by-id-result").value = JSON.stringify(e.data.value.layerData);
      // fill override property
      if(e.data.value.layerData.property){
        document.getElementById("layers-override-property-properties").value = JSON.stringify(Object.assign(e.data.value.layerData.property,
          e.data.value.overriddenProperties));
        document.getElementById("layers-override-property-target-id").value = e.data.value.layerData.id;
      }
      break;
    default:
      break;
  }
});

// ===================================
// Helper Console Log
// ===================================
const clog = (data) => {
  console.log(
    "%c Widget %c %s",
    "background-color:#FFAA71;border-radius:2px;color:#000",
    "",
    "%c message %c %s",
    "background-color:#00D0B9;border-radius:2px;color:#000",
    "",
    "%c "+data.title+" %c %s",
    "background-color:#0081C0;border-radius:2px;color:#fff",
    "",
    JSON.stringify(data.value)
  );
};

// ===================================
// Widget INIT
// ===================================
parent.postMessage({
  action: "getLayersLayers",
}, "*");

console.log(
  "%c Widget %c %s",
  "background-color:#FFAA71;border-radius:2px;color:#000",
  "",
  "%c INIT %c",
  "background-color:#00D0B9;border-radius:2px;color:#000",
  ""
);

