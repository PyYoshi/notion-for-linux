const { app, BrowserWindow } = require("electron");
const Store = require('electron-store');

const storeKeyWindowBoundsWidth = 'windowBounds-Width'
const storeKeyWindowBoundsHeight = 'windowBounds-Height'
const storeKeyWindowBoundsX = 'windowBounds-X'
const storeKeyWindowBoundsY = 'windowBounds-Y'

const store = new Store();

const loadWindowBounds = () => {
  return {
    "width": store.get(storeKeyWindowBoundsWidth, 1024),
    "height": store.get(storeKeyWindowBoundsHeight, 768),
    "x": store.get(storeKeyWindowBoundsX, undefined),
    "y": store.get(storeKeyWindowBoundsY, undefined),
  };
}

const saveWindowBounds = (width, height, x, y) => {
  store.set(storeKeyWindowBoundsWidth, width)
  store.set(storeKeyWindowBoundsHeight, height)
  store.set(storeKeyWindowBoundsX, x)
  store.set(storeKeyWindowBoundsY, y)
}

app.on("ready", () => {
  const windowBounds = loadWindowBounds();

  const win = new BrowserWindow({
    autoHideMenuBar: true,
    title: "Notion",
    icon: __dirname + '/build/icons/icon.png',

    // window bounds
    width: windowBounds.width,
    height: windowBounds.height,
    x: windowBounds.x,
    y: windowBounds.y,
  });

  win.loadURL("https://notion.so");

  win.on('close', () => {
    const bounds = win.getBounds();
    saveWindowBounds(bounds.width, bounds.height, bounds.x, bounds.y);
  });
});
