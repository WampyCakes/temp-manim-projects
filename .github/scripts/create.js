var fs = require('fs');
fs.writeFileSync('submission.json', JSON.stringify(process.env.DATA));
