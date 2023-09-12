

let start = document.getElementById('start');
let end = document.getElementById('end');
let surah_number= document.getElementById('surah_number');
let btn=document.getElementById('btn');
let ayat_place=document.getElementById('ayat_div');
let surah_name=document.getElementById('surah_name');
let volumeIcon = document.getElementById('volume_iconBtn');
let volume_Div=document.getElementById('volume_Div');
let submitSurahNumber=document.getElementById('submitSurahNumber');
let divToshow= document.getElementById('divToshow');
let msg = document.getElementById('msg');
let numberOFtimesBTnClicked=1;
let countSubmitBtnClicked=0;

surah_number.addEventListener('click',function()
{
    if(countSubmitBtnClicked > 0)
    {
        divToshow.classList.add('divToshow');
        start.value =1;
        end.value=1;
        surah_name.innerText="";
    }
   
});

submitSurahNumber.addEventListener('click',function()
{
    countSubmitBtnClicked++;
   
    numberOFtimesBTnClicked=1;
   if(surah_number.value < 1 || surah_number.value === undefined)
   {
    alert('Please Enter The surah Number greater then 0');
   }
   else if(surah_number.value > 114)
   {
    alert('Please Enter The surah Number less or equal to  114');
   }
   else if(numberOFtimesBTnClicked === 1)
   {  
   
    divToshow.classList.remove('divToshow');
     ayat_place.innerText="";
    let request= new XMLHttpRequest();
   
    // Step2
    request.open('GET',`http://api.alquran.cloud/v1/surah/${surah_number.value}/en.asad`);
   
    // Step3
    request.send();

    // Step4
    request.addEventListener('load',function()
    {
        let response= JSON.parse(this.responseText) ;
       
        start.max = response.data.numberOfAyahs;
        end.max = response.data.numberOfAyahs;
    });

    }
})

btn.addEventListener('click',function(event)
{
  if(numberOFtimesBTnClicked === 1)
  

    if(surah_number.value > 114)
    {
        alert('Please enter the Surah with limit 114');
    }

    if(surah_number.value === undefined)
    {
        alert('Input Must be entered');
    }
    
    if(start.value > end.value)
    {
        alert('Plz select the start smaller than ending Ayah');
        start.value=1;
        end.value=1;
    }
    else if(start.value < end.value)
{
    ayat_place.innerText="";
    // Step1
    let request= new XMLHttpRequest();
    let sum= 1;
    let startingValue=Number(start.value) - sum;
    // Step2
    request.open('GET',`https://api.alquran.cloud/v1/surah/${surah_number.value}?offset=${startingValue}&limit=${end.value}`);
   
    // Step3
    request.send();

    // Step4
    request.addEventListener('load',function()
    {

          let response = JSON.parse(this.responseText);
        console.log( response);
           surah_name.innerText=response.data.name;

            let arra=[];
            let arrayForaudio=[];
            let k=0;

           for(let i = 0; i < ((response.data.ayahs.length) ) ; i++)
           {
            
              
                arra.push(`\n ${response.data.ayahs[k].text} `);
                arrayForaudio.push(`\n ${response.data.ayahs[k].text} `);
                arra.push('\n----------------------------\n');
                k++;
               
           }
            
           ayat_place.innerText = arra;
        
           console.log(arrayForaudio);

           let sum=1;
        
           let isPlaying =false;
           let PreviousAudio = false;
           volumeIcon.addEventListener('click',function()
           {
            //    if(numberOFtimesBTnClicked === 1)
              
               
                if(isPlaying === true || PreviousAudio === true)
                {
                    
                    console.log(msg);
                    msg.classList.remove('d-none');
                    console.log('No audio is already play . I will not play');
                    setTimeout(()=>
                    {
                        msg.classList.add('d-none');
                    },3000);
                }
                else if(numberOFtimesBTnClicked === 1)
                {
                    numberOFtimesBTnClicked=2;
                    console.log('clicked');

                        let request = new XMLHttpRequest();
                        let array2;
            
                    
                
                request.open('GET', `http://api.alquran.cloud/v1/surah/${surah_number.value}/ar.alafasy`);
                    
                

                    request.send();

                    request.addEventListener('load', function () {

                        // Making object
                        let response = JSON.parse(this.responseText);
                        console.log(response.data.ayahs);
                        let array= response.data.ayahs;
                        console.log(array);
                        let sum=1;
                       
                        let endValue = Number(end.value ) ;
                        console.log(endValue);
                    
                        let array2=  array.slice(startingValue,endValue);
                    console.log(array2);

                    
                    
                
                // procedure for playing the audio
                    let length=array2.length - 2;
                    let audio ;
                    audio= new Audio();
                    let currentIndex=0;
                    
                   
        
                    let i= 0;
                    function playAudio()
                    {
                            audio.src = array2[currentIndex].audio ;
                            
                            audio.currentTime = 0;
                        
                           if(audio.play())
                            {
                                
                                console.log('I am running');

                            }
                          
                            

                            
                        
                    }

                            audio.addEventListener('ended',function()
                            {
                            
                            
                                if(currentIndex <= length)
                                {
                                    currentIndex++;
                                    // audio.pause();
                                   
                                    playAudio();
                                    console.log(currentIndex , length);

                                   if(currentIndex === array2.length-1)
                                   {
                                    isPlaying = false;
                                    PreviousAudio =false;
                                    console.log('I have maek ur day');
                                    console.log(currentIndex);
                                    console.log(length);
                                    numberOFtimesBTnClicked=1;
                                   }
                                    
                                }
                             })
                             
                             if(isPlaying === false && PreviousAudio === false)
                             {
                                 playAudio();
                                 isPlaying=true;
                                 PreviousAudio =true;
                                 console.log()
           
                             }
    


                  
                });
              

                }
            
    

                
           })
      
    })
}
});









