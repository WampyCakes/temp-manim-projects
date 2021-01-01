const fetch = require('node-fetch');
var fs = require('fs')
var submissions = require('../../submissions.json')
var newSubmission = require('../../submissions/'+process.argv[2]+'.json')

submissions.push(newSubmission)

// If sorting performance becomes an issue, look into https://github.com/Pimm/mapsort (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Sorting_with_map)
function date_sort(a, b) {
    return new Date(b.date) - new Date(a.date)
}

submissions.sort(date_sort)

Object.keys(submissions).forEach((key) => {
    submissions[key] = Object.values(submissions[key]) 
})
fs.writeFileSync('../../submissions.json', JSON.stringify(submissions))
