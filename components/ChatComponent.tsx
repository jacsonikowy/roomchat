"use client";
import React, { useEffect, useRef, useState } from "react";
import { UserButton } from "@clerk/nextjs";
import Form from "./Form";
import Message from "./Message";
import { useUser } from "@clerk/nextjs";
import { pusher } from "@/lib/pusher";

interface IData {
  content: string;
  id: number;
  username: string;
  userImg: string;
  userId: string;
}

const ChatComponent = ({ data }: { data: IData[] }) => {
  const [messages, setMessages] = useState(data);
  const scrollBottom = useRef<HTMLDivElement | null>(null);
  const { user } = useUser();

  useEffect(() => {
    const channel = pusher.subscribe("message");
    channel.bind("new-message", (data: IData) => {
      setMessages((prev) => [...prev, data]);
    });

    scrollBottom.current?.scrollIntoView({
      behavior: "smooth",
    });

    return () => {
      pusher.unsubscribe("message");
    };
  }, []);

  useEffect(() => {
    scrollBottom.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <main className="p-10 h-screen pb-20">
      <div className="w-full flex justify-between pb-8">
        <h1 className="text-4xl font-bold">
          Room<span className="text-[#00b086]">chat</span>
        </h1>
        <div className="flex items-center gap-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
      <div className="flex flex-col justify-between h-full w-full ">
        <div className="w-full overflow-y-scroll flex flex-col gap-4 p-4">
          {messages.map((message) => {
            console.log(message);
            return (
              <Message
                key={crypto.randomUUID()}
                text={message.content}
                userImg={message.userImg}
                username={message.username}
                variant={user?.id === message.userId ? "primary" : "secondary"}
              />
            );
          })}
          <div ref={scrollBottom}></div>
        </div>
        <div className="py-10 w-full flex place-content-end">
          <Form />
        </div>
      </div>
    </main>
  );
};

export default ChatComponent;
