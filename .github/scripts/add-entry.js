var fs = require('fs')
var submissions = JSON.parse(fs.readFileSync('submissions.json'))
var newSubmission = JSON.parse(fs.readFileSync('submissions/'+process.argv[2]+'.json'))

Object.keys(newSubmission).forEach((key) => {
    newSubmission[key] = Object.values(newSubmission[key]) 
})

submissions.push(newSubmission)

// If sorting performance becomes an issue, look into https://github.com/Pimm/mapsort (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Sorting_with_map)
function date_sort(a, b) {
    return new Date(b.date) - new Date(a.date)
}

submissions.sort(date_sort)

fs.writeFileSync('submissions.json', JSON.stringify(submissions))
