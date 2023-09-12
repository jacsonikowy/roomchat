"use client";
import React, { HTMLAttributes, useState } from "react";
import { Icons } from "./Icons";
import { postData } from "@/lib/postData";
import { useRef } from "react";
import * as z from "zod";
import axios from "axios";

interface IForm extends HTMLAttributes<HTMLFormElement> {}

interface IData {
  content: string;
  id: number;
  username: string;
  userImg: string;
}

const validationSchema = z.object({
  message: z.string().nonempty("Message cannot be empty"),
});

const Form: React.FC<IForm> = ({ ...props }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [message, setMessage] = useState("");

  const handleSend = (messageToSend: string) => {
    axios.post("/api/message/send", { message: messageToSend });
  };

  return (
    <form
      className="flex items-center gap-3 w-full"
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault();
        handleSend(message);
      }}
      {...props}
    >
      <input
        className="rounded-2xl bg-slate-100 p-4 w-full"
        type="text"
        name="message"
        placeholder="Type here something"
        onChange={(e) => {
          setMessage(e.currentTarget.value);
        }}
      />
      <button type="submit">
        <Icons.send />
      </button>
    </form>
  );
};

export default Form;
