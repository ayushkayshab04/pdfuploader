import React, { useState } from "react";
import axios from "axios";
import { baseUrl } from "../config/config";

const ChatInterface = ({pdfUrl}) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    const response = await axios.post(`${baseUrl}/api/chat/ask`, { message: input,pdfText:pdfUrl });
    // console.log("=========anbswer",response.data.response.answer)
    setMessages((prev) => [...prev, { sender: "bot", text: response.data.response.answer }]);
    setInput("");
  };

  return (
    <div style={{
      height:'90vh',
      width:"60%",
      margin:'20px 0px 0px 0px ',
      display:'flex',
      flexDirection:'column',
      justifyContent:'flex-end'
    }}>
      <div style={{
        width:'96%',
        padding:'10px',
        height:'90vh',
        overflowY:'auto'
      }}>
      {messages.map((msg, index) => (
        <div key={index} style={{
          width:'100%',
          display:'flex',
          justifyContent:msg.sender=== "user" ? "flex-end" : "flex-start",
          
        }}>
        <p style={{ 
          color:"rgba(0 0 0 ,0.5)", 
          background: msg.sender=== "user" ?'#F6DC43':'#F5F5F5',
          maxWidth:'60%',
          padding:"20px 30px",
          borderRadius:'12px',
          textAlign:'left',
          }}>
          {msg.text}
        </p>
        </div>
      ))}
      </div>
      <div style={{
        display:'flex',
        justifyContent:"center",
        width:'100%',
        alignItems:'center',
        gap:"10px",
      }}>
      <input style={{
        width:'90%',
        padding:'20px',
        borderRadius:'10px',
        border:'1px solid rgba(0, 0, 0, 0.1)'
      }} value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about the PDF..." />
      <button style={{
        padding:'20px 20px',
        borderRadius:'10px',
        width:'20%',
        fontSize:'14px',
        fontWeight:'600',
        background:'#F6DC43',
        border:'1px solid #fff',
        color:'#fff',
      }} onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatInterface;
 