import fs from 'fs';

console.log(`generating temp/common/MessageTypes.mjs`);

import h2c from '../common/hyphen2camel.mjs'; // TODO
import validators from '../common/messageTypes.mjs'; // TODO

let js = '';

js += `// ! This file is generated automatically. Do not edit this file!\n`

for (let messageType in validators) {
  js += `const ${h2c(messageType)} =`
  js += '\n';
  js += `    Symbol('MessageType.${h2c(messageType)}');`
  js += '\n';
}

js += 'export {\n'

for (let messageType in validators) {
  js += `    ${h2c(messageType)},\n`;
}

js += '}';

fs.writeFileSync(`temp/common/MessageTypes.mjs`, js); // assuming script run from root of project
