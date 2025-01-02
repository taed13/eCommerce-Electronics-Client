import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loader from "../assets/loader.gif";
import { setAvatarRoute } from "../utils/APIRoutes";

export default function SetAvatar() {
    const api = "https://api.multiavatar.com/45678945";
    const navigate = useNavigate();

    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    useEffect(() => {
        if (!localStorage.getItem("chat-app-user")) {
            navigate("/login");
        }
    }, []);

    const setProfilePicture = async () => {
        if (selectedAvatar === undefined) {
            toast.error("Vui lòng chọn ảnh đại diện", toastOptions);
        } else {
            const user = await JSON.parse(localStorage.getItem("chat-app-user"));
            const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
                image: avatars[selectedAvatar],
            });

            if (data.isSet) {
                user.isAvatarImageSet = true;
                user.avatarImage = data.image;
                localStorage.setItem("chat-app-user", JSON.stringify(user));
                notify();
                navigate("/chat");
            } else {
                toast.error("Có lỗi khi lưu ảnh đại diện. Vui lòng thử lại sau!", toastOptions);
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = [];
            for (let i = 0; i < 4; i++) {
                try {
                    const response = await axios.get(
                        `${api}/${Math.round(Math.random() * 1000)}`
                    );

                    const decodedImage = btoa(response.data);
                    data.push(decodedImage);
                } catch (error) {
                    console.error("Error fetching avatar:", error);
                }
            }

            setAvatars(data);
            setIsLoading(false);
        };

        fetchData();
    }, []);

    const notify = () => {
        toast.success("Đã đặt ảnh đại diện!", toastOptions);
    };

    return (
        <>
            {isLoading ? (
                <Container>
                    <img src={loader} alt="loader" className="loader" />
                </Container>
            ) : (
                <Container>
                    <div className="title-container">
                        <h1>Hãy chọn ảnh đại diện của bạn</h1>
                    </div>
                    <div className="avatars">
                        {avatars.map((avatar, index) => (
                            <div
                                key={index}
                                className={`avatar ${selectedAvatar === index ? "selected" : ""
                                    }`}
                            >
                                <img
                                    src={`data:image/svg+xml;base64,${avatar}`}
                                    alt="avatar"
                                    onClick={() => {
                                        setSelectedAvatar(index);
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                    <button className="submit-btn" onClick={setProfilePicture}>
                        Đặt làm ảnh đại diện
                    </button>
                </Container>
            )}

            <ToastContainer {...toastOptions} />
        </>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 3rem;
    background-color: transparent;
    height: 100vh;
    width: 100vw;
    .loader {
        max-inline-size: 100%;
    }
    .title-container {
        h1 {
            color: black;
        }
    }

    .avatars {
        display: flex;
        gap: 2rem;
        .avatar {
        border: 0.4rem solid transparent;
        padding: 0.4rem;
        border-radius: 5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 0.5s ease-in-out;
        img {
            height: 6rem;
        }
        }
        .selected {
        border: 0.4rem solid #FEBD68;
        }
    }
    .submit-btn {
        background-color: #FEBD68;
        color: black;
        padding: 1rem 2rem;
        border: none;
        font-weight: bold;
        cursor: pointer;
        border-radius: 0.4rem;
        font-size: 1rem;
        text-transform: uppercase;
        transition: 0.5s ease-in-out;
        &:hover {
            background-color: #FEBD68;
        }
    }
`;
