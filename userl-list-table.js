var data = 10;
var page = 1;
function prevData() {
  console.log("hello");
  if (data > 10) {
    data = data - 10;
    page = page - 1;
  }
  apiCall();
}
function nextData() {
  console.log("hi");
  if (data < 100) {
    data = data + 10;
    page = page + 1 ;
  }
  apiCall();
}

// Make PUT or POST request

 async function apiCall() {
await fetch("https://gorest.co.in/public/v2/users?page=" +
page +
"&per_page=10/access-token=3b409f6ceb53d42bde33208969d9ca649abcfe16d7942a2adacbb42bb2100f8c", {
  method: 'GET', // or 'POST'
  // body: JSON.stringify(data),
  headers: {
    'Content-Type': 'application/json',
    // "Authorization" : 'Bearer'
  }
})
.then(response => {
  // Callback function to retrieve updated data
  fetch("https://gorest.co.in/public/v2/users?page=" +
  page +
  "&per_page=10/access-token=3b409f6ceb53d42bde33208969d9ca649abcfe16d7942a2adacbb42bb2100f8c")
  .then(response => response.json())
  .then(data => {

          // Callback function to retrieve updated data
      fetch("https://gorest.co.in/public/v2/users?access-token=3b409f6ceb53d42bde33208969d9ca649abcfe16d7942a2adacbb42bb2100f8c")
      .then(response => response.json())
      .then(x => { y=data.concat(x)
        console.log(y)

    // Update table with new data
    if (y.length > 0) {
      var temp = "";
      y.forEach((element) => {
        //creates the data table
        temp += "<tr class='tr'>";
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
  })
})
})
.catch(error => console.error('Error:', error));
 }



// async function apiCall() {
//   let response = await fetch(
//     "https://gorest.co.in/public/v2/users?page=" +
//       page +
//       "&per_page=10/access-token=3b409f6ceb53d42bde33208969d9ca649abcfe16d7942a2adacbb42bb2100f8c"
//   );
  // let commits = await response.json();

  // var result =  commits;

  
// }
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
    await fetch(
      "https://gorest.co.in/public/v2/users/" +
        id +
        "?access-token=3b409f6ceb53d42bde33208969d9ca649abcfe16d7942a2adacbb42bb2100f8c",
      {
        method: "DELETE",
        //Delete method deletes the user data from table
        headers: {
          "content-type": "application/json;json; charset=UTF-8",
          Authorization: "Bearer",
        },
      }
    )
      .then((res) => res.text()) // or res.json()
      .then((res) => alert("user data deleted"));
    window.location.reload();
  } else {
    alert("canceled");
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
  alert("The ID of the User is " + item);
}

//above code will store the id of the user-data