import { useState } from "react";
import type { RoomData, Uuid } from "../../../types";
import { useNavigate } from "react-router-dom";

const JoinRoomForm = ({ uuid,socket, setUser }: Uuid) => {
  const [roomId,setRoomId] = useState("")
  const [name,setName] = useState("")

    const navigate = useNavigate();

  const handleRoomJoin=(e:React.SubmitEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const roomData: RoomData = {
          name,
          roomId,
          userId: uuid(),
          host: true,
          presenter: false,
        };
        setUser(roomData)
        navigate(`/${roomId}`)
        console.log(roomData);
        
        socket.emit("userJoined",roomData)
  }

   return (
     <div className="w-full">
       <form onSubmit={handleRoomJoin} className="w-full bg-white rounded px-4 py-6">
         <div className="mb-6">
           <input
             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
             id="username"
             value={name}
             onChange={(e)=>setName(e.target.value)}
             type="text"
             placeholder="Enter your name"
           />
         </div>
         <div className="mb-6">
           <input
             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
             id="joincode"
             type="text"
             value={roomId}
             onChange={(e)=>setRoomId(e.target.value)}
             placeholder="Enter room code"
           />
         </div>

         <button
           type="submit"
           className="py-2 text-white bg-blue-500 hover:bg-blue-700 w-full cursor-pointer"
         >
           Join Room
         </button>
       </form>
     </div>
   );
}

export default JoinRoomForm
