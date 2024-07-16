import React, { useState, useEffect, useRef } from "react";
import { CiFaceSmile } from "react-icons/ci";
import { PiLinkSimple } from "react-icons/pi";
import { IoMdSend } from "react-icons/io";
import { useTheme } from './ThemeContext';

const Chat = ({ messages }) => {
  const { theme } = useTheme();
  const [newMessage, setNewMessage] = useState("");
  const lastMessageRef = useRef(null);

  const handleSendMessage = () => {
    console.log("New message:", newMessage);
    setNewMessage("");
  };

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="p-4 max-w-full h-full flex flex-col justify-between">
      <div className="space-y-4 overflow-y-auto flex-grow">
        {messages.map((message, index) => (
          <div
            key={message.id}
            ref={index === messages.length - 1 ? lastMessageRef : null}
          >
            {(index === 0 ||
              messages[index - 1].created_at.split("T")[0] !==
                message.created_at.split("T")[0]) && (
              <div className="text-center text-gray-400 mb-2">
                {new Date(message.created_at).toLocaleDateString()}
              </div>
            )}
            <div
              className={`flex ${
                message.sender_id === 1 ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs p-4 rounded-lg break-words ${
                  message.sender_id === 1
                    ? "bg-blue-600"
                    : "bg-gray-500 text-white"
                }`}
              >
                <div className="mb-2">{message.message}</div>
                <div className="text-xs text-gray-300 text-right">
                  {new Date(message.created_at).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={`mt-4 sticky bottom-0 p-4  flex justify-around bg-slate-700 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-300 text-black'}`}>
        <div className=" flex   items-center">
          <CiFaceSmile size={30} />
        </div>

        <div className="w-4/6">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className={` p-2  rounded mb-2 w-full outline-none bg-slate-700 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-300 text-black'}`}
            placeholder="Type your message..."
          />
        </div>
        <div className=" flex  items-center  ">
          <PiLinkSimple size={30} />
        </div>

        <div className="flex items-center">
          <IoMdSend size={30} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
