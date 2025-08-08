import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

const MessageInput = () => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      console.log("Sending:", message);
      setMessage("");
    }
  };

  return (
    <div className='border-t p-4 flex items-center'>
      <input
        className='flex-1 border rounded px-4 py-2 mr-2'
        placeholder='Type a message...'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        className='bg-purple-700 text-white p-3 rounded-full'
        onClick={handleSend}
      >
        <FaPaperPlane />
      </button>
    </div>
  );
};

export default MessageInput;
