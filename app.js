const listContainer = document.querySelector(".container-users .list-users");
const container = document.querySelector(".container-users");
const btn = document.querySelector(".btn");
listContainer.addEventListener("click", showInfoUser);

const form = document.forms["addUser"];
const inputName = form.elements["name"];
const inputEmail = form.elements["email"];
const inputUsername = form.elements["username"];
const inputPhone = form.elements["phone"];
const inputWebsite = form.elements["website"];

function getPosts(cb) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://jsonplaceholder.typicode.com/users");
  xhr.addEventListener("load", () => {
    const response = JSON.parse(xhr.responseText);
    cb(response);
  });

  xhr.addEventListener("error", () => {
    alert("Что-то пошло не так");
  });

  xhr.send();
}

function createUser(body, cb) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "https://jsonplaceholder.typicode.com/users");
  xhr.addEventListener("load", () => {
    const response = JSON.parse(xhr.responseText);
    cb(response);
  });

  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  xhr.addEventListener("error", () => {
    console.log("error");
  });

  xhr.send(JSON.stringify(body));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nameinput = inputName.value;
  const emailinput = inputEmail.value;
  const usernameinput = inputUsername.value;
  const phoneinput = inputPhone.value;
  const websiteinput = inputWebsite.value;

  if (
    !nameinput ||
    !emailinput ||
    !usernameinput ||
    !phoneinput ||
    !websiteinput
  ) {
    alert("Введите все данные");
    return;
  }

  const user = {
    id: `1-${Math.random()}`,
    name: nameinput,
    email: emailinput,
    username: usernameinput,
    phone: phoneinput,
    website: websiteinput,
  };

  console.log(user);

  createUser(user, (response) => {
    const userItem = userTemplate(response);
    listContainer.insertAdjacentElement("afterbegin", userItem);
  });
  form.reset();
});

function renderUsers(response) {
  const objOfTasks = response.reduce((acc, user) => {
    acc[user.name] = user;
    return acc;
  }, {});

  showAllUsers(response);

  function showAllUsers(userList) {
    const fragment = document.createDocumentFragment();
    Object.values(userList).forEach((user) => {
      const li = userTemplate(user);
      fragment.appendChild(li);
    });
    listContainer.appendChild(fragment);
  }
}

function userTemplate({ id, name, username, email, phone, website }) {
  const li = document.createElement("li");
  li.classList.add("li");
  li.setAttribute("data-user-id", id);

  const h4 = document.createElement("h4");
  h4.classList.add("h4");

  h4.textContent = name;

  const infoUser = document.createElement("ul");
  infoUser.classList.add("info-user");

  const userEmail = document.createElement("li");
  userEmail.textContent = `email : ${email}`;

  const userName = document.createElement("li");
  userName.textContent = `username : ${username}`;

  const userPhone = document.createElement("li");
  userPhone.textContent = `phone : ${phone}`;

  const userWebsite = document.createElement("li");
  userWebsite.textContent = `website : ${website}`;

  infoUser.appendChild(userEmail);
  infoUser.appendChild(userName);
  infoUser.appendChild(userPhone);
  infoUser.appendChild(userWebsite);

  li.appendChild(h4);
  li.appendChild(infoUser);

  return li;
}

function showInfoUser({ target }) {
  const parent = target.closest("[data-user-id]");
  if (target.classList.contains("h4")) {
    if ((parent.lastChild.style.display = "none")) {
      parent.lastChild.style.display = "block";
    } else {
      parent.lastChild.style.display = "none";
    }
  }
}

getPosts(renderUsers);
