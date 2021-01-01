var fs = require('fs');
console.log(JSON.parse(process.env.DATA));
fs.writeFileSync('submission.json', process.env.DATA);
