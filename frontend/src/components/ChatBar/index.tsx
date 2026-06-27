import { useEffect, useState } from "react";
import type { Socket } from "socket.io-client";

type ChatBarProp = {
  setOpenedChatTab: React.Dispatch<React.SetStateAction<boolean | null>>;
  openedChatTab: boolean;
  socket: Socket;
};

type Chat = {
  message: string;
  name: string;
};

const ChatBar = ({ setOpenedChatTab, openedChatTab, socket }: ChatBarProp) => {
  const [chat, setChat] = useState<Chat[]>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    socket.on("messageResponse", (data) => {
      setChat((prevChat) => [...prevChat, data]);
    });
  }, []);

  const handleFormSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim() !== "") {
      setChat((prevChat) => [...prevChat, { message, name: "You" }]);
      socket.emit("message", { message });
      setMessage("");
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 h-screen w-90 max-w-full
  bg-black text-white flex flex-col
  transition-transform duration-300 ease-in-out
  ${!openedChatTab ? "-translate-x-full" : "translate-x-0"}`}
    >
      {/* Header */}
      <div className="p-4">
        <button
          type="button"
          className="w-full bg-white text-black py-2 rounded cursor-pointer"
          onClick={() => setOpenedChatTab(false)}
        >
          Close
        </button>
      </div>

      {/* Messages */}
      <div
        className="
      flex-1
      mx-2
      mb-2
      p-3
      border
      border-white
      rounded-xl
      overflow-y-auto
      overflow-x-hidden
    "
      >
        {chat.map((msg, i) => (
          <div
            key={i}
            className="
          w-full
          mb-2
          p-2
          border
          rounded
          wrap-break-word
          whitespace-pre-wrap
        "
          >
            <strong>{msg.name}:</strong> {msg.message}
          </div>
        ))}
      </div>

      {/* Input */}
      <form
        onSubmit={handleFormSubmit}
        className="p-2 border-t border-white flex gap-2"
      >
        <input
          type="text"
          placeholder="Enter message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="
        flex-1
        min-w-0
        px-3
        py-2
        rounded
        bg-transparent
        border
        outline-none
      "
        />

        <button
          type="submit"
          className="px-4 bg-white text-black rounded shrink-0"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatBar;
