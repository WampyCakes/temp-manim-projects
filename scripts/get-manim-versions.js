const https = require('https');
const fs = require('fs');
const path =  require('path');

var scriptName = path.basename(__filename)

if(new Date().getHours() == 0 || process.argv[2] == true){
    try {
        console.log(scriptName+' - Checking PyPi for Manim releases.');
        https.get('https://pypi.org/pypi/manim/json', (response) => {
            let data = '';

            response.on('data', (chunk) => {
                data += chunk;
            });

            response.on('end', () => {
                try {
                    fs.writeFileSync('manim-versions.json', JSON.stringify(Object.keys(JSON.parse(data).releases).reverse()));    
                    console.log(scriptName+' - Wrote the manim-versions.json file.');
                } catch (error) {
                    console.log(scriptName+' - '+error);
                }
            })
        })       
    } catch (error) {
        console.log(scriptName+' - '+error);
    }
}else {
    console.log(scriptName+' - Not checking PyPi at this hour.');
}
