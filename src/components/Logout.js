import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { VscSignOut } from "react-icons/vsc";

export default function Logout() {
  const navigate = useNavigate();
  const handleClick = async () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <>
      <Button onClick={handleClick}>
        <span>
          <VscSignOut />
        </span>
        <span>Thoát</span>
      </Button>
    </>
  );
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  color: white;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #232f3e;
  border: 1px solid white;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;
