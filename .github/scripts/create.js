var fs = require('fs');
console.log(process.env.DATA);
fs.writeFileSync('submission.json', process.env.DATA);
