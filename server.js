"use strict";
const express=require('express');
const app=express();
const cors=require('cors');
app.use(cors());
require('dotenv').config();
const weatherData=require('./data/weather.json');
const PORT=process.env.PORT;

// app.get('/',(req,res)=>{

//     res.status(200).send('Hello');
// });

// app.get('/data',(req,res)=>{
// let city= weatherData[2];
// let forcastDays=city.data.map(day=>{
//     return{
//         date:day.valid_date,
//         Description:day.weather.description
//     }
// });
// let customResponse={
//     forcast:forcastDays,
//     Name:city.city_name,

// }
//     res.status(200).json(customResponse);
// });

app.get('/weather',(req,res)=>{
    let lat=Number(req.query.lat);
    let lon=Number(req.query.lon);
    

    if (lat&&lon){
        let results=[];
    weatherData.forEach(item=>{
        if (item.lat===lat&&item.lon===lon){
            results.push(item)
        }
    })
    let city=results[0];
    let forCast=city.data.map(item=>{
        return{
            date:item.datetime,
            description:item.weather.description,
        }
    })
    res.status(200).json(forCast);
    }else{
        res.status(400).send("please send right query params")
    }
    
 })



app.listen(PORT,()=>{
console.log(`listening on port ${PORT}`)

});
