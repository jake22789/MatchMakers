import { GetMatches } from "./service.js";
var num = 1;
async function renderpage() {
  var dictionary = await GetMatches();
  const middleElement = document.getElementById("middle");
  middleElement.replaceChildren();
  console.log(dictionary[num]);
  const childcard = buildChild(dictionary[num]);
  middleElement.appendChild(childcard);
}
function buildChild(list) {
  const childElement = document.createElement("div");
  const imgElement = document.createElement("img");
  const ageElement = document.createElement("div");
  const imgcontainer = document.createElement("div");
  childElement.classList = "childcard";
  ageElement.textContent = list.age;
  imgElement.classList="profilePic";
  console.log(list.url);
  if(list.url === ""){
    imgElement.src = "https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg?auto=compress&cs=tinysrgb&w=800"
  }else{
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
