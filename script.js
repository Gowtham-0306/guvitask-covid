 function apifetch(){


 
    return new Promise ( (resolve , reject) => {



         var res =  fetch("https://data.covid19india.org/v4/min/timeseries.min.json");
      
     res.then(data=> data.json()).then(data1=>{


if(data1.status != 420){  resolve (data1)} else{



    console.log("Problem found in API Fetch");
}
      
     }).catch((err)=>{console.log(err)
        reject (err)
    
    
    
    })

    })
}








async function covidDatas(){
  var states =  await apifetch();

  for (var keys in states){
      var rows = document.getElementById("rows");
      var div = document.createElement("div");
      div.setAttribute("class", "col-lg-4 col-sm-6");

      div.innerHTML = `
          <div class="card" style="width: 18rem;">
              <div class="card-body">
                  <h6>State Name : ${keys} </h6>
                  <div>
                     
<input id="date-${keys}" type="text" id="dateinput" placeholder="yyyy-mm-dd"> 
                  </div>
                  <button class="btn-${keys}" onclick="dateshow('${keys}')">Get death count</button>
                  <div id="div-${keys}"></div> 
              </div>
          </div>
      `;
      rows.append(div);
  }
}

covidDatas();




// The below function we are using to get death count from the covid19 API //
async function dateshow(keyss){
  var inpbox = document.getElementById(`date-${keyss}`);
  var date = inpbox.value;
  var states =  await apifetch();
   var div = document.getElementById(`div-${keyss}`);
   div.innerHTML = `
   
   
   
   
   <h6> Death count : ${states[keyss].dates[date]?.delta?.confirmed != undefined ? states[keyss].dates[date].delta.confirmed : "no death data for the entered date"} </h6>
   
   `;
  console.log(states[keyss].dates[date].delta.confirmed);
}
