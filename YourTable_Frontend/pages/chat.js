import React, { useState, useEffect,useContext } from "react";
import Navbar from "./components/Sidebars/Navbar";
import Sidebar from "./components/Sidebars/Sidebar";
import MobileSideBar from "./components/Sidebars/MobileSideBar";
import ChatIcon from "@mui/icons-material/Chat";
import _ from "lodash";
import ChatItem from "./components/chatItem";
import { io } from "socket.io-client";
import { getSession } from "next-auth/react";
import ColorContext from "./contexts/ColorContext";

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  console.log("Session: " + session.name);

  return {
    props: {
      name: session,
    },
  };
}

function chat({ name }) {
  const [NavColor, setNavColor] = useState("bg-blue-500");
  const {color, setColor} = useContext(ColorContext);

  const [arr, setArr] = useState(["Hallo"]);
  const [sockets, setSockets] = useState([]);
  const [userState, setUserState] = useState([{}]);
  const [selectedUser, setSelectedUser] = useState(0);
  const [socketState, setSocketState] = useState();
  const forceUpdate = React.useCallback(() => setUserState(userState), []);

  useEffect(() => {
    const socket = io("http://34.139.40.48", {
      withCredentials: true,
      autoConnect: false,
      extraHeaders: {
        "Access-Control-Allow-Origin": "*",
      },
    });

    var usersArr = [];

    socket.on("users", (users) => {
      console.log("GOT SOME USERS");
      console.log(users);
      users.forEach((user) => {
        user.self = user.userID === socket.id;
        user.messages = user.messages === undefined ? [] : user.messages;
      });
      usersArr = users;
      setUserState(users);
    });

    socket.on("private message", ({ content, from }) => {
      console.log(usersArr);
      console.log(selectedUser);
      for (let i = 0; i < usersArr.length; i++) {
        const user = usersArr[i];

        if (user.userID === from) {
          user.messages.push({
            content,
            fromSelf: false,
          });
          break;
        }
      }
      console.log("rerender");
      forceUpdate();
      setUserState(usersArr);
    });

    socket.on("error", function (err) {
      console.log("err:" + err);
    });

    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });

    socket.on("disconnect", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });

    socket.auth = { username: name.name };
    socket.connect();

    setSocketState(socket);

    return () => clearInterval(timerID);
  }, []);

  useEffect(() => {
    console.log("ABC");
  }, [userState]);

  function sendMessage() {
    const content = message.value;
    socketState.emit("private message", {
      content,
      to: userState[selectedUser].userID,
    });
    const users = [...userState];
    users[selectedUser].messages.push({
      content,
      fromSelf: true,
    });
    setUserState(users);
    console.log(users);
    console.log("Sended message " + content);
    message.value = "";
  }

  function setStateNumber(i) {
    console.log(userState[i+1]);
    console.log(selectedUser);
    setSelectedUser(i+1);
  }

  return (
    <div>
      <Navbar setNavColorField={setColor} />
      <main className="flex bg-gray-100">
        <Sidebar NavColorField={color} />

        <div className="w-full flex flex-col h-screen overflow-y-hidden">
          <MobileSideBar />

          <div className="flex-1 bg-gray-200 flex">
            <div className="bg-white w-16 md:w-72 h-full pt-24">
              <div className="">
                {userState.filter(x=>!x.self).map((el, i) => (
                  <a
                    key={i}
                    onClick={() => setStateNumber(i)}
                    className=" flex items-center active-nav-link text-gray-400 py-4  h-18 px-6 transition duration-200 nav-item hover:bg-gray-300 hover:text-blue-500"
                  >
                    <ChatIcon className="mr-3" />
                    <p id="editProfileBtn" className=" hidden md:flex">
                      {el.username}
                    </p>
                  </a>
                ))}
              </div>
            </div>
            <div className="flex flex-1 flex-col h-screen p-6">
              <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full justify-end p-4">
                <div className="flex flex-col overflow-x-auto overflow-y-scroll mb-4 ">
                  <div className="grid grid-cols-12 gap-y-2">
                    {userState[selectedUser] === undefined ||
                    userState[selectedUser].messages === undefined ? (
                      <ChatItem name={"e"} color={color} message={"error"} self={true}></ChatItem>
                    ) : (
                      userState[selectedUser].messages.map((el,i) => (
                        <ChatItem key={i} name={el.fromSelf?name.name.substring(0,1).toUpperCase():userState[selectedUser].username} color={color} message={el.content} self={el.fromSelf}></ChatItem>
                      ))
                    )}
                  </div>
                </div>
                <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                  <div className="flex-grow ml-4">
                    <div className="relative w-full">
                      <input
                        type="text"
                        id="message"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            sendMessage();
                          }
                        }}
                        className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                      />
                    </div>
                  </div>
                  <div className="ml-4">
                    <button
                      onClick={(e) => {
                        sendMessage();
                      }}
                      className={`flex items-center justify-center ${NavColor} hover:${NavColor.replace("5","6")} rounded-xl text-white px-4 py-1 flex-shrink-0`}
                    >
                      <span>Send</span>
                      <span className="ml-2">
                        <svg
                          className="w-4 h-4 transform rotate-45 -mt-px"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          ></path>
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default chat;
