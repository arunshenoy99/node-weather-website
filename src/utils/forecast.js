const request = require('request')

const forecast = (latitude,longitude,callback)=>{
    const url = 'https://api.darksky.net/forecast/32c0594ea0f629f5327a3c9a84e20fbb/'+latitude+','+longitude+'?units=si'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to weather service',undefined)
        }
        else if (body.error){
            callback('Unable to find location',undefined)
        }
        else{
            const {temperature,precipProbability:precipProb}=body.currently
            callback(undefined,{
                temperature,
                precipProb,
                summary:body.daily.summary,
                tempHigh:body.daily.data[0].temperatureHigh,
                tempLow:body.daily.data[0].temperatureLow
            })
        }
    })
}
module.exports=forecast