import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSendChatMessageMutation } from "../store/api";
import "./ChatbotIcon.css";

// Generate a simple session ID
const generateSessionId = () => {
  return "sess_" + Date.now().toString(36) + "_" + Math.random().toString(36).substring(2, 9);
};

const ChatbotIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Hello! 👋 I'm DiPharma Assistant. Ask me about our products, services, or say \"go to contact\" to navigate!",
    },
  ]);
  const [input, setInput] = useState("");
  const [sendMessage, { isLoading }] = useSendChatMessageMutation();
  const [isListening, setIsListening] = useState(false);
  const messagesEnd = useRef(null);
  const navigate = useNavigate();
  const recognitionRef = useRef(null);
  const [sessionId] = useState(() => generateSessionId());

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
        // Auto-send after voice capture
        setTimeout(() => handleSendMessage(transcript), 300);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: "Voice input is not supported in your browser. Please use Chrome or Edge." },
      ]);
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleSendMessage = async (overrideMsg) => {
    const userMsg = (overrideMsg || input).trim();
    if (!userMsg || isLoading) return;
    setInput("");
    setMessages((prev) => [...prev, { type: "user", text: userMsg }]);

    try {
      const result = await sendMessage({ message: userMsg, sessionId }).unwrap();
      const { reply, action, path } = result.data;

      setMessages((prev) => [...prev, { type: "bot", text: reply, action, path }]);

      // Auto-navigate if action is navigate
      if (action === "navigate" && path) {
        setTimeout(() => {
          navigate(path);
          setIsOpen(false);
        }, 1500);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: "Sorry, something went wrong. Please try again." },
      ]);
    }
  };

  const handleSend = () => handleSendMessage();

  // Format bot messages with bold and line breaks
  const formatText = (text) => {
    if (!text) return text;
    return text.split("\n").map((line, i) => (
      <React.Fragment key={i}>
        {line.split(/\*\*(.*?)\*\*/g).map((part, j) =>
          j % 2 === 1 ? <strong key={j}>{part}</strong> : part
        )}
        {i < text.split("\n").length - 1 && <br />}
      </React.Fragment>
    ));
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
                <p>{formatText(msg.text)}</p>
                {msg.action === "navigate" && msg.path && (
                  <button
                    className="chatbot-nav-btn"
                    onClick={() => {
                      navigate(msg.path);
                      setIsOpen(false);
                    }}
                  >
                    Go to page →
                  </button>
                )}
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
            <button
              className={`chatbot-mic-btn ${isListening ? "listening" : ""}`}
              onClick={toggleListening}
              title={isListening ? "Stop listening" : "Voice input"}
            >
              🎤
            </button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={isListening ? "Listening..." : "Type a message..."}
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
