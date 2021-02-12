const request=require('request')

const forecast=(lat,long,callback)=>{
    const url='https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+long+'&appid=7e47f8a2341495bf9ea04ddeb402022e'
    // request({url:url,json:true},(error,response)=>{                          //destruction object
    request({url,json:true},(error,{body})=>{
        if(error)
        {
            callback('unable to connect to weather service!',undefined)
        }
        else if(body.cod==400)
        {
            callback('Unable to find location',undefined)
        }
        else
        {
            // callback(undefined,response.body.daily[0].weather[0].description+" .  It is currently "+response.body.current.temp+" temprature and humidity is "+response.body.current.humidity+" humidity")
            callback(undefined,body.daily[0].weather[0].description+" .  It is currently "+body.current.temp+" temprature and humidity is "+body.current.humidity+" humidity")
        }
    })
}
module.exports=forecast