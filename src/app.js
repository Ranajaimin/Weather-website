const path=require('path')
const express=require('express')
const hbs=require('hbs')
const { response } = require('express')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname,'../public'))

const app=express()

const port=process.env.PORT || 3000

//define paths for express config
const pubdir=path.join(__dirname,'../public')
const viewspath=path.join(__dirname,'../templates/views')
const partialpath=path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialpath)

//setup static directory to serve
app.use(express.static(pubdir))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'jaimin s rana'
    })
})
 
app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help",
        helptext:"Some help text",
        name:'Jaimin s rana'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'jaimin s rana',
        age:20
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
           error:'you must provide a address'
       })
   }
   geocode(req.query.address,(error,{lat,long,location}={})=>{
    if(error)
    {
        return res.send({error})
    }
    forecast(lat,long,(error,forecastdata)=>{
        if(error)
        {
            return res.send({error})
        }
        res.send({
            forecast:forecastdata,
            location,
            address:req.query.address
        })
    })
   })
//    res.send({
//             forecast:"It is raining",
//             location:'khambhat',
//        address:req.query.address
//    })
})


app.get('/products',(req,res)=>{
    if(!req.query.search){
         return res.send({
            error:'you must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:"404 Error",
        errormessage:'Help artical not forund',
        name:'Jaimin s rana'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404 Error',
        name:'jaimin s rana',
        errormessage:'Page NOt Found'
    })
})
app.listen(port,()=>{
    console.log("server is up using in port"+port)
})