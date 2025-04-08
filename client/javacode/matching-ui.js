import { addLike, addReject, getChildbyName, GetMatches } from "./service.js";
var num = 1;
function setListeners() {
  const regectElement = document.getElementById("regect");
  const acceptElement = document.getElementById("accept");
  regectElement.addEventListener("drop", (e) => {
    e.preventDefault();
    var data = e.dataTransfer.getData("text");
    addReject(num, localStorage.getItem("focuschild"));
    num += 1;
    renderpage();
  });
  regectElement.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
  acceptElement.addEventListener("drop", (e) => {
    e.preventDefault();
    var data = e.dataTransfer.getData("text");
    addLike(num, localStorage.getItem("focuschild"));
    num += 1;
    renderpage();
  });
  acceptElement.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
}
async function renderpage() {
  var dictionary = await GetMatches();
  const potentalcount = Object.keys(dictionary).length;

  //get focus child and check their likes and them. do not load if likes or them are same
  const focuschild = await getChildbyName(localStorage.getItem("focuschild"));
  const middleElement = document.getElementById("middle");
  if (num === focuschild.id) {
    num++;
  }
  focuschild.likes.forEach(element => {
    if(element == num){
      console.log("hit");
      num ++;

    }
    
  });
  middleElement.replaceChildren();
  if(num <= potentalcount){
    const childcard = buildChild(dictionary[num]);
    middleElement.appendChild(childcard);
  }else {
    num=1;
    renderpage();
  }
  console.log(num);
}
function buildChild(list) {
  const childElement = document.createElement("div");
  childElement.draggable = true;
  childElement.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text", e.target.id);
  });
  const imgElement = document.createElement("img");
  const ageElement = document.createElement("div");
  const imgcontainer = document.createElement("div");
  childElement.classList = "childcard";
  ageElement.textContent = list.age;
  imgElement.classList = "profilePic";
  console.log(list.url);
  if (list.url === "") {
    imgElement.src =
      "https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg?auto=compress&cs=tinysrgb&w=800";
  } else {
    imgElement.src = list.url;
  }
  const nameElement = document.createElement("div");
  nameElement.textContent = list.name;
  imgcontainer.appendChild(imgElement);
  childElement.appendChild(nameElement);
  childElement.appendChild(ageElement);
  childElement.appendChild(imgcontainer);

  return childElement;
}
renderpage();
setListeners();
