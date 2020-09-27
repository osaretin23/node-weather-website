const request = require("request");

//Creates forecast fucntion that returns the weather of a specific location
const forecast =  (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=5355704af143b8389f9a131547a4b2e6&query=" + encodeURIComponent(longitude) + "," + encodeURIComponent(latitude) + "&units=f";
    console.log(url)

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback("Unable to connect to weather service!", undefined)
        } else if (body.error){
            callback("Unable to find location", undefined)
        } else {
            callback(undefined, {
                weather: body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degrees but it feels like " + body.current.feelslike + " degrees out"
            })
        }
    })
}

module.exports = forecast;