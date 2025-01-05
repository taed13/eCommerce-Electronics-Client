import React from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";
import { IoChatbubblesOutline } from "react-icons/io5";

export default function Welcome({ currentUser }) {
  return (
    <>
      <Container>
        <IoChatbubblesOutline className="logo-chat" />
        {
          currentUser?.name ? <h1>Xin chào, <span>{currentUser?.name}!</span></h1> : <h1>Xin chào!</h1>
        }
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  border: 1px solid #f0f0f0;
  border-radius: 15px;
  box-shadow: 0 0 5px 5px #dddddd;
  background-color: #384b64;
  img {
    height: 20rem;
  }
  h1 {
    color: #white;
  }
  .logo-chat {
    font-size: 10rem;
  }
`;
