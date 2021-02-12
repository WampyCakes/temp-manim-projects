// This script is called by the add-video.yml workflow; it updates the videos.json file

const { request } = require('@octokit/request')
var fs = require('fs')

// An immediately invoked function expressed threw an error here before for some reason. Maybe it was incorrect syntax..
run();
async function run() {
    // Read the body of the video submission issue
    await request('GET /repos/{owner}/{repo}/issues/{issue_number}', {
        // owner and repo have to be split because directly injecting ${{ github.repository }} changes the '/' character.
        // Printing process.argv[3] displays it correctly, but it doesn't work here.
        owner: process.argv[3].split('/')[0],
        repo: process.argv[3].split('/')[1],
        issue_number: process.argv[2]
    }).then(response => {
        // For some reason unknown to me, requiring the JSON files throws a Module Not Found Error
        // This works locally, but not on GitHub. Why??
        // var videos = require('videos.json')
        var videos = JSON.parse(fs.readFileSync('videos.json'))
        
        // This is the JSON contained in the issue body.
        var submission = JSON.parse(response.data.body.replace('\r', '').split('yaml\n')[1].split('```')[0]);
        
        var newSubmission = []
        
        // Because we keep the key:value pairs in the same order throughout the whole process,
        // we can remove the keys. Between this and stringifying without extra whitespace, my
        // testing has shown this will reduce the size of the videos.json file by roughly 90%.
        // Very important so that we a) can fit roughly twice as many videos before hitting the
        // GitHub file size limit and b) reduce loading time of the website.
        Object.values(submission).forEach((value) => {
            newSubmission.push(value)
        })

        videos.push(newSubmission)

        // If sorting performance becomes an issue, look into https://github.com/Pimm/mapsort
        // (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Sorting_with_map)
        // We want to sort here so that lazyily reading the videos.json file on the website returns
        // the newest entries by default (or oldest if so desired). This saves time later by not having
        // to sort the data the website receives. Additionally, because the sort will only ever have one
        // entry out of order, it *shouldn't* become an issue. This seems an easier method than trying
        // to push the new entry into the correct index by checking dates.
        function date_sort(a, b) {
            return new Date(b[0]) - new Date(a[0])
        }

        videos.sort(date_sort)

        fs.writeFileSync('videos.json', JSON.stringify(videos))
    }).catch((error) => {
        console.log(error);
    })
}