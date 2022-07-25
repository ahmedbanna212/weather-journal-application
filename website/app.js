

/* Global Variables */
const key= '4de2f4a937053afd10667c3eee25e927&units=imperial';


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();

//submet event trigger
document.getElementById('generate').addEventListener('click',function(){
    getPosition();
});


const getPosition = async () =>{
    const zip=document.getElementById('zip').value;
    console.log(zip);
    const request = await fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${zip}&appid=${key}`)
    .then(function(allData){ return allData.json()})
    .then((allData) => { getTemp(allData.lat, allData.lon); });
};

const getTemp= async (lat,lon)=>{
    const input  = document.getElementById('feelings').value;
    const request = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`)
    .then(function(allData){ return allData.json()})
    .then(function(allData){  postData("/add",{date:newDate , feel:input , temp:allData.main.temp})})
    .then(setTimeout(async ()=> await retrieveData(),1000));
};

const postData = async ( url = '', data = {})=>{

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json',},
        body: JSON.stringify(data),
    });
    try{
        const content = await response.json();
        return content;}
    catch{
        console.log("error");
    }
};


const retrieveData = async () =>{
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        console.log(allData)
        document.getElementById('temp').innerHTML = Math.round(allData.temp)+ ' degrees';
        document.getElementById('content').innerHTML = allData.feel;
        document.getElementById("date").innerHTML =allData.date;
    }
    catch(error) {
        console.log( "error", error);
    }
}