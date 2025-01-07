import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IoChatbubblesOutline } from "react-icons/io5";

const Contacts = ({ contacts, currentUser, changeChat, socket }) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [updatedContacts, setUpdatedContacts] = useState(contacts);

  useEffect(() => {
    if (!socket.current) {
      console.error("Socket not initialized!");
      return;
    }
    console.log("Socket connected: ", socket.current.id);
  }, [socket]);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser?.name);
    }
  }, [currentUser]);

  useEffect(() => {
    setUpdatedContacts(contacts);
  }, [contacts]);


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("contact-updated", (data) => {
        console.log("Real-time update received:", data);

        setUpdatedContacts((prevContacts) => {
          const updatedList = prevContacts.map((contact) =>
            contact._id === data.userId
              ? { ...contact, lastUpdatedMessage: data.lastUpdatedMessage, lastMessage: data.lastMessage }
              : contact
          );

          console.log("Updated contacts:", updatedList);
          return updatedList;
        });
      });

      return () => {
        socket.current.off("contact-updated");
      };
    }
  }, [socket]);


  const formatTimeAgo = (lastUpdated) => {
    try {
      const date = new Date(lastUpdated);

      if (isNaN(date.getTime())) {
        return "Invalid date";
      }

      const diffInMs = currentTime - date;
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
      const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

      if (diffInMinutes < 1) return "Vừa xong";
      if (diffInMinutes < 60) return `${diffInMinutes} phút`;
      if (diffInHours < 24) return `${diffInHours} giờ`;
      return `${diffInDays} ngày`;
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Error formatting date";
    }
  };

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  console.log('contacts:::', contacts);
  return (
    <>
      {currentUserName && (
        <Container>
          <div className="brand">
            <span>
              <IoChatbubblesOutline className="fs-3" />
            </span>
            <span>Electronics Talks</span>
          </div>

          <div className="contacts">
            {updatedContacts.map((contact, index) => {
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
                    <div className="avatar-placeholder">
                      <span>
                        {contact?.name
                          ?.trim()
                          ?.split(" ")
                          ?.reduce((prev, current) => `${prev}${current[0].toUpperCase()}`, "") || "?"}
                      </span>
                    </div>
                  </div>

                  <div className="username">
                    <span className="text-white">{contact.name}</span>
                    <span className="last-message">
                      {contact.lastMessage ? `${contact.lastMessage.slice(0, 20)}` : "No messages yet"}
                    </span>
                    <span className="last-updated">
                      {contact.lastUpdatedMessage ? formatTimeAgo(contact.lastUpdatedMessage) : "No activity"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="current-user">
            <div className="avatar">
              <div className="avatar-placeholder">
                <span>
                  {currentUserName
                    ? currentUserName
                      .trim()
                      .split(/\s+/)
                      .map((word) => word[0].toUpperCase())
                      .join("")
                    : "?"}
                </span>
              </div>
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
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
        h3 {
          color: white;
          margin: 0;
        }
        .last-message {
          font-size: 0.9rem;
          color: #a9a9a9;
          font-weight: normal;
          max-width: 200px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .last-updated {
          font-size: 0.8rem;
          color: #d1d1d1;
          font-weight: normal;
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
  .avatar-placeholder {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #FEBD68;
    color: white;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    font-weight: bold;
    font-size: 24px;
  }

  .avatar img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  .avatar-not-found {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }
`;
