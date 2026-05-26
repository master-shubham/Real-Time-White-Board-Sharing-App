import Whiteboard from "../../components/WhiteBoard";
import "./index.css";
import  { useRef, useState } from "react";

// Define a type for our available drawing tools
type DrawingTool = "pencil" | "line" | "rect";

const RoomPage = () => {

  // canvas Refrence
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const canvasContextRef = useRef<CanvasRenderingContext2D | null | undefined>(null)

  const [tool, setTool] = useState<DrawingTool>("pencil");
  const [color, setColor] = useState<string>("#000000");
  const [usersOnline, setUsersOnline] = useState<number>(0);

  const [elements,setElements] = useState<number[]>([])


  return (
    <div className="container mx-auto px-4 min-h-screen  flex flex-col items-center">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center text-gray-800 mt-4 shadow-cyan-400">
        Whiteboard Sharing App
      </h1>

      {/* Toolbar Controls */}
      <div className="w-full max-w-5xl bg-white shadow-md rounded-lg p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
        {/* Tool Selectors (Radio Group) */}
        <div className="flex items-center gap-6 border-r border-gray-200 pr-6">
          {(["pencil", "line", "rect"] as DrawingTool[]).map((t,id) => (
            <label key={id} className="flex items-center gap-2 font-medium text-gray-700 cursor-pointer">
              <input
                type="radio"
                name="tool"
                value={t}
                checked={tool === t}
                onChange={(e) => setTool(e.target.value as DrawingTool)}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              {t === 'rect' ? "Rectangle": t }
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
        <Whiteboard 
          canvasRef={canvasRef}
          canvasContextRef={canvasContextRef}
          elements={elements}
          setElements={setElements}
        />
      </div>
    </div>
  );
};

export default RoomPage;