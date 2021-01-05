var fs = require('fs')
const args = process.argv.slice(2)
data = {
    "date": args[0],
    "title": args[1],
    "author": args[2],
    "credit": args[3],
    "video_url": args[4],
    "description": args[5],
    "source": args[6],
    "fields": args[7],
    "subfields": args[8],
    "tags": args[9],
}
fs.writeFileSync('./submissions/'+data.author+' - '+data.title+'.json', JSON.stringify(data, null, "\t"))
console.log(args[10])
