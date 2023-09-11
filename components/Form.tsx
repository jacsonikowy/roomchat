"use client";
import React, { HTMLAttributes } from "react";
import { Icons } from "./Icons";
import { postData } from "@/lib/postData";
import { useRef } from "react";
import * as z from "zod";

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
  return (
    <form
      className="flex items-center gap-3 w-full"
      action={async (formData) => {
        const newMessage = {
          message: formData.get("message"),
        };
        const result = validationSchema.safeParse(newMessage);

        if (!result.success) {
          console.log(result.error.issues[0].message);
          return;
        }

        await postData(formData);
        formRef.current?.reset();
      }}
      ref={formRef}
      onSubmit={() => {}}
      {...props}
    >
      <input
        className="rounded-2xl bg-slate-100 p-4 w-full"
        type="text"
        name="message"
        placeholder="Type here something"
      />
      <button type="submit">
        <Icons.send />
      </button>
    </form>
  );
};

export default Form;
