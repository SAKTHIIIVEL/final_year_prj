import React, { useState, useRef, useEffect } from "react";
import { useSendChatMessageMutation } from "../store/api";
import "./ChatbotIcon.css";

const ChatbotIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Hello! I'm DiPharma Assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [sendMessage, { isLoading }] = useSendChatMessageMutation();
  const messagesEnd = useRef(null);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { type: "user", text: userMsg }]);

    try {
      const result = await sendMessage({ message: userMsg }).unwrap();
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: result.data.reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: "Sorry, something went wrong. Please try again." },
      ]);
    }
  };

  return (
    <>
      <button
        className="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Chat"
      >
        {isOpen ? "✕" : "🤖"}
      </button>

      {isOpen && (
        <div className="chatbot-popup">
          <div className="chatbot-header">
            <span className="chatbot-title">🤖 DiPharma Assistant</span>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-message ${msg.type}`}>
                <p>{msg.text}</p>
              </div>
            ))}
            {isLoading && (
              <div className="chat-message bot">
                <p className="typing">Typing...</p>
              </div>
            )}
            <div ref={messagesEnd} />
          </div>
          <div className="chatbot-input-area">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
              disabled={isLoading}
            />
            <button onClick={handleSend} disabled={isLoading || !input.trim()}>
              →
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotIcon;
