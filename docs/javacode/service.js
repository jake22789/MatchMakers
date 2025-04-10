export const getUser = async (username)=>{
    const url = ` http://localhost:5217/user/${username}`
    const response = await fetch(url);
    const object = await response.json();
    return object;
}
export const GetMatches= async ()=>{
    const url = ` http://localhost:5217/matches`
    const response = await fetch(url);
    const object = await response.json();
    return object;
}
export const CreateNewUser = async (newparent) => {
    const url = `http://localhost:5217/form/${newparent}`;
    const response = await fetch(url,{
        body: newparent,
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    });
}
export const CreateNewChild = async (newName,newAge,newGender,username) => {
    const url = `http://localhost:5217/form/${newName}/${newAge}/${newGender}/${username}`;
    const response = await fetch(url,{
        body: newName,
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    })
}
export async function addLike(index,child){
    const url = `http://localhost:5217/match/${index}/${child}`;
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
    const url = ` http://localhost:5217/child/${name}`
    const response = await fetch(url);
    const object = await response.json();
    return object;

}