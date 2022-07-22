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

