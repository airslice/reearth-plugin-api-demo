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
    case 'layersExtensionIds':
      document.getElementById("layers-get-extension-ids-result").value = JSON.stringify(e.data.value);
      break;
    case 'selectedId':
      document.getElementById("selected-id").value = e.data.value;
      // fill find by id and trigger find
      if(selectedId !== e.data.value){
        selectedId = e.data.value;
        document.getElementById("layers-find-by-id-id").value = selectedId;
        layersFindById();
      }
      break;
    case 'layersFindByIdResult':
      document.getElementById("layers-find-by-id-result").value = JSON.stringify(e.data.value);
      // fill override property
      if(e.data.value.property){
        document.getElementById("layers-override-property-properties").value = JSON.stringify(e.data.value.property);
        document.getElementById("layers-override-property-target-id").value = e.data.value.id;
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
console.log(
  "%c Widget %c %s",
  "background-color:#FFAA71;border-radius:2px;color:#000",
  "",
  "%c INIT %c",
  "background-color:#00D0B9;border-radius:2px;color:#000",
  ""
);