const request=require('request')
const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiamFpbWluMzMiLCJhIjoiY2trejdmOXNvMTdqODJxbzRvbGhiMHE0eCJ9.nm7nkzAAira0-wZvjTn7iA&limit=1'
    // request({url:url,json:true},(error,response)=>{                          //object destruction
    request({url,json:true},(error,{body})=>{    
    if(error)
        {
            callback("Unable to connect.",undefined)
        }
        else if(body.features.length===0)
        {
            callback("unable to find location.Try another one",undefined)
        }
        else
        {
            callback(undefined,{
                // lat:response.body.features[0].center[1],
                // long:response.body.features[0].center[0],
                // location:response.body.features[0].place_name
                lat:body.features[0].center[1],
                long:body.features[0].center[0],
                location:body.features[0].place_name
            })
        }
    })
}
module.exports=geocode