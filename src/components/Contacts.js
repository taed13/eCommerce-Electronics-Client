import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import { IoChatbubblesOutline } from "react-icons/io5";

const Contacts = ({ contacts, currentUser, changeChat }) => {
  console.log("contacts:::", contacts);
  console.log("currentUser:::", currentUser);
  console.log("changeChat:::", changeChat);
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser?.name);
      setCurrentUserImage(currentUser?.avatarImage);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserImage && currentUserName && (
        <Container>
          <div className="brand">
            <span>
              <IoChatbubblesOutline className="fs-3" />
            </span>
            <span>Electronics Talks</span>
          </div>

          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  className={`contact ${index === currentSelected ? "selected" : ""
                    }`}
                  key={index}
                  onClick={() => {
                    changeCurrentChat(index, contact);
                  }}
                >
                  <div className="avatar">
                    {
                      contact.avatarImage ?
                        <img
                          src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                          alt="avatar"
                        /> : <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png' className="avatar-not-found" alt="avatar" />
                    }
                  </div>

                  <div className="username">
                    <span className="text-white">{contact.name}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <span className="fs-5 text-white">{currentUserName}</span>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

export default Contacts;

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 78% 12%;
  overflow: hidden;
  background-color: #384b64;
  border-radius: 10px;
  border-radius: 1rem;
  border: 1px solid #f0f0f0;
  box-shadow: 0 0 5px 5px #dddddd;
  .brand {
    margin-left: 1rem;
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 10px;
    img {
      height: 2rem;
    }
    span {
      font-size: 1.5rem;
      color: white;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff39;
      min-height: 5rem;
      width: 90%;
      cursor: pointer;
      border-radius: 5px;
      padding: 1rem;
      gap: 1rem;
      align-items: center;
      display: flex;
      transition: 0.5s ease-in-out;
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
    .selected {
      background-color: #232f3e;
    }
  }
  .avatar-not-found {
    border-radius: 50%;
  }
  .current-user {
    padding-left: 1rem;
    background-color: #232f3e;
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 3rem;
        max-inline-size: 100%;
      }
    }
    .username {
      span {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        span {
          font-size: 1rem;
        }
      }
    }
  }
`;
