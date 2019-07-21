const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()

//Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
const port = process.env.PORT||3000

//Setup handlebars engine and views location

app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve

app.use(express.static(publicDirectoryPath))

//Handle requests

 app.get('',(req, res)=>{                    
    res.render('index',{
        title:'Weather',
        name:'Arun'
    })
 })

 app.get('/about',(req , res) =>{
     res.render('about',{
         title:'About Me',
         name:'Arun'
     })
 })

app.get('/help',(req , res) =>{
    res.render('help',{
        msg:'This is the help message',
        title:'Help page',
        name:'Arun'
    })
})
app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({error:'Please provide an address'})
    }
    geocode(req.query.address,(error,{longitude,latitude,location}={})=>{
        if(error){
           return res.send({error})
        }
        forecast(latitude,longitude,(error,{temperature,precipProb,summary}={}) =>{
            if(error)
            {
                return res.send({error})
            }
            const forecast = summary+' It is currently '+temperature+' degrees out. The chance of rain is '+precipProb+'%'
            res.send({forecast,location,address:req.query.address
            })
        })
    })
})


app.get('/help/*',(req, res) => {
    res.render('404page',{
        title:'404 PAGE',
        name:'Arun',
        errorMessage:'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404page',{
        title:'404 PAGE',
        name:'Arun',
        errorMessage:'Page not found'
    })
})

//Start up the server

app.listen(port,() => {
    console.log('Server is up on port '+port)
})