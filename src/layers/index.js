console.log('[PLUGIN] inited');

const bindCommonEvent = (event) => {
  document.getElementById(event.eleId).addEventListener("click", (e) => {
    parent.postMessage({
      action: event.action,
    }, "*");
  });
}

// ===================================
// Layers
// ===================================

const commonEvents = [
  // layers
  {
    eleId: "get-layers-layers",
    action: "getLayersLayers",
  },
  {
    eleId: "get-layers-extension-ids",
    action: "getLayersExtensionIds",
  },
  {
    eleId: "append-marker-layer",
    action: "appendMarkerLayer",
  },
  {
    eleId: "append-photooverlay-layer",
    action: "appendPhotooverlayLayer",
  },
  {
    eleId: "append-ellipsoid-layer",
    action: "appendEllipsoidLayer",
  },
  {
    eleId: "append-model-layer",
    action: "appendModelLayer",
  },
  {
    eleId: "append-tileset-layer",
    action: "appendTilesetLayer",
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
document.getElementById("override-property").addEventListener("click", (e) => {
  const id = document.getElementById("override-target-id").value;
  if(!id) return;
  const properties = document.getElementById("override-properties").value;
  console.log(id,properties);
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
// Receive Message
// ===================================
let selectedId = null;

addEventListener("message", e => {
  if (e.source !== parent || !e.data.title) return;
  switch(e.data.title){
    case 'layersLayers':
      document.getElementById("get-layers-layers-result").value = JSON.stringify(e.data.value);
      break;
    case 'layersExtensionIds':
      document.getElementById("get-layers-extension-ids-result").value = JSON.stringify(e.data.value);
      break;
    case 'selectedId':
      document.getElementById("selected-id").value = e.data.value;
      // auto find
      if(selectedId !== e.data.value){
        selectedId = e.data.value;
        document.getElementById("layers-find-by-id-id").value = selectedId;
        layersFindById();
      }
      break;
    case 'layersFindByIdResult':
      document.getElementById("layers-find-by-id-result").value = JSON.stringify(e.data.value);
      // fill override
      if(e.data.value.property){
        document.getElementById("override-properties").value = JSON.stringify(e.data.value.property);
        document.getElementById("override-target-id").value = e.data.value.id;
      }
      break;
    default:
      break;
  }
});