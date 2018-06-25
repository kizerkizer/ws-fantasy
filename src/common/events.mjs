const events = new Map();

const on = (event, fn) => {
  let list;
  if (!(list = events.get(event))) {
    list = [];
    events.set(event, list);
  }
  list.push(fn);
}

const emit = (event, ...rest) => {
  let list;
  if (list = events.get(event)) {
    list.map(fn => fn(...rest));
  }
}

const getNumberOfHandlers = (event) => {
  let list;
  if (list = events.get(event)) {
    return list.length;
  }
  return 0;
};

export {
  on,
  emit,
  getNumberOfHandlers
};
