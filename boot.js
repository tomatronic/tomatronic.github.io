// If user hasn't authed with Fitbit, redirect to Fitbit OAuth Implicit Grant Flow

var $today = new Date();
$yesterday = new Date($today);
$yesterday.setDate($today.getDate() - 1);
var $dd = $yesterday.getDate();
var $mm = $yesterday.getMonth()+1; //January is 0!

var $yyyy = $yesterday.getFullYear();
if($dd<10){$dd='0'+$dd} if($mm<10){$mm='0'+$mm} $yesterday = $yyyy+'-'+$mm+'-'+$dd;

console.log($yesterday);

var fitbitAccessToken;

if (!window.location.hash) {
    window.location.replace('https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=228CNL&redirect_uri=http%3A%2F%2Fwww.tomthepom.co.uk%2Ffitbit.html&scope=activity%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight&expires_in=604800');
} else {
    var fragmentQueryParameters = {};
    window.location.hash.slice(1).replace(
        new RegExp("([^?=&]+)(=([^&]*))?", "g"),
        function($0, $1, $2, $3) { fragmentQueryParameters[$1] = $3; }
    );

    fitbitAccessToken = fragmentQueryParameters.access_token;
}

// Make an API request and graph it
var processResponse = function(res) {
    if (!res.ok) {
        throw new Error('Fitbit API request failed: ' + res);
    }

    var contentType = res.headers.get('content-type')
    if (contentType && contentType.indexOf("application/json") !== -1) {
        return res.json();
    } else {
        throw new Error('JSON expected but received ' + contentType);
    }
}

var processHeartRate = function(timeSeries) {
    return timeSeries['activities-heart-intraday'].dataset.map(
        function(measurement) {
            return [
                measurement.time.split(':').map(
                    function(timeSegment) {
                        return Number.parseInt(timeSegment);
                    }
                ),
                measurement.value
            ];
        }
    );
}

var graphHeartRate = function(timeSeries) {
    console.log(timeSeries);
    var data = new google.visualization.DataTable();
    data.addColumn('timeofday', 'Time of Day');
    data.addColumn('number', 'Heart Rate');

    data.addRows(timeSeries);

    var options = google.charts.Line.convertOptions({
        height: 450
    });

    var chart = new google.charts.Line(document.getElementById('chart'));

    chart.draw(data, options);
}
var fetchDate = "https://api.fitbit.com/1/user/447QNC/activities/heart/date/"+$yesterday+".json";
console.log(fetchDate);
fetch(
    fetchDate,
    {
        headers: new Headers({
            'Authorization': 'Bearer ' + fitbitAccessToken
        }),
        mode: 'cors',
        method: 'GET'
    }
).then(processResponse)
.then(processHeartRate)
.then(graphHeartRate)
.catch(function(error) {
    console.log(error);
});


