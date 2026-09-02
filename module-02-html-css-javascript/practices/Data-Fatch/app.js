let allUsers = [];

const remoteList = document.querySelector("#remoteData");
const storedUsers = JSON.parse(localStorage.getItem("fetchList"))

if(storedUsers){
    allUsers = storedUsers;
}
// console.log(allUsers)
//Creating EventListener for the Input search

const input = document.querySelector("#userSearch");

input.addEventListener("input", (e) => {
    // e.PreventDefault();

    const userInput = e.target.value.toLowerCase();
    const filteredUsers = allUsers.filter((userIn) => {
        return userIn.name.toLowerCase().includes(userInput);
    });
    remoteList.innerHTML = "";

    filteredUsers.map((user) => {
                const p = document.createElement("p");
                p.textContent = `${user.id}- ${user.name} ---Email: ${user.email}`;
                remoteList.appendChild(p);
            });
        });

// Fetching/ geting data from remote sourch using asynch a
async function fetchData() {

   try{
    const response = await fetch("https://jsonplaceholder.typicode.com/users");   
    
    if(!response.ok){
        throw new Error(`The Server answered with the bad status: ${response.status}`)
    }

    const data = await response.json();
    return data;

   } catch(error){
    console.error("Oops! Something went wrong in fetchData:", error.message);
        return null;
   }
}
fetchData();


async function saveListToLocalStorage() {
    const list = await fetchData();
    localStorage.setItem("fetchList", JSON.stringify(list));    
}
saveListToLocalStorage();


async function renderRemoteList() {
    remoteList.innerHTML = "Loading..";
    
    const remoteData = await fetchData();

    if(!remoteData) {
        remoteData.innerHTML = "<li style ='color: red'>Could not load users. Please check your internet connection.</li>";
    }

    // console.log(remoteData)
    remoteList.innerHTML = " ";

    remoteData.map((user) => {
      const p = document.createElement("p");
      p.textContent = `${user.id}- ${user.name} --- Email--- ${user.email}`;
      remoteList.appendChild(p);
    });
}
renderRemoteList();
