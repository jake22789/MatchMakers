import { CreateNewChild, getUser,uploadFileApi } from "./service.js";

async function renderPage() {
  const username = localStorage.getItem("username");
  const profile = await getUser(username);
  //console.log(profile.children);
  buildChildCard(profile.children);
  BuildParentcard(profile.name);
}
function buildChildCard(children) {
  const childrenContainerElement = document.getElementById("children");

  childrenContainerElement.replaceChildren();

  children.forEach((child) => {
    //console.log(child.url);
    const imageElement = document.createElement("div");
    const image = document.createElement("img");
    image.src = child.url;
    imageElement.appendChild(image);
    const childElement = document.createElement("div");
    childElement.classList = "childcard";
    const nameElement = document.createElement("div");
    nameElement.textContent = child.name;
    childElement.appendChild(nameElement);
    childrenContainerElement.appendChild(childElement);
    childElement.addEventListener("click", () => {
      //console.log(child.name);
      localStorage.setItem("focuschild", child.name);
      //renderPage();
    });
    const uploadform = document.createElement("form");
    const submitElement = document.createElement("input");
    submitElement.type = "submit";
    const uploadpicturebutton = document.createElement("input");
    uploadpicturebutton.type = "file";
    uploadpicturebutton.id = `uploads${child.id}`;
    uploadpicturebutton.name = `filename${child.id}`;
    uploadform.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      console.log(uploadpicturebutton.files);
      await uploadFileApi(uploadpicturebutton.files[0]);
    });
    childElement.appendChild(imageElement);
    uploadform.appendChild(uploadpicturebutton);
    uploadform.appendChild(submitElement);
    childElement.appendChild(uploadform);
  });
}
function BuildParentcard(name) {
  const parentElement = document.getElementById("content");
  const nameElement = document.createElement("div");
  const buttonElement = document.createElement("button");

  parentElement.replaceChildren();

  nameElement.textContent = name;
  buttonElement.textContent = "add child";
  buttonElement.id = "newChild";
  parentElement.appendChild(nameElement);
  parentElement.appendChild(buttonElement);
  buildForm();
}
function buildForm() {
  const newAcountElement = document.getElementById("newChild");
  newAcountElement.addEventListener("click", () => {
    const containerElement = document.getElementById("children");
    const userFormElement = document.createElement("form");
    const userNLabelElement = document.createElement("label");
    const userNameElement = document.createElement("input");
    const userALabelElement = document.createElement("label");
    const userageElement = document.createElement("input");
    const resetButtonElement= document.createElement("button");
    const userSubmitElement = document.createElement("input");
    const genderLabelElement = document.createElement("label");
    const genderinputElementM = document.createElement("input");
    const genderLabelElementM = document.createElement("label");
    const malecontainerElement = document.createElement("div");
    const FemalcontainerElement = document.createElement("div");
    const genderformElement = document.createElement("div");

    resetButtonElement.addEventListener("click",(e)=>{
      e.preventDefault();
      userFormElement.reset();
    });
    resetButtonElement.textContent = "Reset";
    genderinputElementM.id = "male";
    genderLabelElementM.htmlFor = "male";
    genderLabelElementM.textContent = "Male";
    genderinputElementM.type = "radio";
    genderinputElementM.name = "gender";
    const genderinputElementF = document.createElement("input");
    const genderLabelElementF = document.createElement("label");
    genderinputElementF.id = "female";
    genderLabelElementF.htmlFor = "female";
    genderLabelElementF.textContent = "female";
    genderformElement.id = "gender";
    genderinputElementF.type = "radio";
    genderinputElementF.name = "gender";
    userFormElement.classList = "login";
    userNLabelElement.textContent = "Child Name";
    userALabelElement.textContent = "Child Age";
    genderLabelElement.textContent = "Gender";
    userSubmitElement.type = "submit";
    userNameElement.id = "input";
    userageElement.id = "age";
    userFormElement.appendChild(userNLabelElement);
    userFormElement.appendChild(userNameElement);
    userFormElement.appendChild(userALabelElement);
    userFormElement.appendChild(userageElement);
    userFormElement.appendChild(genderLabelElement);
    malecontainerElement.appendChild(genderLabelElementM);
    malecontainerElement.appendChild(genderinputElementM);
    genderformElement.appendChild(malecontainerElement);
    FemalcontainerElement.appendChild(genderLabelElementF);
    FemalcontainerElement.appendChild(genderinputElementF);
    genderformElement.appendChild(FemalcontainerElement);
    userFormElement.appendChild(genderformElement);

    userFormElement.appendChild(userSubmitElement);
    userFormElement.appendChild(resetButtonElement);

    userFormElement.addEventListener("submit", async (e) => {
      e.preventDefault();
      const username = localStorage.getItem("username");
      const name = document.getElementById("input").value;
      const age = document.getElementById("age").value;
      var gender = "";
      if (document.getElementById("male").checked) {
        gender = "Male";
      } else {
        gender = "Female";
      }
      CreateNewChild(name, age, gender, username);
      location.reload();
    });
    containerElement.replaceChildren();

    containerElement.appendChild(userFormElement);
  });
}
renderPage();
