import { useState, } from "react";
import type { RoomData, Uuid } from "../../../types";
import { useNavigate } from "react-router-dom";



const CreateRoomForm = ({ uuid, socket, setUser }: Uuid) => {

  const [roomId, setRoomId] = useState<string>(uuid());
  const [name, setName] = useState<string>("");

  const navigate = useNavigate();
  
  const handleCreateRoom = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    // name, roomId, userId, host and present

    const roomData: RoomData = {
      name,
      roomId,
      userId: uuid(),
      host: true,
      presenter: true,
    };
    setUser(roomData)
    navigate(`/${roomId}`)
    console.log(roomData);
    
    socket.emit("userJoined",roomData)
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form
        onSubmit={handleCreateRoom}
        className="bg-white  rounded px-5 pt-6 pb-8 mb-2"
      >
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>

        <div className="mb-6 flex flex-col sm:flex-row gap-2">
          <input
            className="min-w-0 shadow border rounded w-full py-3 px-3 text-gray-700 outline-none cursor-no-drop"
            id="code"
            type="text"
            value={roomId}
            placeholder="Generate room code"
            disabled
          />

          <div className="flex gap-2">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
              type="button"
              onClick={() => setRoomId(uuid())}
            >
              Generate
            </button>

            <button
              type="button"
              className="border-2 py-2 px-4 rounded-md active:scale-95 cursor-pointer"
            >
              Copy
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white py-3 rounded-lg font-medium cursor-pointer"
        >
          Generate Room
        </button>
      </form>
    </div>
  );
};

export default CreateRoomForm
