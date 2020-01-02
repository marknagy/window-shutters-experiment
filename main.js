const lidHeight = 10;
const shutters = document.getElementsByClassName("shutter");
const lidOpenInterval = 100; //ms

for (shutter of shutters) {
  initShutter(shutter);
}

function initShutter(shutter) {
  const numLids = shutter.offsetHeight / lidHeight;
  for (let i = 0; i < numLids; i += 1) {
    const lid = document.createElement("li");
    lid.classList.add("lid");

    shutter.appendChild(lid);
    shutter.setAttribute("numLids", numLids);
  }
}

function toggleLids(shutter, isOpen) {
  const lids = shutter.getElementsByClassName("lid");

  for (let i = 0; i < lids.length; i += 1) {
    const lid = lids[i];

    window.setTimeout(() => {
      if (isOpen) {
        lid.classList.add("up");
      } else {
        lid.classList.remove("up");
      }
    }, lidOpenInterval * i);
  }
}

function pullShutter(shutter, isOpen) {
  if (isOpen) {
    toggleLids(shutter, true);
    window.setTimeout(() => {
      shutter.classList.add("up");
    }, (shutter.getAttribute("numLids") - 5)  * lidOpenInterval);
  } else {
    shutter.classList.remove("up");
    window.setTimeout(() => {
      toggleLids(shutter, false);
    }, (shutter.getAttribute("numLids") - 2) * lidOpenInterval);
  }
}

const openButton = document.getElementById("open");
openButton.addEventListener("click", () => {
  for (let i = 0; i < shutters.length; i += 1) {
    window.setTimeout(() => {
      pullShutter(shutters[i], true);
    }, i * 1000 * Math.random());
  }
});

const closeButton = document.getElementById("close");
closeButton.addEventListener("click", () => {
  for (shutter of shutters) {
    pullShutter(shutter, false);
  }
});
