/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/latest/tutorial/process-model
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './index.css';

const mutations = {
  ADD: 'ADD',
  SET: 'SET'
};

console.log('👋 This message is being logged by "renderer.js", included via webpack');

const broadcast = new BroadcastChannel(`message_broadcast`);

broadcast.onmessage = (ev: MessageEvent<any>) => {
  ev.preventDefault();

  console.log(`onmessage`, ev.data);
};

document.getElementById('new_window')
  .addEventListener('click', () => {
    window.electronAPI.performAction('Hello World!');
  });

document.getElementById('send_message')
  .addEventListener('click', () => {
    broadcast.postMessage({
      mutation: mutations.ADD,
      value: 'Hello World!',
    });
  });

// const worker = new SharedWorker(`/my.worker.ts`);

// console.log(`worker: `, worker);

// const handleSendMessage = (ev: MessageEvent<any>) => {
//   ev.preventDefault();

//   console.log(`onmessage`);

//   return '';
// }

// worker.port.onmessage = handleSendMessage;


