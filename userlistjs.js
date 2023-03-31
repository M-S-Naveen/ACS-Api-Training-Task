const storedItem = []

function store(input) { 
  storedItem.splice(0, storedItem.length);
  storedItem.push(...input);
  sessionStorage.setItem("storedItem",JSON.stringify(storedItem));
  console.log(storedItem);
}











