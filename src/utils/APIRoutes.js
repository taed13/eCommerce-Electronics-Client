// export const host = "http://localhost:1337";
import { host } from "./axiosConfig";

export const registerRoute = `${host}/api/user/register`;
export const loginRoute = `${host}/api/user/login`;
export const setAvatarRoute = `${host}/api/user/setAvatar`;
export const allUsersMessageRoute = `${host}/api/messages/getusers`;
export const allAdminsRoute = `${host}/api/user/alladmins`;
export const sendMessageRoute = `${host}/api/messages/addmsg`;
export const getAllMessageRoute = `${host}/api/messages/getmsg`;
export const getAllMessagesRoute = `${host}/api/messages/getmsgs`;