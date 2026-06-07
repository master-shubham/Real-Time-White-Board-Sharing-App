import type { Socket } from "socket.io-client";

export type ElementType = {
  type: string;
  offsetX: number;
  offsetY: number;
  path?: [number, number][];
  width?: number;
  height?: number;
  stroke: string;
};

// Define a type for our available drawing tools
export type DrawingTool = "pencil" | "line" | "rect";

//define a type for unique id
export type Uuid = {
  uuid: () => string;
  socket: Socket;
  setUser: React.Dispatch<React.SetStateAction<RoomData | null>>;;
};


export type RoomData={
  name:string,
  roomId:string,
  userId:string,
  host:boolean,
  presenter:boolean
}