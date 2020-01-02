const lidHeight = 10;
const shutters = document.getElementsByClassName("shutter");

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
    }, 100 * i);
  }
}

function pullShutter(shutter, isOpen) {
  if (isOpen) {
    toggleLids(shutter, true);
    window.setTimeout(() => {
      shutter.classList.add("up");
    }, shutter.getAttribute("numLids") * 100);
  } else {
    shutter.classList.remove("up");
    window.setTimeout(() => {
      toggleLids(shutter, false);
    }, 2000);
  }
}

const openButton = document.getElementById("open");
openButton.addEventListener("click", () => {
  for (let i = 0; i < shutters.length; i += 1) {
    window.setTimeout(() => {
      pullShutter(shutters[i], true);
    }, 1000 * Math.random() * 3 + 1000);
  }
});

const closeButton = document.getElementById("close");
closeButton.addEventListener("click", () => {
  for (shutter of shutters) {
    pullShutter(shutter, false);
  }
});
