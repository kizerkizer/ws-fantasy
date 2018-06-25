import fs from 'fs';
import path from 'path';

const config = JSON.parse(fs.readFileSync('./config.json'));

/*const locked = new Map();

const lock = async (playerId) => {
  if (locked.get(playerId) === true) {
    return false;
  }
  locked.set(playerId, true);
  return true;
};

const unlock = async (playerId) => {
  locked.set(playerId, false);
};*/

export const get = async (playerId) => {
  return new Promise((resolve, reject) => {
    if (typeof playerId !== 'number') {
      reject(new TypeError(`playerId must be a number`));
      return;
    }
    fs.readFile(path.join(config.storage, `${playerId}.json`), (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      let object;
      try {
        object = JSON.parse(data.toString());
      } catch (e) {
        reject(e);
        return;
      }
      resolve(object);
    });
  });
};

export const set = async (playerId, object) => {
  return new Promise((resolve, reject) => {
    if (typeof playerId !== 'number') {
      reject(new TypeError(`playerId must be a number`));
      return;
    }
    let json;
    try {
      json = JSON.stringify(object);
    } catch (e) {
      reject(e);
      return;
    }
    fs.writeFile(path.join(config.storage, `${playerId}.json`), json, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
};


/// test

/*(async () => {
  try {
    await set(12345, {
      foo: `bar`
    });
  } catch (e) {
    console.log(e);
    process.exit();
  }
  let object;
  try {
    object = await get(12345);
  } catch (e) {
    console.log(e);
    process.exit();
  }
  console.log(object);
})();*/
