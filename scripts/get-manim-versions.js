const https = require('https')
const fs = require('fs')

console.log('test');
if(new Date().getHours() == 0){
    console.log('Checking PyPi for releases');
    https.get('https://pypi.org/pypi/manim/json', (response) => {
        let data = '';

        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            fs.writeFileSync('manim-versions.json', JSON.stringify(Object.keys(JSON.parse(data).releases).reverse()))
        })
    })
}
