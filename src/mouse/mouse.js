reearth.ui.show(`
[HTML]
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