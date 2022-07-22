reearth.ui.show(`
<style>
    html {

}

body {
  margin: 0;
  font-size: 12px;
}

*{
  box-sizing: border-box;
}

.extendedh {
  width: 100%;
}

.extendedv {
  height: 100%;
}

#wrapper {
  position: relative;
  background-color: rgba(35, 34, 38, 0.75);
}

#wrapper h1 {
  font-weight: bold;
  color: #fff;
  font-size: 14px;
  margin-bottom: 0.5em;
}

.header{
  font-weight: bold;
  color: #fff;
  font-size: 14px;
  background-color: rgba(0,0,0,.7);
  padding: 4px 10px;
}

.content{
  height: 472px;
  overflow: auto;
  padding-bottom: 20px;
}

.api-field{
  padding: 2px 10px;
}

.api-item {
  margin: 10px 0;
}

.line{
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.api-name{
  flex-shrink: 0;
  display: inline-block;
  width: 150px;
  color: #fff;
  font-weight: bold;
  padding: 0 5px;
}

.btn-ctn{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.btn-ctn button{
  width: 50%;
}
.btn-ctn.e3 button{
  width: 33.333%;
}

.hidden {
  display: none;
}

.extendedh body,
.extendedh #wrapper {
  width: 100%;
}

.extendedv body,
.extendedv #wrapper {
  height: 100%;
}

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  background: #000;
}

::-webkit-scrollbar-thumb {
  background: #4a4a4a;
}

::-webkit-scrollbar-corner {
  background: #000;
}

input,
input:focus {
  outline: none;
  border: none;
  background: rgba(0, 0, 0, 0.9);
  color: rgb(180, 180, 180);
  font-size: 12px;
  padding: 0 5px;
  width: 100%;
  height: 21px;
}

input:-internal-autofill-previewed,
input:-internal-autofill-selected {
  background-color: rgba(0, 0, 0, 0) !important;
}

button {
  outline: none;
  border: none;
  background: rgba(0, 0, 0, 0.9);
  color: rgb(180, 180, 180);
  font-size: 12px;
  cursor: pointer;
  width: 100%;
  height: 21px;
  padding: 0 5px;
}

button:hover {
  color: #000;
  background: #ff9900;
}

textarea{
  outline: none;
  border: none;
  background: rgba(0, 0, 0, 0.9);
  color: rgb(180, 180, 180);
  font-size: 12px;
  width: 100%;
  height: 100px;
  padding: 5px;
  resize: none;
  line-height: 1.2;
}
textarea.h-l2{
  height: calc( 14.5px * 2 + 10px);
}
textarea.h-l10{
  height: calc( 14.5px * 10 + 10px);
}

input,
button,
textarea,
.value-ctn{
  font-family: Menlo, Monaco, 'Courier New', monospace,"Noto Sans","hiragino sans","hiragino kaku gothic proN",-apple-system,BlinkMacSystem,sans-serif;
}

.value-ctn{
  background: rgba(0, 0, 0, 0.9);
  width: 100%;
}
/* layer tree */
.layer-item{
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  font-size: 12px;
  padding: 0 2px;
  width: 100%;
  height: 21px;
}
.layer-item.active .layer-type{
  background-color: rgb(255, 0, 115);
}
.layer-item:hover{
  background-color: #f90;
}
.layer-item:hover .layer-title{
  color: #000;
}


.layer-type{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 17px;
  height: 17px;
  flex-grow: 0;
  color: rgb(180, 180, 180);
  font-weight: bold;
  background-color: #333;
}
.layer-title{
  padding: 0 5px;
  color: rgb(180, 180, 180);
}
.layer-folder{
  padding-left: 20px;
}
    </style>
    
  <div id="wrapper">
    <div class="header">Plugin API Demo - Layers</div>
    <div class="content">

      <div class="api-field">
        <h1>On</h1>
        <div class="api-item">
          <div class="line">
            <span class="api-name">select</span>
            <input id="selected-id" autocomplete="off"/>
          </div>
        </div>
      </div>

      <div class="api-field">
        <h1>Layers</h1>

        <div class="api-item">
          <div class="line">
            <span class="api-name">.add</span>
            <div class="btn-ctn">
              <button id="layers-append-marker">Marker</button>
              <button id="layers-append-photooverlay">PhotoOverlay</button>
              <button id="layers-append-ellipsoid">Ellipsoid</button>
              <button id="layers-append-model">Model</button>
              <button id="layers-append-tileset">Tileset</button>
              <button id="layers-append-resource">Resource</button>
              <button id="layers-append-polyline">Polyline</button>
              <button id="layers-append-polygon">Polygon</button>
              <button id="layers-append-rect">Rect</button>
              <button id="layers-append-folder">Folder</button>
            </div>
          </div>
        </div>

        <div class="api-item">
          <div class="line">
            <span class="api-name"></span>
            <input id="layers-append-to-parent-id" placeholder="parentId" autocomplete="off"/>
          </div>
          <div class="line">
            <span class="api-name"></span>
            <button id="layers-append-marker-to-parent">Marker as child</button>
          </div>
        </div>

        <div class="api-item">
          <div class="line">
            <span class="api-name"></span>
            <button id="layers-append-marker-with-infobox">Marker with infobox</button>
          </div>
          <div class="line">
            <span class="api-name"></span>
            <button id="layers-append-marker-with-folder">Marker with folder</button>
          </div>
        </div>

        <div class="api-item">
          <div class="line">
            <span class="api-name">.layers</span>
            <button id="layers-get-layers">Get</button>
          </div>
          <div class="line">
            <span class="api-name"></span>
            <textarea id="layers-get-layers-result"
              class="h-l10"></textarea>
          </div>
        </div>

        <div class="api-item">
          <div class="line">
            <span class="api-name"></span>
            <div id="layers-get-layers-tree" class="value-ctn"></div>
          </div>
        </div>

        <div class="api-item">
          <div class="line">
            <span class="api-name">.findById</span>
            <input id="layers-find-by-id-id" placeholder="id"  autocomplete="off"/>
          </div>
          <div class="line">
            <span class="api-name"></span>
            <button id="layers-find-by-id">Find</button>
          </div>
          <div class="line">
            <span class="api-name"></span>
            <textarea id="layers-find-by-id-result"
              class="h-l10"></textarea>
          </div>
        </div>

        <div class="api-item">
          <div class="line">
            <span class="api-name">.overrideProperty</span>
            <input id="layers-override-property-target-id" placeholder="id" />
          </div>
          <div class="line">
            <span class="api-name"></span>
            <textarea id="layers-override-property-properties" 
              placeholder="properties"
              class="h-l10"></textarea>
          </div>
          <div class="line">
            <span class="api-name"></span>
            <button id="layers-override-property">Override</button>
          </div>
        </div>

      </div>

      <div class="api-field">
        <h1>Visualizer</h1>

        <div class="api-item">
          <div class="line">
            <span class="api-name">.camera.flyTo</span>
            <button id="camera-flyto-playground">Playground</button>
            <button id="camera-flyto-tileset">Tileset</button>
          </div>
        </div>

      </div>

    </div>

  </div>

    <script>
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


    </script>
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