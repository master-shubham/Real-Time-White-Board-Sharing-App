import React, { useEffect, useLayoutEffect, useState } from "react";
import rough from "roughjs";
import type { DrawingTool, ElementType, RoomData } from "../../types";
import type { Socket } from "socket.io-client";

const roughGenerator = rough.generator();

// RoomPage Props Type
type CanvasProps = {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  canvasContextRef: React.RefObject<
    CanvasRenderingContext2D | null | undefined
  >;
  elements: ElementType[];
  setElements: React.Dispatch<React.SetStateAction<ElementType[]>>;
  tool: DrawingTool;
  color: string;
  user: RoomData | null;
  socket: Socket;
};

const Whiteboard = ({
  canvasRef,
  canvasContextRef,
  elements,
  setElements,
  tool,
  color,
  user,
  socket,
}: CanvasProps) => {
  const [img, setImg] = useState<string | undefined>(undefined);

  useEffect(() => {
    const handler = (data: any) => {
      setImg(data.imgURL);
    };

    socket.on("whiteboardDataResponse", handler);

    return () => {
      socket.off("whiteboardDataResponse", handler);
    };
  }, [socket]);

  if (!user?.presenter) {
    return (
      <div className="border-black border-2 h-full w-full overflow-hidden">
        <img src={img} alt="whiteboard sharing app" className="w-full h-auto" />
      </div>
    );
  }

  //check user can drawing or not
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    canvas.width = 1200;
    canvas.height = 700;
    const canvasContext = canvas?.getContext("2d");

    if (!canvasContext) return;

    canvasContext.strokeStyle = color;
    canvasContext.lineWidth = 2;
    canvasContext.lineCap = "round";

    canvasContextRef.current = canvasContext;
  }, []);

  useEffect(() => {
    if (!canvasContextRef.current) return;

    canvasContextRef.current.strokeStyle = color;
  }, [color]);

  useLayoutEffect(() => {
    if (!canvasRef.current) return;

    const roughCanvas = rough.canvas(canvasRef.current!);

    const canvas = canvasRef.current;

    if (!canvas) return;

    if (elements.length > 0) {
      canvasContextRef.current?.clearRect(0, 0, canvas.width, canvas.height);
    }

    elements.forEach((element) => {
      if (element.type === "rect") {
        roughCanvas.draw(
          roughGenerator.rectangle(
            element.offsetX,
            element.offsetY,
            element.width ?? 0,
            element.height ?? 0,
            {
              stroke: element.stroke,
              strokeWidth: 5,
              roughness: 0,
            },
          ),
        );
      } else if (element.type === "line") {
        roughCanvas.draw(
          roughGenerator.line(
            element.offsetX,
            element.offsetY,
            element.width ?? 0,
            element.height ?? 0,
            {
              stroke: element.stroke,
              strokeWidth: 5,
              roughness: 0,
            },
          ),
        );
      } else if (element.type === "pencil") {
        if (element.path) {
          roughCanvas.linearPath(element.path, {
            stroke: element.stroke,
            strokeWidth: 5,
            roughness: 0,
          });
        }
      }
    });

    const canvasImage = canvasRef.current.toDataURL();
    socket.emit("whiteboardData", canvasImage);
  }, [elements]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const { offsetX, offsetY } = e.nativeEvent;
    console.log(offsetX, offsetY);

    if (tool === "pencil") {
      setElements((prevElement) => [
        ...prevElement,
        {
          type: "pencil",
          offsetX,
          offsetY,
          path: [[offsetX, offsetY]],
          stroke: color,
        },
      ]);
    } else if (tool === "line") {
      setElements((prevElement) => [
        ...prevElement,
        {
          type: "line",
          offsetX,
          offsetY,
          width: offsetX,
          height: offsetY,
          stroke: color,
        },
      ]);
    } else if (tool === "rect") {
      setElements((prevElement) => [
        ...prevElement,
        {
          type: "rect",
          offsetX,
          offsetY,
          width: 0,
          height: 0,
          stroke: color,
        },
      ]);
    }

    setIsDrawing(true);
  };
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { offsetX, offsetY } = e.nativeEvent;
    if (isDrawing) {
      if (tool === "pencil") {
        // pencil by default as Static
        const { path } = elements[elements.length - 1];
        const newPath: [number, number][] = [
          ...(path ?? []),
          [offsetX, offsetY],
        ];
        setElements((prevElement: ElementType[]) => {
          return prevElement.map((ele, index) => {
            if (index === elements.length - 1) {
              return {
                ...ele,
                path: newPath,
              };
            } else {
              return ele;
            }
          });
        });
      } else if (tool === "line") {
        setElements((prevElement: ElementType[]) => {
          return prevElement.map((ele, index) => {
            if (index === elements.length - 1) {
              return {
                ...ele,
                width: offsetX,
                height: offsetY,
              };
            } else {
              return ele;
            }
          });
        });
      } else if (tool === "rect") {
        setElements((prevElement: ElementType[]) => {
          return prevElement.map((ele, index) => {
            if (index === elements.length - 1) {
              return {
                ...ele,
                width: offsetX - ele.offsetX,
                height: offsetY - ele.offsetY,
              };
            } else {
              return ele;
            }
          });
        });
      }
    }
  };

  const handleMouseUp = (_e: React.MouseEvent<HTMLDivElement>) => {
    setIsDrawing(false);
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      className="h-full w-full border-2 border-black"
    >
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Whiteboard;
