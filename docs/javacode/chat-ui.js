import { getUser } from "./service.js";

async function renderPage() {
  const username = localStorage.getItem("username");
  const profile = await getUser(username);
  const focuschild = localStorage.getItem("focuschild");
  console.log(focuschild);
  const childReferance = profile.children.filter((child) => {
    if (child.name == focuschild) {
      return true;
    } else {
      return false;
    }
  });
  console.log(childReferance[0].likes);
  buildMatchesCard(childReferance[0].likes);
  BuildSubjectcard(childReferance[0]);
  addEventListeners();
}
function buildMatchesCard(children) {
  const childrenContainerElement = document.getElementById("matches");

  childrenContainerElement.replaceChildren();

  if (children[0] != null) {
    children.forEach((child) => {
        const matchcardElement = buildChild(child);
        childrenContainerElement.appendChild(matchcardElement);
    });
  } else {

    const childElement = document.createElement("div");
    childElement.classList = "childcard";
    const nameElement = document.createElement("div");
    nameElement.textContent = "Nobody";
    childElement.appendChild(nameElement);
    childrenContainerElement.appendChild(childElement);
  }
}
function BuildSubjectcard(child) {
  const parentElement = document.getElementById("content");
  const nameElement = document.createElement("div");
  const ageElement = document.createElement("div");
  const genderElement = document.createElement("div");
  const buttonElement = document.createElement("button");

  parentElement.replaceChildren();

  buttonElement.textContent = "Swich Child";
  buttonElement.id = "switch";
  nameElement.textContent = child.name;
  ageElement.textContent = child.age;
  genderElement.textContent = child.gender;

  parentElement.appendChild(nameElement);
  parentElement.appendChild(ageElement);
  parentElement.appendChild(genderElement);
  parentElement.appendChild(buttonElement);
}
function addEventListeners() {
  const buttonElement = document.getElementById("switch");
  buttonElement.addEventListener("click", async (e) => {
    e.preventDefault();
    const username = localStorage.getItem("username");
    localStorage.setItem("Potental", "");
    const profile = await getUser(username);
    buildChildCard(profile.children);
  });
}
function buildChildCard(children) {
  const childrenContainerElement = document.getElementById("matches");

  childrenContainerElement.replaceChildren();

  children.forEach((child) => {
    const childElement = document.createElement("div");
    childElement.classList = "childcard";
    const nameElement = document.createElement("div");
    nameElement.textContent = child.name;
    childElement.appendChild(nameElement);
    childrenContainerElement.appendChild(childElement);
    childElement.addEventListener("click", () => {
      console.log(child.name);
      localStorage.setItem("focuschild", child.name);
      renderPage();
    });
  });
}
function buildChild(child) {
  const childElement = document.createElement("div");
  childElement.classList = "childcard";
  const nameElement = document.createElement("div");
  nameElement.textContent = child.name;
  childElement.appendChild(nameElement);
  childElement.addEventListener("click", () => {
    localStorage.setItem("Potental", child.name);
  });
  return childElement;
}
renderPage();
