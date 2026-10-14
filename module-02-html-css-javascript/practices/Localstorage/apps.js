// const { func } = require("prop-types");

let members = [ ]

//we are always start by load data from storage
// JSON.parse() also must used to load data from Localstroage 
//what happen if we are not use [object, object] error show on the console

// function loadMemberFromLocalStorag()
const storedMembers = JSON.parse(localStorage.getItem("Resigister"));

if(storedMembers) {
    members = storedMembers;
}

// Select Element from the DOM

const form = document.querySelector("#myForm");
const idField = document.querySelector("#memberId");
const nameField = document.querySelector("#name");
const yearField = document.querySelector("#year");

const myList = document.querySelector("#memberList");

//Create a render display function 

function renderMembers() {
    myList.innerHTML = " ";

    members.forEach((member) =>{
        const li = document.createElement("li");
        li.textContent = `${member.id} - ${member.name} is member since ${member.years} G.C`;
        myList.appendChild(li)
    });
    
    
}
renderMembers();

//Create EventLisner to my form

form.addEventListener("submit", (e)=>{
    e.preventDefault();

    const id = Number(idField.value);
    const name = nameField.value;
    const years = Number(yearField.value);

    members.push({id, name, years});

    saveMembersToLocalstorag()
    renderMembers();
    form.reset();
});

//Select Element from the DOM
const removeForm = document.querySelector("#myRemoveForm");
const delIdField = document.querySelector("#removeId");

removeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const delId = Number(delIdField.value);
    let newMembers = members.filter((member) => member.id !==delId);
    members = newMembers;

    saveMembersToLocalstorag()
    renderMembers();
    removeForm.reset();
});

//LocalStorage and SessionStorage 
//JSON.stringify() alway use to upload/put data in Localstorage


function saveMembersToLocalstorag() {
    localStorage.setItem("Resigister", JSON.stringify(members));
}



