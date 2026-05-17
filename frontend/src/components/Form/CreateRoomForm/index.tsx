
const CreateRoomForm = () => {
  return (
    <div className="w-6xl max-w-xs">
      <form className="bg-white  rounded px-5 pt-6 pb-8 mb-2">
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Enter your name"
          />
        </div>

        <div className="mb-6 flex flex-row gap-1 w-xs">
          <input
            className="shadow appearance-none border border-none rounded w-full py-4 px-3 text-gray-700 mb-3 leading-tight outline-none focus:outline-none focus:shadow-outline"
            id="code"
            type="text"
            placeholder="Generate room code"
            disabled
          />
          <div className="flex items-center justify-between gap-2">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              generate
            </button>
            <button type="button" className="outline-red-600 text-sm border-2 py-2 px-2 rounded-md active:scale-95">Copy</button>
          </div>
        </div>

        <button type="submit" className="text-white py-2 bg-blue-500 hover:bg-blue-700 w-full">Generate Room</button>
      </form>
 
    </div>
  );
}

export default CreateRoomForm
