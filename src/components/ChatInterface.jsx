import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { baseUrl } from "../config/config";

const ChatInterface = ({ pdfUrl }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const sendMessage = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    setMessages((prev) => [...prev, { sender: "user", text: trimmedInput }]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await axios.post(`${baseUrl}/api/chat/ask`, {
        message: trimmedInput,
        pdfText: pdfUrl,
      });

      const botReply = response?.data?.response?.answer || "No response.";
      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "An error occurred. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div
      style={{
        height: "90vh",
        width: "60%",
        margin: "20px 0px 0px 0px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      <div
        style={{
          width: "96%",
          padding: "10px",
          height: "90vh",
          overflowY: "auto",
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              width: "100%",
              display: "flex",
              justifyContent:
                msg.sender === "user" ? "flex-end" : "flex-start",
            }}
          >
            <p
              style={{
                color: "rgba(0 0 0 ,0.5)",
                background: msg.sender === "user" ? "#F6DC43" : "#F5F5F5",
                maxWidth: "60%",
                padding: "20px 30px",
                borderRadius: "12px",
                textAlign: "left",
                whiteSpace: "pre-wrap",
              }}
            >
              {msg.text}
            </p>
          </div>
        ))}

        {isLoading && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div
              style={{
                background: "#F5F5F5",
                color: "rgba(0 0 0 ,0.5)",
                maxWidth: "60%",
                padding: "20px 30px",
                borderRadius: "12px",
                fontStyle: "italic",
                display: "flex",
                gap: "5px",
              }}
            >
              <span className="dot one">.</span>
              <span className="dot two">.</span>
              <span className="dot three">.</span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <textarea
          style={{
            width: "90%",
            padding: "20px",
            borderRadius: "10px",
            border: "1px solid rgba(0, 0, 0, 0.1)",
            resize: "none",
            fontFamily: "inherit",
            fontSize: "14px",
          }}
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about the PDF..."
        />
        <button
          style={{
            padding: "20px 20px",
            borderRadius: "10px",
            width: "20%",
            fontSize: "14px",
            fontWeight: "600",
            background: "#F6DC43",
            border: "1px solid #fff",
            color: "#fff",
          }}
          onClick={sendMessage}
        >
          Send
        </button>
      </div>

      {/* Typing dots animation CSS */}
      <style>
        {`
          @keyframes blink {
            0% { opacity: 0.2; }
            20% { opacity: 1; }
            100% { opacity: 0.2; }
          }

          .dot {
            font-size: 24px;
            animation: blink 1.4s infinite;
          }

          .dot.one {
            animation-delay: 0s;
          }

          .dot.two {
            animation-delay: 0.2s;
          }

          .dot.three {
            animation-delay: 0.4s;
          }
        `}
      </style>
    </div>
  );
};

export default ChatInterface;
