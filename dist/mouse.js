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
    <div class="header">Plugin API Demo - Mouse</div>
    <div class="content">
      <div class="api-field">
        <div class="api-item">
          <div class="line">
            <span class="api-name">event</span>
            <input id="event" disabled autocomplete="off"/>
          </div>
          <div class="line">
            <span class="api-name">x</span>
            <input id="x" disabled autocomplete="off"/>
          </div>
          <div class="line">
            <span class="api-name">y</span>
            <input id="y" disabled autocomplete="off"/>
          </div>
          <div class="line">
            <span class="api-name">lat</span>
            <input id="lat" disabled autocomplete="off"/>
          </div>
          <div class="line">
            <span class="api-name">lng</span>
            <input id="lng" disabled autocomplete="off"/>
          </div>
          <div class="line">
            <span class="api-name">height</span>
            <input id="height" disabled autocomplete="off"/>
          </div>
          <div class="line">
            <span class="api-name">layerId</span>
            <input id="layerId" disabled autocomplete="off"/>
          </div>
          <div class="line">
            <span class="api-name">delta</span>
            <input id="delta" disabled autocomplete="off"/>
          </div>
        </div>
      </div>

      <div class="api-field">
        <h1>Events</h1>
        <div class="api-item" id="mouse-events-ctn">
        </div>
      </div>
    </div>
  </div>

    <script>
    const setMouseEventInfo = (data) => {
  document.getElementById('x').value = data.x ?? '';
  document.getElementById('y').value = data.y ?? '';
  document.getElementById('event').value = data.event ?? '';
  document.getElementById('lat').value = data.lat ?? '';
  document.getElementById('lng').value = data.lng ?? '';
  document.getElementById('height').value = data.height ?? '';
  document.getElementById('layerId').value = data.layerId ?? '';
  document.getElementById('delta').value = data.delta ?? '';
}

// ===================================
// Receive Message
// ===================================
addEventListener("message", e => {
  clog(e.data);
  if (e.source !== parent || !e.data.title) return;
  switch(e.data.title){
    case 'mouseEventData':
      setMouseEventInfo(e.data.value);
      break;
    default:
      break;
  }
});

// ===================================
// Buttons
// ===================================
const mouseEvents = [
  "click",
  "doubleclick",
  "mousedown",
  "mouseup",
  "rightclick",
  "rightdown",
  "rightup",
  "middleclick",
  "middledown",
  "middleup",
  "mousemove",
  "mouseenter",
  "mouseleave",
  "pinchstart",
  "pinchend",
  "pinchmove",
  "wheel",
];
const eventTypes = ['on','off','once'];
const mouseEventCtn = document.getElementById('mouse-events-ctn');

mouseEvents.forEach((event)=>{
  const line = document.createElement('div');
  line.className = 'line';

  const eventTitle = document.createElement('span');
  eventTitle.className = 'api-name';
  eventTitle.innerHTML = event;

  const ctn = document.createElement('div');
  ctn.className = 'btn-ctn e3';

  eventTypes.forEach((type)=>{
    const btn = document.createElement('button');
    btn.id = type + '-' + event;
    btn.innerHTML = type;
    btn.addEventListener("click", (e) => {
      parent.postMessage({
        action: type + event,
      }, "*");
    });
    ctn.appendChild(btn);
  })

  line.appendChild(eventTitle);
  line.appendChild(ctn);
  mouseEventCtn.appendChild(line);
})

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
  "%c API DEMO MOUSE INIT %c",
  "background-color:#00D0B9;border-radius:2px;color:#000",
  ""
);


    </script>
`,{width: 500, height: 500});

const handles = {};

// ===================================
// onMouseMove
// ===================================
const eventCallbacks = {}

const mouseEvents = [
  "click",
  "doubleclick",
  "mousedown",
  "mouseup",
  "rightclick",
  "rightdown",
  "rightup",
  "middleclick",
  "middledown",
  "middleup",
  "mousemove",
  "mouseenter",
  "mouseleave",
  "pinchstart",
  "pinchend",
  "pinchmove",
  "wheel",
];

mouseEvents.forEach((event)=>{
  eventCallbacks[event] = function(e){
    clog(event,e);
    reearth.ui.postMessage({
      title: 'mouseEventData',
      value: {
        event,
        ...e
      }
    });
  }
})

mouseEvents.forEach((event)=>{
  handles['on'+event] = () => {
    reearth.on(event, eventCallbacks[event]);
  }
  handles['off'+event] = () => {
    reearth.off(event, eventCallbacks[event]);
  }
  handles['once'+event] = () => {
    reearth.once(event, eventCallbacks[event]);
  }
})

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