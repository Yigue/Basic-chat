import { useState, useEffect } from "react";
import io from "socket.io-client";
import "./App.css";

const socket = io("http://localhost:4000/");

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {

    const receiveMessage= message=>{
      console.log(message);
      setMessages([message,...messages]);
    }
    socket.on("message",receiveMessage);

    return ()=>{
      socket.off("message",receiveMessage);
    }

  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", message);
    setMessage("");
    const newMessage={
      body:message,
      from:"me"
    }
    setMessages([ newMessage,...messages]);
  };

  return (
    <div className="h-screen bg-zinc-800 flex items-center justify-center text-white">
      <form className="bg-zinc-900 p-10" action="" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bolt my-2">Chat React</h1>

        <input
          className="border-2 border-zinc-500 p-2 text-black w-full"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        {/* <button className="bg-blue-500 ">Send</button> */}
        <ul className="h-80 overflow-auto">
          {messages.map((message, index) => (
            <li
              className={`my-2 p-2 table text-sm rounded-md ${
                message.from === "me" ? "bg-sky-700 ml-auto" : "bg-black"
              } `}
              key={index}
            >
              <p>
                {message.from}:{message.body}
              </p>
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
}
export default App;
