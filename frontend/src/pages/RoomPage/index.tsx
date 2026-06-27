import type { Socket } from "socket.io-client";
import Whiteboard from "../../components/WhiteBoard";
import type { DrawingTool, ElementType, RoomData } from "../../types";
import "./index.css";
import {  useRef, useState } from "react";
import ChatBar from "../../components/ChatBar";

type RoomPageProps = {
  user: RoomData | null;
  socket: Socket;
  users: RoomData[];
};

const RoomPage = ({ user, socket, users }: RoomPageProps) => {
  // canvas Refrence
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasContextRef = useRef<CanvasRenderingContext2D | null | undefined>(
    null,
  );

  const [tool, setTool] = useState<DrawingTool>("pencil");
  const [color, setColor] = useState<string>("#000000");
  const [history, setHistory] = useState<ElementType[]>([]);
  const [elements, setElements] = useState<ElementType[]>([]);
  const [openedUserTab, setOpenedUserTab] = useState<boolean>(false);
  const [openedChatTab, setOpenedChatTab] = useState<boolean | null>(false);

  const handleClearCanvas = () => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const contextRef = canvas.getContext("2d");

    if (!contextRef) return;

    contextRef.clearRect(0, 0, canvas.width, canvas.height);

    setElements([]);
  };

  const handleUndo = () => {
    setHistory((prevHistory: ElementType[]) => [
      ...prevHistory,
      elements[elements.length - 1],
    ]);
    setElements((prevElement: ElementType[]) =>
      prevElement.slice(0, prevElement.length - 1),
    );
  };

  const handleRedo = () => {
    setElements((prevElement: ElementType[]) => [
      ...prevElement,
      history[history.length - 1],
    ]);
    setHistory((prevHistory: ElementType[]) =>
      prevHistory.slice(0, prevHistory.length - 1),
    );
  };
  

  return (
    <div className="container mx-auto px-4 min-h-screen  flex flex-col items-center">
      <button
        type="button"
        className="bg-gray-800 hover:bg-gray-700 active:scale-95 text-white block absolute rounded left-5 top-5 h-10 w-25 cursor-pointer "
        onClick={() => setOpenedUserTab(true)}
      >
        Users
      </button>
      <button
        type="button"
        className="bg-blue-800 hover:bg-blue-700 active:scale-95 text-white block absolute left-32 rounded top-5 h-10 w-25 cursor-pointer "
        onClick={() => setOpenedChatTab(true)}
      >
        Chats
      </button>

      {openedUserTab && (
        <div
          className={`fixed top-0 left-0 h-full w-62.5 text-white bg-black text-center
                  transition-transform duration-300 ease-in-out
                  ${!openedUserTab ? "-translate-x-full" : "translate-x-0"}`}
        >
          <button
            type="button"
            className="bg-white text-black w-60 p-1.5 mt-5 cursor-pointer"
            onClick={() => setOpenedUserTab(false)}
          >
            Close
          </button>

          <div className="w-full mt-5 pt-5">
            {users.map((usr, index) => (
              <p key={index * 999} className="w-full my-2 text-center">
                {usr.name} {user && user.userId === usr.userId && "(You)"}
              </p>
            ))}
          </div>
        </div>
      )}

      {openedChatTab && (
        <ChatBar setOpenedChatTab={setOpenedChatTab} openedChatTab={openedChatTab} socket={socket} />
      )}

      {/* Title */}
      <h1 className="text-3xl font-bold text-center text-gray-800 mt-4 shadow-cyan-400">
        Whiteboard Sharing App
      </h1>

      {user?.presenter && (
        //  {/* Toolbar Controls */}
        <div className="w-full max-w-5xl bg-white shadow-md rounded-lg p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
          {/* Tool Selectors (Radio Group) */}
          <div className="flex items-center gap-6 border-r border-gray-200 pr-6">
            {(["pencil", "line", "rect"] as DrawingTool[]).map((t, id) => (
              <label
                key={id}
                className="flex items-center gap-2 font-medium text-gray-700 cursor-pointer"
              >
                <input
                  type="radio"
                  name="tool"
                  value={t}
                  checked={tool === t}
                  onChange={(e) => setTool(e.target.value as DrawingTool)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                {t === "rect" ? "Rectangle" : t}
              </label>
            ))}
          </div>

          {/* Color Picker */}
          <div className="flex items-center gap-3 border-r border-gray-200 pr-6">
            <label htmlFor="color" className="font-medium text-gray-700">
              Select Color:
            </label>
            <input
              type="color"
              id="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-10 h-10 border border-gray-300 rounded cursor-pointer p-0.5 bg-transparent"
            />
          </div>

          {/* Undo/Redo & Utility Actions */}
          <div className="flex items-center gap-2">
            <button
              className="px-4 py-2 border border-blue-600 text-blue-600 font-medium rounded hover:bg-blue-50 transition duration-200"
              disabled={elements.length === 0}
              onClick={handleUndo}
            >
              Undo
            </button>
            <button
              className="px-4 py-2 border border-blue-600 text-blue-600 font-medium rounded hover:bg-blue-50 transition duration-200"
              disabled={history.length < 1}
              onClick={handleRedo}
            >
              Redo
            </button>
            <button
              className="px-4 py-2 bg-red-600 text-white font-medium rounded hover:bg-red-700 transition duration-200 ml-2"
              onClick={handleClearCanvas}
            >
              Clear Canvas
            </button>
          </div>
        </div>
      )}

      {/* Users Status */}
      <div className="text-sm font-semibold text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
        Users Online: <span className="text-blue-600">{users.length}</span>
      </div>

      {/* Main Drawing Area Wrapper */}
      <div className="w-full max-w-5xl h-125 bg-white shadow-lg rounded-xs overflow-hidden mb-8">
        <Whiteboard
          canvasRef={canvasRef}
          canvasContextRef={canvasContextRef}
          elements={elements}
          setElements={setElements}
          color={color}
          tool={tool}
          user={user}
          socket={socket}
        />
      </div>
    </div>
  );
};

export default RoomPage;
