import { UserResource } from "@clerk/types";
import Image from "next/image";
import React from "react";

const Message = ({
  variant,
  userImg,
  username,
  text,
}: {
  variant: "primary" | "secondary";
  userImg: string;
  username: string;
  text: string;
}) => {
  if (variant === "secondary") {
    return (
      <div className="flex items-center gap-4">
        <Image
          className="rounded-full"
          width={40}
          height={40}
          alt="someguy"
          src={userImg}
        />
        <div className="rounded-full text-black bg-slate-200 p-4">
          <p className="text-sm">{text}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-4 justify-end">
      <div className="rounded-full text-black bg-slate-200 p-4">
        <p className="text-sm">{text}</p>
      </div>
      <Image
        className="rounded-full"
        width={40}
        height={40}
        alt="someguy"
        src={userImg}
      />
    </div>
  );
};

export default Message;
