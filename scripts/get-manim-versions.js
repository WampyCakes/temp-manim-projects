const https = require('https')
const fs = require('fs')

if(new Date().getHours() == 0){
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
