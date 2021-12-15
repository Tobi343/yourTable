import React, { useState, useEffect } from "react";
import Navbar from "./components/Sidebars/Navbar";
import Sidebar from "./components/Sidebars/Sidebar";
import MobileSideBar from "./components/Sidebars/MobileSideBar";
import ChatIcon from "@mui/icons-material/Chat";
import _ from "lodash";
import ChatItem from "./components/chatItem";
import { io } from "socket.io-client";
import { CompressOutlined } from "@mui/icons-material";
import { getSession } from "next-auth/react";

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
  const [arr, setArr] = useState(["Hallo"]);
  const [sockets, setSockets] = useState([]);
  const [userState, setUserState] = useState([{}]);
  var userStateArr = [];
  const [selectedUser, setSelectedUser] = useState(0);
  //const username = Math.random()*1000+"";

  const socket = io("http://localhost:8080", {
    withCredentials: true,
    autoConnect: false,
    extraHeaders: {
      "Access-Control-Allow-Origin": "*",
    },
  });

 

  useEffect(() => {
    socket.auth = { username: name.name };
    socket.connect();
  }, []);

  socket.onAny((event, ...args) => {
    console.log(event, args);
  });

  socket.on("connect", () => {
    //console.log("Connected: " + socket.connected); // true
  });

  socket.on("sockets", (data) => {
    //console.log("sockets: "+(data))
  });

  socket.on("chat message", (data) => {
    console.log("sockets: " + data);
  });

  socket.on("users", (users) => {
    console.log("USERS:" + users);
    const usersArr = [];
    users.map((element) => {
      console.log(element)
      usersArr.push(element);
    });
    console.log("LOST:" + JSON.stringify(usersArr));
    userStateArr = usersArr;
    console.log(socket.connected)
  });

  socket.on("user connected", (user) => {
    console.log("Connected: " + user);
    setUserState((prevState) => [...prevState, user]);
  });

  socket.on("private message", ({ content, from }) => {
    for (let i = 0; i < userStateArr.length; i++) {
      const user = userStateArr[i];
      if (user.userID === from) {
        userStateArr[i].messages.push({
          content,
          fromSelf: false,
        });
        if (userStateArr[i] !== userStateArr[selectedUser]) {
          userStateArr[i].hasNewMessages = true;
        }
        break;
      }
    }
    userStateArr=users;
    console.log("getMessage: " + userStateArr[selectedUser]);
  });

  socket.on("error", function (err) {
    console.log("err:" + err);
  });

  function sendMessage() {
    console.log(socket.connected);
    console.log(userStateArr);
    const val = message.value;
    socket.emit("abc", "abc");
    console.log("Sended message " + val);
    message.value = "";
  }

  function setStateNumber(i) {
    console.log(userState[i]);
    setSelectedUser(i);
  }

  return (
    <div>
      <Navbar setNavColorField={setNavColor} />
      <main className="flex bg-gray-100">
        <Sidebar NavColorField={NavColor} />

        <div className="w-full flex flex-col h-screen overflow-y-hidden">
          <MobileSideBar />

          <div className="flex-1 bg-gray-200 flex">
            <div className="bg-white w-16 md:w-72 h-full pt-24">
              <div className="">
                {userStateArr.map((el, i) => (
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
            <div className="flex flex-1 flex-col h-full p-6">
              <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
                <div className="flex flex-col overflow-x-auto overflow-y-scroll max-h-96 mb-4">
                  <div className="grid grid-cols-12 gap-y-2">
                    {userStateArr[selectedUser] === undefined ||
                    userStateArr[selectedUser].messages === undefined ? (
                      <ChatItem message={"el"}></ChatItem>
                    ) : (
                      userStateArr[selectedUser].messages.map((el) => (
                        <ChatItem message={el}></ChatItem>
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
                      className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
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
