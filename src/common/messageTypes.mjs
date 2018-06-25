const messageTypes = {};

messageTypes[`malformed`] = {
  from: [`server`],
  validate: (object) => true
};

messageTypes[`heartbeat-request`] = {
  from: [`client`],
  validate: (object) => {
    return true; // TODO
  }
};

messageTypes[`heartbeat-response`] = {
  from: [`server`],
  validate: (object) => {
    return true; // TODO
  }
};

messageTypes[`plant-seed-request`] = {
  from: [`client`],
  validate: (object) => {
    return typeof object.seed === 'string';
  }
};

messageTypes[`plant-seed-response`] = {
  from: [`server`],
  validate: (object) => {
    return typeof object.valid === 'boolean';
  }
};

messageTypes[`inquire-storage-request`] = {
  from: [`server`],
  validate: () => true
};

messageTypes[`inquire-storage-response`] = {
  from: [`server`],
  validate: () => true
};

export default messageTypes;
