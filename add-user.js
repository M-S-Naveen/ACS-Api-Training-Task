// code for adding new users via add-user.html
var butn = document.getElementById('button');
var data = {};
butn.addEventListener("click", async function(){
    data.id = 111,
    data.name = document.getElementById("full-name").value;
    data.gender = document.getElementById("gender").value;
    data.email = document.getElementById("email").value;
    data.status = document.getElementById("status").value;

//console.log(data);
  await fetch("https://gorest.co.in/public/v2/users?access-token=3b409f6ceb53d42bde33208969d9ca649abcfe16d7942a2adacbb42bb2100f8c" , {
    method : "POST" , 
    body : JSON.stringify(data),
    headers : {
        "content-type" : "application/json;json; charset=UTF-8" ,
        "Authorization" : "Bearer" 
    }
  } )
}) 
