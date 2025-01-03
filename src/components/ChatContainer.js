import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
// import Messages from "./Messages";
import { getAllMessagesRoute, sendMessageRoute } from "../utils/APIRoutes";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { getConfig } from "../utils/axiosConfig";

export default function ChatContainer({ currentChat, currentUser, socket }) {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const scrollRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser && currentChat) {
        const response = await axios.post(getAllMessagesRoute, {
          from: currentUser?._id,
          to: currentChat?._id,
        }, getConfig());
        setMessages(response.data);
      }
    };

    fetchData();
  }, [currentUser, currentChat]);

  const handleSendMsg = async (msg) => {
    const timestamp = new Date();
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    }, getConfig());
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
      timestamp: timestamp,
    });

    const msgs = [...messages];
    msgs.push({
      fromSelf: true,
      message: msg,
      createdAt: timestamp,
    });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (data) => {
        setArrivalMessage({
          fromSelf: false,
          message: data.message,
          createdAt: data.lastUpdatedMessage,
        });
      });
    }
  });

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  console.log("currentChat:::", currentChat);

  return (
    <>
      {currentChat && (
        <Container>
          <div className="chat-header">
            <div className="user-details">
              <div className="avatar">
                {
                  currentChat.avatarImage ?
                    <img
                      src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                      alt="avatar"
                    /> : <></>
                }
              </div>
              <div className="username">
                <span className="fs-5 text-white">{currentChat?.name} - {currentChat?.email}</span>
              </div>
            </div>
          </div>
          <div className="chat-messages" ref={scrollRef}>
            {messages.map((message, index) => (
              <div key={uuidv4()} className={`message ${message.fromSelf ? "sended" : "received"}`}>
                <div className="content">
                  <p>{message.message}</p>
                  <span className="timestamp">
                    {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
          </div>
          {/* <Messages /> */}
          <ChatInput handleSendMsg={handleSendMsg} />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 78% 12%;
  gap: 0.1rem;
  overflow: hidden;
  border-radius: 10px;
  border-radius: 1rem;
  border: 1px solid #f0f0f0;
  box-shadow: 0 0 5px 5px #dddddd;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }

  .chat-header {
    display: flex;
    justify-content: space-between;
    background-color: #232f3e;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #2c2c2c;
        .timestamp {
          font-size: 0.8rem;
          color: gray;
          text-align: right;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #abcdef;
      }
    }
    .received {
      justify-content: flex-start;
      .content {
        background-color: #ededed;
      }
    }
  }
`;
