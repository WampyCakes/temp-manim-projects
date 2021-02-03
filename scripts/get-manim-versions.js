const https = require('https')
const fs = require('fs')

if(new Date().getHours() == 0){
    try {
        console.log('Checking PyPi for Manim releases');
        https.get('https://pypi.org/pypi/manim/json', (response) => {
            let data = '';

            response.on('data', (chunk) => {
                data += chunk;
            });

            response.on('end', () => {
                fs.writeFileSync('manim-versions.json', JSON.stringify(Object.keys(JSON.parse(data).releases).reverse()))
            })
        })       
    } catch (error) {
        console.log(error);    
    }
}
