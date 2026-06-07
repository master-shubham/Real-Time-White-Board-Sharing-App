
const JoinRoomForm = () => {
   return (
     <div className="w-full">
       <form className="w-full bg-white rounded px-4 py-6">
         <div className="mb-6">
           <input
             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
             id="username"
             type="text"
             placeholder="Enter your name"
           />
         </div>
         <div className="mb-6">
           <input
             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
             id="joincode"
             type="text"
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
