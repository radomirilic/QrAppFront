import { FlashMessage } from "../../assets/Flash.js";
import { getBasePath, URL } from "../../assets/helpers.js";
import { Router } from "../../assets/PagePaths.js";
import { PageShifter } from "../../assets/Pageshifter.js";
import { Popup } from "../../assets/Popup.js";
// Elements
const usersContainer = document.getElementById("users-container");
const addButton = document.getElementById("add-button");

// pages-setup
const pages = ["main-page", "500"];
const pageShifter = new PageShifter(pages, "main-page");

// Flash message
const flashMessage = new FlashMessage();
// Assets
const addUser = (user) => {
  // user container
  const userContainer = document.createElement("div");
  userContainer.classList.add("user");
  // icon
  const icon = document.createElement("img");
  icon.src = "../../svgs/user-pfp.svg";
  userContainer.appendChild(icon);
  // Name and balance
  const nameAndCoinsContainer = document.createElement("div");
  nameAndCoinsContainer.classList.add("name-and-coins");
  const nameContainer = document.createElement("p");
  nameContainer.id = "name";
  nameContainer.textContent = user.Name;
  const coinsContainer = document.createElement("p");
  coinsContainer.id = "coins";
  coinsContainer.textContent = user.Coins;
  nameAndCoinsContainer.appendChild(nameContainer);
  nameAndCoinsContainer.appendChild(coinsContainer);
  userContainer.appendChild(nameAndCoinsContainer);
  // Buttons
  const delButton = document.createElement("button");
  delButton.classList.add("remove-button");
  delButton.textContent = "OBRISI";
  delButton.setAttribute("user-id", user._id);
  delButton.addEventListener("click", handleDelete);
  // Change
  const changeButton = document.createElement("button");
  changeButton.classList.add("manage-button");
  changeButton.textContent = "IZMENI";
  changeButton.setAttribute("user-id", user._id);
  changeButton.addEventListener("click", handleChangeRedirect);
  userContainer.appendChild(delButton);
  userContainer.appendChild(changeButton);
  // Add to main container
  usersContainer.appendChild(userContainer);
}
let adminPassword;
// Setup popup
const popup = new Popup();

// Handlers
const handleGetUsers = async () => {
  let res;
  let data; 
  try {
    res = await fetch(`${URL}/users`, {
      headers: {
        "Content-Type" : "application/json",
        "authorization": adminPassword,
      }
    });
    data = await res.json();
    console.log(data);
  }
  catch(err) {
    pageShifter.showPageOnly("500");
  }

  const { users, message } = data;

  // Handle erros
  if(res.status === 401 || res.status === 403) {
    return window.location.assign(`${getBasePath()}/admin/login/index.html`);
  }

  if(res.status === 500) {
    return pageShifter.showPageOnly("500");
  }

  if(message) {
    return flashMessage.showMessage(message, "error");
  }
  
  if(res.ok) {
    // If success populate users
    for (let user of users) {
      addUser(user);
    }
    return;
}
}
const handleAddRedirect = () => {
  window.location.assign(Router.adminAddUser);
}
const handleChangeRedirect = (e) => {
  const id = e.target.getAttribute("user-id");
  return window.location.assign(`${Router.adminChangeUser}?id=${id}`);
}
const handleDelete = async (e) => {
  let res, data;
  const id = e.target.getAttribute("user-id");
  try {
    res = await fetch(`${URL}/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type" : "application/json",
        "authorization": adminPassword,
      }
    })
    data = await res.json();
  }
  catch(err) {
    return pageShifter.showPageOnly("500");
  }
  const { user, message } = data;
  if(res.ok) {
    e.target.parentElement.remove();
    return flashMessage.showMessage("Korisnik uspesno obrisan", "success");
  }
  if(res.status === 500) {
    return pageShifter.showPageOnly("500");
  }
  if(res.status === 401 || res.status === 403) {
    return window.location.assign(Router.adminLogin);
  }
  if(message) {
    return flashMessage.showMessage(message, "error");
  }
}

// Connect handlers
addButton.addEventListener("click", handleAddRedirect);

// Default behaviour
adminPassword = sessionStorage.getItem("adminPassword");
if(!adminPassword) {
  window.location.assign(Router.adminLogin);
}
// Set on load
window.onload = handleGetUsers();
