// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  performAction: (message: string) => ipcRenderer.send('perform-action', message)
});

window.addEventListener('DOMContentLoaded', () => {
  ipcRenderer.on('render-action', (event) => {
    console.log(event);
  });
});
