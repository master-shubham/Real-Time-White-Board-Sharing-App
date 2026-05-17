import CreateRoomForm from "./CreateRoomForm";
import "./index.css";
import JoinRoomForm from "./JoinRoomForm";

const Forms = () => {
  return (
    <div className="min-h-screen py-5 grid grid-cols-1 md:grid-cols-2 gap-8 place-items-center">
      {/* Create Room Box */}
      <div className="w-14xl p-8 border border-blue-500 rounded-xl flex flex-col items-center">
        <h1 className="text-blue-500 font-bold text-3xl">Create Room</h1>
        <CreateRoomForm />
      </div>

      {/* Join Room Box */}
      <div className="w-14xl  p-8 border border-blue-500 rounded-xl flex flex-col items-center">
        <h1 className="text-blue-500 font-bold text-3xl">Join Room</h1>
        <JoinRoomForm />
      </div>
    </div>
  );
};

export default Forms;
