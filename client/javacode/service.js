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
    })
}