import { RoomData } from "..";

const users:RoomData[] = [];

// add a user to the list
export const addUser = ({ name, userId, roomId, host, presenter,socketId }:RoomData) => {
    const user = { name, userId, roomId, host, presenter,socketId };
    users.push(user)
    return users.filter((user)=>user.roomId === roomId)
};

// remove the user from the list
export const removeUser =(id:string)=>{
    const index = users.findIndex(user=>user.socketId === id)
    if (index !== -1) {
        return users.splice(index,1)[0]
    }
}

// get the user from the list
export const getUser=(id:string)=>{
    return users.find((user)=>user.socketId === id)
}

//get all user from the list
export const getAll =(roomId:string)=>{
    return users.filter((user)=>user.roomId === roomId)
}

