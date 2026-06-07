import { useState } from "react";
import CreateRoomForm from "./CreateRoomForm";
import JoinRoomForm from "./JoinRoomForm";
import "./index.css";
import type { Uuid } from "../../types";


const Forms = ({ uuid, socket, setUser }: Uuid) => {
  const [activeTab, setActiveTab] = useState<"create" | "join">("create");

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white border border-blue-500 rounded-2xl shadow-lg overflow-hidden">
        {/* Tabs */}
        <div className="grid grid-cols-2">
          <button
            onClick={() => setActiveTab("create")}
            className={`py-3 sm:py-4 text-sm sm:text-base font-semibold transition-all ${
              activeTab === "create"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Create Room
          </button>

          <button
            onClick={() => setActiveTab("join")}
            className={`py-3 sm:py-4 text-sm sm:text-base font-semibold transition-all ${
              activeTab === "join"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Join Room
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 md:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-blue-500 mb-6">
            {activeTab === "create" ? "Create Room" : "Join Room"}
          </h1>

          <div key={activeTab} className="animate-fade-in">
            {activeTab === "create" ? (
              <CreateRoomForm uuid={uuid} socket={socket} setUser={setUser} />
            ) : (
              <JoinRoomForm />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forms;
