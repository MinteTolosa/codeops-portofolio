let members = [
    { id: 1, name: "Mintesinot T.", years: 2000 },
    { id: 2, name: "Rediet T.", years: 2005 },
    { id: 3, name: "Hiwot T.", years: 2008 },
]

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

    renderMembers();
    form.reset();
});

const removeForm = document.querySelector("#myRemoveForm");
const delIdField = document.querySelector("#removeId");

removeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const delId = Number(delIdField.value);
    let newMembers = members.filter((member) => member.id !==delId);
    members = newMembers;

    renderMembers();
    removeForm.reset();
});