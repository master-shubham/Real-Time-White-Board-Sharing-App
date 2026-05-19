import Whiteboard from "../../components/WhiteBoard";
import "./index.css";
import  { useState } from "react";

const RoomPage = () => {
  const [tool, setTool] = useState("pencil");
  const [color, setColor] = useState("#000000");
  const [usersOnline, setUsersOnline] = useState(0);

  return (
    <div className="container mx-auto px-4 min-h-screen  flex flex-col items-center">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center text-gray-800 mt-4">
        Whiteboard Sharing App
      </h1>

      {/* Toolbar Controls */}
      <div className="w-full max-w-5xl bg-white shadow-md rounded-lg p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
        {/* Tool Selectors (Radio Group) */}
        <div className="flex items-center gap-6 border-r border-gray-200 pr-6">
          <label className="flex items-center gap-2 font-medium text-gray-700 cursor-pointer">
            <input
              type="radio"
              name="tool"
              value="pencil"
              checked={tool === "pencil"}
              onChange={(e) => setTool(e.target.value)}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            Pencil
          </label>
          <label className="flex items-center gap-2 font-medium text-gray-700 cursor-pointer">
            <input
              type="radio"
              name="tool"
              value="line"
              checked={tool === "line"}
              onChange={(e) => setTool(e.target.value)}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            Line
          </label>
          <label className="flex items-center gap-2 font-medium text-gray-700 cursor-pointer">
            <input
              type="radio"
              name="tool"
              value="rect"
              checked={tool === "rect"}
              onChange={(e) => setTool(e.target.value)}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            Rectangle
          </label>
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
          <button className="px-4 py-2 border border-blue-600 text-blue-600 font-medium rounded hover:bg-blue-50 transition duration-200">
            Undo
          </button>
          <button className="px-4 py-2 border border-blue-600 text-blue-600 font-medium rounded hover:bg-blue-50 transition duration-200">
            Redo
          </button>
          <button className="px-4 py-2 bg-red-600 text-white font-medium rounded hover:bg-red-700 transition duration-200 ml-2">
            Clear Canvas
          </button>
        </div>

        {/* Users Status */}
        <div className="text-sm font-semibold text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
          Users Online: <span className="text-blue-600">{usersOnline}</span>
        </div>
      </div>

      {/* Main Drawing Area Wrapper */}
      <div className="w-full max-w-5xl h-125 bg-white shadow-lg rounded-xs overflow-hidden mb-8">
        <Whiteboard />
      </div>
    </div>
  );
};

export default RoomPage;