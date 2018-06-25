const errorMessage = `Invalid input`;

const encode = (object) => {
  if (typeof object !== `object` || typeof object.head !== `string` || typeof object.body !== `object`) {
    throw new TypeError(errorMessage);
  }
  if (Object.keys(object).length !== 2) {
    throw new TypeError(errorMessage);
  }
  try {
    var message = JSON.stringify(object);
  } catch (e) {
    throw new TypeError(errorMessage);
  }
  if (typeof message !== `string`) {
    throw new TypeError(errorMessage);
  }
  return message;
};

const decode = (message) => {
  if (typeof message !== `string`) {
    throw new TypeError(errorMessage);
  }
  try {
    var object = JSON.parse(message);
  } catch (e) {
    throw new TypeError(errorMessage);
  }
  if (typeof object !== `object` || typeof object.head !== `string` || typeof object.body !== `object`) {
    throw new TypeError(errorMessage);
  }
  if (Object.keys(object).length !== 2) {
    throw new TypeError(errorMessage);
  }
  return object;
};

export {
  encode,
  decode
}
