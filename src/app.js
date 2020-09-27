const { response, request } = require("express");
const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast")


//Stores express application
const app = express();

//Define paths for Express Config
//Creates path for public directory
const publicDirectoryPath  = path.join(__dirname, '../public');
//Creates a path that tells express what directory to look for the hbs file rather than using the default views directory
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");


//Setup handlebars engine and views location
app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res)=> {
    res.render('index', {
        title: "Weather",
        name: "Osaretin Osemwenkha"
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: "Osaretin Osemwenkha"
    })
})

app.get('/help', (eq, res) => {
    res.render('help', {
        help: "This is some helpful text",
        title: "Help",
        name: "Osaretin Osemwenkha"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})


app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You mus provide a search query"
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: '404',
        name: "Osaretin Osemwenkha",
        errorMessage: "Help article not found" 
    })
})

app.get('*', (req,res)=>{
    res.render("404", {
        title: '404',
        name: "Osaretin Osemwenkha",
        errorMessage: "Page note found"    
    })
})

//start the server up and allow it to listen on 3000
app.listen(3000, () => {
    console.log("Server is up on port 3000")
})