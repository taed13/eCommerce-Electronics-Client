import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoIosSend } from "react-icons/io";
import { toast } from "react-toastify";

export default function ChatInput({ handleSendMsg }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");
  const emojiPickerRef = useRef(null); // Ref for emoji picker

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emojiObject) => {
    setMsg((prevMsg) => prevMsg + emojiObject.emoji);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!msg.trim()) {
      toast.error("Vui lòng nhập tin nhắn trước khi gửi!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    handleSendMsg(msg);
    setMsg("");
  };

  // Detect clicks outside the emoji picker
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Container>
      <div className="button-container">
        <div className="emoji" ref={emojiPickerRef}>
          <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
          {showEmojiPicker && (
            <Picker
              onEmojiClick={handleEmojiClick}
              className="emoji-picker-react"
            />
          )}
        </div>
      </div>
      <form action="" className="input-container" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nhập tin nhắn..."
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button className="submit">
          <span>
            <IoIosSend className="fs-5" />
          </span>
          <span className="text-white">Gửi</span>
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 5% 95%;
  align-items: center;
  background-color: #f2f2f2;
  padding: 0 2rem;
  padding-bottom: 0.3rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #232f3e;
        cursor: pointer;
      }
      .emoji-picker-react {
        position: absolute;
        top: -460px;
        background-color: white;
        border-radius: 10px;
        border: 1px solid #232f3e;
        box-shadow: 0 5px 10px #cccccc;
        border-color: #232f3e;
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #232f3e;
          width: 5px;
        }
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        .emoji-search {
          background-color: transparent;
        }
        .emoji-group:before {
          background-color: #232f3e;
        }
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-content: center;
    gap: 2rem;
    background-color: white;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: black;
      border: none;
      padding: 0.6rem;
      padding-left: 1rem;
      font-size: 1rem;
      &::selection {
        background-color: #384b64;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.5rem 1.5rem;
      gap: 5px;
      border-radius: 0 10px 10px 0;
      background-color: #232f3e;
      border: 1px solid #232f3e;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
          color: white;
        }
      }
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;