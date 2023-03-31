var data = 1;
let names = document.querySelectorAll(".name");
let emails = document.querySelectorAll(".email");
let genders = document.querySelectorAll(".gender");
let status = document.querySelectorAll(".status");
function prevData() {
  console.log("hello");
  if (data > 1) {
    data = data - 4;
  }
  goREST();
}
function nextData() {
  if (data < 100) {
    data = data + 4;
  }
  goREST();
}
async function goREST() {
  let response = await fetch(
    "https://gorest.co.in/public/v2/users?page" + data + "&per_page="+ data +
    4 +"/access-token=3b409f6ceb53d42bde33208969d9ca649abcfe16d7942a2adacbb42bb2100f8c"
  );
  let json = await response.json();
  for (let i = 0; 1 < names.length; i++) {
    names[i].innerText = json[i].name;
    emails[i].innerText = json[i].email;
    genders[i].innerText = json[i].gender;
    
  }
}
goREST();


async function apiCall() {
  let response = await fetch(
    "https://gorest.co.in/public/v2/users?access-token=3b409f6ceb53d42bde33208969d9ca649abcfe16d7942a2adacbb42bb2100f8c"
  );
  let commits = await response.json();

  var result = commits;

  if (result.length > 0) {
    var temp = "";
    result.forEach((element) => {
      temp += "<tr>";
      temp += "<td class='name'>" + element.name + "</td>";
      temp += "<td class='gender'>" + element.gender + "</td>";
      temp += "<td class='email'>" + element.email + "</td>";
      temp += "<td class='status'>" + element.status + "</td>";
      temp +=
        "<td>" +
        `<i class='fa fa-eye' aria-hidden='true' data-bs-toggle='tooltip' data-bs-placement='top' onclick='viewUser(${element.id})' title='View'></i>` +
        `<a href='edit-user.html'  onclick='store(${element.id})'><i class='fa fa-pencil' aria-hidden='true' data-bs-toggle='tooltip' data-bs-placement='top' title='Edit'></i></a>` +
        `<i class='fa fa-trash' onclick='deleteData(${element.id})' aria-hidden='true' data-bs-toggle='tooltip' data-bs-placement='top' title='Delete'></i>` +
        "</td>";
    });
    document.getElementById("data").innerHTML = temp;
  }
}
apiCall();

const storedItem = [];

function store(input) {
  console.log(input);
  storedItem.splice(0, storedItem.length);
  storedItem.push(input);
  sessionStorage.setItem("storedItem", JSON.stringify(storedItem));
  console.log(storedItem);
}

async function deleteData(id) {
  console.log(id);
  if (confirm("You want to delete the user data?")) {
    await fetch("https://gorest.co.in/public/v2/users/" + id + '?access-token=3b409f6ceb53d42bde33208969d9ca649abcfe16d7942a2adacbb42bb2100f8c',{
      method: "DELETE",
      headers : {
        "content-type" : "application/json;json; charset=UTF-8" ,
        "Authorization" : "Bearer" }
    })
      .then((res) => res.text()) // or res.json()
      .then((res) => alert("user data deleted"));
  }
}
//above code is to delete the user data and show it in alert
const item = [];
function viewUser(input) {
  console.log(input);
  item.splice(0, item.length);
  item.push(input);
  sessionStorage.setItem("item", JSON.stringify(item));
  console.log(item);
}