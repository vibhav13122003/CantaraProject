import React from "react";
import MessageInput from "./MessageInput";

const mockMessages = [
  {
    id: 1,
    fromScout: true,
    time: "09:45 AM",
    content: "Good morning! I've found an exceptional talent...",
  },
  {
    id: 2,
    fromScout: false,
    time: "10:02 AM",
    content: "That sounds promising! Please send over your detailed report.",
  },
  {
    id: 3,
    fromScout: true,
    time: "10:15 AM",
    content: "I've attached the report and match highlights.",
    attachments: [
      { name: "Carlos_Vega_Scout_Report.pdf", size: "2.4 MB" },
      { name: "Vega_Highlights_April23.mp4", size: "18.7 MB" },
    ],
  },
];

const ChatWindow = ({ scout }) => {
  return (
    <div className='flex-1 flex flex-col bg-white'>
      <div className='border-b p-4 flex items-center justify-between'>
        <div>
          <h4 className='font-semibold'>{scout.name}</h4>
          <p className='text-sm text-green-600'>Online</p>
        </div>
        <div className='text-xl font-bold text-orange-500'>{scout.avatar}</div>
      </div>

      <div className='flex-1 overflow-y-auto p-6 space-y-6'>
        {mockMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.fromScout ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`max-w-md p-3 rounded-lg ${
                msg.fromScout ? "bg-gray-100" : "bg-purple-100"
              }`}
            >
              <p className='text-sm'>{msg.content}</p>
              {msg.attachments && (
                <div className='mt-2 space-y-1'>
                  {msg.attachments.map((file, idx) => (
                    <div key={idx} className='text-xs text-gray-600'>
                      📎 {file.name} ({file.size})
                    </div>
                  ))}
                </div>
              )}
              <div className='text-right text-xs text-gray-400 mt-1'>
                {msg.time}
              </div>
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatWindow;
