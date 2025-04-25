//const baseUrl = "http://localhost:5217"
const baseUrl = "https://matchmakers-envk.onrender.com"

export const getUser = async (username)=>{
    const url = `${baseUrl}/user/${username}`
    const response = await fetch(url);
    const object = await response.json();
    return object;
}
export const GetMatches= async ()=>{
    const url = `${baseUrl}/matches`
    const response = await fetch(url);
    const object = await response.json();
    return object;
}
export const CreateNewUser = async (newparent) => {
    const url = `${baseUrl}/${newparent}`;
    const response = await fetch(url,{
        body: newparent,
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    });
}
export const CreateNewChild = async (newName,newAge,newGender,username) => {
    const url = `${baseUrl}/form/${newName}/${newAge}/${newGender}/${username}`;
    const response = await fetch(url,{
        body: newName,
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    })
}
export async function addLike(index,child){
    const url = `${baseUrl}/match/${index}/${child}`;
    const response = await fetch(url,{
        body: child,
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    });
    console.log(index);
    console.log(child);
}
export function addReject(index,child){
    console.log(index);
    console.log(child);
}
export async function getChildbyName(name){
    const url = `${baseUrl}/child/${name}`
    const response = await fetch(url);
    const object = await response.json();
    return object;

}
export const uploadFileApi = async (file,id) =>{
    const formdata = new FormData();
    formdata.append("file",file);
    const responce = await fetch(
        `${baseUrl}/upload/${id}`,{
            method:"POST",
            body:formdata,
            
        }
    );
    console.log(responce);
}
export const getImage = async (imageName)=>{
    const url = `${baseUrl}/images/${imageName}`
    const response = await fetch(url);
    
    //console.log(response);
    return response;
}