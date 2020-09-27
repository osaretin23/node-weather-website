//Require the request module
const request = require('request');

//Creates a geocode fucntion that uses call back to return the http response made to the mapbox api
const geocode = (address, callback) => {
    //Assigns the url
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoib3NhcmV0aW5vc2Vtd2Vua2hhIiwiYSI6ImNrZmZtNHp4NTAxNWcyc3FxaW9temE5M3MifQ.pSa5KnAZJ2Bh4QXY5of4AA&limit=1"

    //Request fucntion to make api call to the above url
    request({url, json: true}, (error, {body}) => {
        if (error){
            callback('Unable to connect to location services', undefined)
        } else if (body.features.length == 0){
            callback('Unable to find location. Try another search', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

//Allow the geocode function to be used by other module
module.exports = geocode;