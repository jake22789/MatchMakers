import { addLike, addReject, getChildbyName, GetMatches,getImage } from "./service.js";
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
      num ++;

    }
    
  });
  middleElement.replaceChildren();
  if(num <= potentalcount){
    const childcard =  await buildChild(dictionary[num]);
    
    middleElement.appendChild(childcard);
  }else {
    num=1;
    renderpage();
  }
  console.log(num);
}
async function buildChild(list) {
  const childElement = document.createElement("div");
  childElement.draggable = true;
  childElement.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text", e.target.id);
  });
  const ageElement = document.createElement("div");
  const imgcontainer = document.createElement("div");
  imgcontainer.classList = "imgcontainer";
  childElement.classList = "childcard";
  ageElement.textContent = list.age;
  console.log(list.url);
  if (list.url === "") {
    imgElement.src =
    "https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg?auto=compress&cs=tinysrgb&w=800";
  } else {
    list.url.forEach(async(element) => {
      if (element === "") {
        
      }else{
        // const imgElement = document.createElement("img");
        // imgElement.classList = "profilePic";
         const file = await getImage(element);
        // imgElement.src = file.url;
        imgcontainer.style.backgroundImage = `url(${file.url})`;
        console.log(file);
        // imgcontainer.appendChild(imgElement);
      }
    });
    
  }
  const nameElement = document.createElement("div");
  nameElement.textContent = list.name;
  childElement.appendChild(nameElement);
  childElement.appendChild(ageElement);
  childElement.appendChild(imgcontainer);

  return childElement;
}
renderpage();
setListeners();
