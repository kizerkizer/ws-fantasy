// TODO

console.log(`generating temp/common/messageTypeToStringType.mjs`);

import fs from 'fs';

import h2c from '../hyphen2camel.mjs';
import validators from '../messageTypes.mjs';

let js = '';

js += `// ! This file is generated automatically. Do not edit this file!\n`
js += `import * as MessageTypes from './MessageTypes.mjs';\n`;
js += `export default {\n`;

for (let messageType in validators) {
  js += `    [MessageTypes.${h2c(messageType)}]:\n        '${messageType}',\n`;
}

js += `}`;

fs.writeFileSync(`temp/common/messageTypeToStringType.mjs`, js); // assuming script run from root of project
