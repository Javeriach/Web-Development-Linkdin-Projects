// Elements getters
let fullBox = document.getElementById('box');
let serchBTn=document.getElementById('search');
let temp=document.getElementById('temp');
let fullData=document.getElementById('fullData');
let cityName=document.getElementById('cityName');
let tempWritten = document.getElementById('temperature');
let msg= document.getElementById('msg');
let darkBtn= document.getElementById('darkBtn');
let darkbtn_icon=document.getElementById("darkbtn_icon");
let icon=document.getElementById('icon');


// for displaying the alread City related on clicking the input to get new City's Data
cityName.addEventListener('click',function()
{
    fullBox.classList.add('d-none');
    darkbtn_icon.classList.add('d-none');
    fullData.innerHTML='';
    console.clear();
   
})

// To get Current City Data

serchBTn.addEventListener('click',function()
{
    msg.classList.add('d-none');
    
    let response= fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=33068c95f89daa7d00fc2220c223a8da&units=metric`)
        let output=response.then((response)=>
        {
            

         
           if(response.ok !== true)
           {
             
                msg.classList.remove('d-none');
                setTimeout(()=>
                {

                    msg.classList.add('d-none');
                },3000)
        
           }
           else
           {
               let ans=response.json();
               return ans;
    
           }
        })
        .then((response)=>
        {
            if(response !== undefined)
            {

                let country =response.sys.country;
                let date;
               
               
                    let timeString;
                
                            timeString= giveTime(response.timezone);
                            fullBox.classList.remove('d-none');
                            let weather=  response.weather;
                            setIcons(weather[0].main);
                           
                            temp.innerHTML= response.main.temp + `&deg;C`;
                            fullData.innerHTML=`
                            <h4>Weather: ${weather[0].main}</h4>
                            <h4>${timeString}</h4>
                            <h4>${cityName.value},${country}</h4>
                            <h5 class="mt-0">Feels_like : ${response.main.feels_like  + `&deg;C`} </h5>
                            <h5  class="mt-0">Temp_min : ${response.main.temp_min   +`&deg;C` }</h5>
                            <h5  class="mt-0">Temp_max : ${response.main.temp_max  +`&deg;C` } </h5>
                            <h5  class="mt-0">Pressure : ${response.main.pressure} </h5>
                            <h5  class="mt-0">Humidity: ${response.main.humidity+'%'} </h5>
                           `;
                           darkbtn_icon.classList.remove('d-none');
                   
                   
                
            
                }
        })
        .catch((error)=>
        {
                 console.log(error);
        });


    

});

// Applyin the dark Mode
darkBtn.addEventListener('click',function()
{
    
     document.body.classList.toggle('dark-theme');
    
    if(document.body.classList.contains('dark-theme'))
    {
        // for removing the box background images
        fullBox.classList.remove('box_background');
        // after aplying dark background we are adding changing the dark mode symbol into light mode icon
        darkBtn.innerHTML=`<i   class="fa-sharp fa-solid fa-sun fs-3" ></i>`;
        // for changing the dark mode button background
        darkBtn.classList.remove('bg-white');
        darkBtn.classList.add('bg-dark');
        darkBtn.classList.remove('text-dark');
        darkBtn.classList.add('text-light');

    }
    else{
        fullBox.classList.add('box_background');
        // for reverting the colors
        darkBtn.innerHTML=`<i class="fa-duotone fa-moon fa-solid fs-3 mt-1"></i>`
        darkBtn.classList.add('bg-white');
        darkBtn.classList.remove('bg-dark');
        darkBtn.classList.add('text-dark');
        darkBtn.classList.remove('text-light');
    }

});

// ---------------------Functions Area-------------------------------------------

function setIcons(weather)
{
    // set Display all the icons to display none at the start
   

    if(weather === `Smoke`)
    {
       icon.innerHTML=`<img src="/WeatherApp/Images/smoke.png" class="image" >`
    }
    else if(weather === `Rain`)
    {
        icon.innerHTML=`<img src="/WeatherApp/Images/smoke.png" class="image" >`
        
    }
    else if(weather === `Sunny`)
    {
        icon.innerHTML=` <i  id="sun" class="fa-sharp fa-solid fa-sun text-warning d-none" ></i>`
    } 
    
    else if(weather === 'Clouds')
    {
        icon.innerHTML=`  <img src="/WeatherApp/Images/cloud.png"  class="image" id="cloud">`
       
    }
    else if(weather === 'Clear')
    {
        icon.innerHTML=`<img src="/WeatherApp/Images/clear-sky.png" class="image ">`
        
    }

    else if(weather === 'Thunderstorm')
    {
        icon.innerHTML=`<img src="/WeatherApp/Images/thunderstorm.png"  class="image ">`
        
    }

    else if(weather === 'Mist')
    {
        icon.innerHTML=` <img  src="/WeatherApp/Images/mist (1).png"  class="image ">`
        
    }

    else if(weather === 'Fog')
    {
        icon.innerHTML=`<img  src="/WeatherApp/Images/fog.png" class="image">`
       
    }

    else if(weather === 'Haze')
    {
        icon.innerHTML=` <img  src="/WeatherApp/Images/haze (3).png"  class="image"> `
        
    }

    else if(weather === 'Snowfall')
    {
        icon.innerHTML=` <img  src="/WeatherApp/Images/snowflake.png"  class="image ">`
        
    }
    else if(weather === 'Hot')
    {
        icon.innerHTML=`<img  src="/WeatherApp/Images/hot.png"  class="image "> `
        
    }
    else if(weather === 'Cold')
    {
        icon.innerHTML=`<img src="/WeatherApp/Images/cold.png"  class="image ">  `
        
    }
    
  
}

                // for getting the current City Time
function giveTime(timezone)
{
    const timeZoneInMilliseconds = (timezone * 1000) ;

    // Create a Date object representing the current day date and time in local timezone of user divice
    const utcDate = new Date();
    console.log(utcDate.getTime());
    
    // Calculate the day date and time in the specified time zone
    
    const timeZoneDate = new Date(utcDate.getTime() + timeZoneInMilliseconds);

    //utcDate.getTime() = 1692 etc total 14 digits almost
    // Format the date and time using the specified time zone
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'UTC',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      weekday: 'long'
     
    });
    console.log(formatter);
    const formattedDate = formatter.format(timeZoneDate);
    return formattedDate;
    
}

