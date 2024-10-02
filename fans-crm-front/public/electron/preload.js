const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('api', {
    // Define your API here, e.g.:
    // sendMessage: (message) => ipcRenderer.send('message', message),
});