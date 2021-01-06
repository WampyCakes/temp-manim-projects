// This script is called by the add-entry.yml workflow

const { request } = require('@octokit/request')
var fs = require('fs')
// For some reason unknown to me, requiring the JSON files throws a Module Not Found Error
// This works locally, but not on GitHub. Why??
// var submissions = require('./submissions.json')
run();
async function run() {
    await request('GET /repos/{owner}/{repo}/issues/{issue_number}', {
        owner: process.argv[3].split('/')[0],
        repo: process.argv[3].split('/')[1],
        issue_number: number
    }).then(response => {
        var submissions = JSON.parse(fs.readFileSync('submissions.json'))
        var submission = response.data.body.split('yaml\n')[1].split('```')[0];
        var newSubmission = []
        console.log(JSON.stringify(submission))
        // Because we keep the key:value pairs in the same order throughout the whole process,
        // we can remove the keys. Between this and stringifying without extra whitespace, my
        // testing has shown this will reduce the size of the submissions.json file by roughly 90%.
        // Very important so that we a) can fit roughly twice as many submissions before hitting the
        // GitHub file size limit and b) reduce loading time of the website.
        Object.values(submission).forEach((value) => {
            newSubmission.push(value)
        })

        submissions.push(newSubmission)

        // If sorting performance becomes an issue, look into https://github.com/Pimm/mapsort
        // (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Sorting_with_map)
        // We want to sort here so that lazyily reading the submissions.json file on the website returns
        // the newest entries by default (or oldest if so desired). This saves time later by not having
        // to sort the data the website receives. Additionally, because the sort will only ever have one
        // entry out of order, it *shouldn't* become an issue. This seems an easier method than trying
        // to push the new entry into the correct index by checking dates.
        function date_sort(a, b) {
            return new Date(b[0]) - new Date(a[0])
        }

        submissions.sort(date_sort)

        fs.writeFileSync('submissions.json', JSON.stringify(submissions))
    }).catch((error) => {
        console.log(error);
    })
}
