

// Creating a new date instance dynamically with JS
let d = new Date();
let newDate = d.toDateString();
// baseurl to fetch to api of openweathermap
const baseUrl= "https://api.openweathermap.org/data/2.5/weather?zip=";
// Personal API Key for OpenWeatherMap API
const apiKey = "&appid=de85480fc66cffbe3b1eaafa278ccdda";
// to convert the temprature in data of openweathermap to celcuis
const conTemp = "&units=metric";

// HTML DOM element
const zip = document.getElementById("zip");
const textData = document.getElementById("text-data");
const generate = document.getElementById("generate");
const dateNow = document.getElementById("date");
const country = document.getElementById("city")


// Event listener to add function to existing HTML DOM element

generate.addEventListener("click",()=>{
      let weatherUrl = `${baseUrl}${zip.value}${apiKey}`
      getData(weatherUrl).then((data)=>{
        infoData(data).then((data)=>{
          postDataAll("/postData",data).then((data)=>{
            updateData(data);
          });
        });
      });
  }
);

const getData = async (weatherUrl)=>{
  try{
    const apiUrl = await fetch(weatherUrl);
    const data =await apiUrl.json();
    if(data.cod != 200){
      console.log(data.message);
    }
    return data;
  }
  catch(error){
    console.log("error:",error);
  }
};

const infoData = async (data)=>{
  try{
    const data = {
      date:newDate,
      temp:data.main.temp,
      name:data.name,
      text:textData.value
    }
    return data;
  }
  catch(error){
    console.log(error);
  }
}

const postDataAll = async ( url = '', data = {})=>{
      const res = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },       
      body: JSON.stringify(data), 
    });
      try {
        const newData = await res.json();
        return newData;
      }
      catch(error) {
      console.log("error", error);
      }
  }

  const updateData = async (data)=>{
      const result = await data;
      try{
        dateNow.innerHTML = result.Date;
        temp.innerHTML = result.temp;
        country.innerHTML = result.name;
        textData.innerHTML = result.text;
      }catch(err){
        console.log(err)
      }
  };


















// Event listener to add function to existing HTML DOM element

/* Function called by event listener */

/* Function to GET Web API Data*/

/* Function to POST data */


/* Function to GET Project Data */

// Setup empty JS object to act as endpoint for all routes
var projectData ={};

// Express to run server and routes
const express =require('express');
const port = 23344;
const host = '127.3.3.2';

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors= require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));
// Initialize all route with a callback function
// Callback function to complete GET '/all'
app.get('/getData',(req,res)=>{
    res.send(projectData);
    res.status(200).end();
})

// Post Route
app.post('/postData',(req,res)=>{
    projectData={
        temp:req.body.temp,
        date:req.body.date,
        textData:req.body.text,
        city:req.body.name
    };
    console.log(projectData);
    res.send(projectData).status(200).end();
})

// Spin up the server
// Callback to debug
app.listen(port,host,()=>{
    console.log(`server running on ${host} : ${port}`);
})