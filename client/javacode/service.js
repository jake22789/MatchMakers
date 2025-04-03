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