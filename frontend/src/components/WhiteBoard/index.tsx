import React, { useEffect, useLayoutEffect, useState } from 'react';
import rough from 'roughjs'

const roughGenerator = rough.generator();

// define object type.
type ElementType = {
  type: string;
  offsetX: number;
  offsetY: number;
  path: [number,number][];
  storke: string;
};


// RoomPage Props Type
type CanvasProps = {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  canvasContextRef: React.RefObject<
    CanvasRenderingContext2D | null | undefined
  >;
  elements: ElementType[];
  setElements:React.Dispatch<React.SetStateAction<ElementType[]>>
};


const Whiteboard = ({ canvasRef, canvasContextRef, elements, setElements }: CanvasProps) => {

  //check user can drawing or not
  const [isDrawing, setIsDrawing] = useState<boolean>(false)

  useEffect(() => {
    const canvas = canvasRef.current;
    const canvasContext = canvas?.getContext("2d");

    canvasContextRef.current = canvasContext;
  }, []);

  useLayoutEffect(()=>{

   const roughCanvas = rough.canvas(canvasRef.current!);
    elements.forEach((element)=>{
      return roughCanvas.linearPath(element.path);
    })

  },[elements])

  const handleMouseDown = (e:React.MouseEvent<HTMLCanvasElement>) => {
    const {offsetX,offsetY} = e.nativeEvent
    console.log(offsetX,offsetY);

    setElements((prevElement) => [
      ...prevElement,
      {
        type: "pencil",
        offsetX,
        offsetY,
        path: [[offsetX, offsetY]],
        storke:"black",
      },
    ]);
    setIsDrawing(true)
    
  };
  const handleMouseMove = (e:React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = e.nativeEvent;
     if (isDrawing) {
        // pencil by default as Static
        const {path} = elements[elements.length-1]
        const newPath = [...path,[offsetX,offsetY]]

        setElements((prevElement: ElementType[]) => {
          return prevElement.map((ele, index) => {
            if (index === elements.length - 1) {
              return {
                ...ele,
                path: newPath,
              };
            }else{
                return ele;
            }
          
          });
        });


     }
  };
  const handleMouseUp = (e:React.MouseEvent<HTMLCanvasElement>) => {
      setIsDrawing(false)
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className="h-full w-full border-2 border-black"
      ></canvas>
    </>
  );
};

export default Whiteboard
