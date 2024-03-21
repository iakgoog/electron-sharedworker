// https://stackoverflow.com/a/50641848

// interface SharedWorkerGlobalScope {
//   onconnect: (event: MessageEvent) => void;
// }

const _self: SharedWorkerGlobalScope = self as any;

const mutations = {
  ADD: 'ADD',
  SET: 'SET'
};

let browserInstances: MessagePort[] = [];
let messages: any[] = [];

_self.onconnect = function(e) {
  const port = e.ports[0];

  browserInstances.push(port);

  console.log(`browserInstances => `, browserInstances);

  port.onmessage = function({ data }) {
    switch(data.mutation) {
      case mutations.ADD:
        messages = [...messages, data.value];
        break;
      case mutations.SET:
        messages = data.value;
        break;
    }

    postMessage({ ...data, messages });
  }
}

function postMessage(message: { value: any[]; }) {
  if (!Array.isArray(message.value)) {
    message.value = [message.value];
  }

  browserInstances.map(instance => {
    instance.postMessage(message);
  });
}
