"use client";
import { useState } from "react";
import axios from "axios";
import { FaPaperPlane, FaRobot, FaUserCircle } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";


export default function ChatUI({ userName = "You" }: { userName?: string }) {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 👇 function to type out AI response word by word
  const typeBotMessage = (text: string) => {
    let index = 0;
    const words = text.split(" ");
    let current = "";

    const interval = setInterval(() => {
      if (index < words.length) {
        current += (index === 0 ? "" : " ") + words[index];
        setMessages((prev) => {
          const lastMsg = prev[prev.length - 1];
          if (lastMsg?.sender === "bot") {
            // update last bot message
            return [...prev.slice(0, -1), { sender: "bot", text: current }];
          } else {
            // add first bot message
            return [...prev, { sender: "bot", text: current }];
          }
        });
        index++;
      } else {
        clearInterval(interval);
        setIsLoading(false);
      }
    }, 60); // typing speed (ms per word)
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    const userInput = input;
    setInput("");
    setIsLoading(true);

    try {
      // Call FastAPI GET endpoint
      const res = await axios.get("http://13.60.75.17//query/", {
        params: { query: userInput },
      });

      const botAnswer = res.data.answer || "No answer found";

      // Start word-by-word typing
      typeBotMessage(botAnswer);
    } catch (err) {
      console.error("Error:", err);
      setIsLoading(false);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Failed to fetch answer" },
      ]);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-[1000px] h-[700px] flex flex-col bg-gray-900 text-white rounded-2xl shadow-xl overflow-hidden">
        {/* Chat Area */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex items-start space-x-3 ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {/* Avatar */}
              {msg.sender === "bot" ? (
                <FaRobot className="text-blue-500 mt-1" size={28} />
              ) : (
                <FaUserCircle className="text-green-500 mt-1" size={28} />
              )}

              {/* Message bubble */}
              <div
                className={`px-4 py-3 rounded-2xl max-w-[70%] text-gray-900 ${
                  msg.sender === "user"
                    ? "bg-white text-right"
                    : "bg-white text-left"
                }`}
              >
                <p className="font-semibold text-sm mb-1">
                  {msg.sender === "user" ? userName : "AI Assistant"}
                </p>
                <p className="text-base whitespace-pre-wrap">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Box */}
        <div className="p-4 bg-gray-800 flex items-center space-x-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !isLoading && handleSend()}
            placeholder="Type your message..."
            className="flex-1 px-4 py-3 rounded-xl bg-gray-700 text-white focus:outline-none text-lg"
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="p-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition disabled:opacity-50"
          >
            {isLoading ? (
              <ImSpinner2 className="animate-spin text-white" size={20} />
            ) : (
              <FaPaperPlane className="text-white" size={20} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
