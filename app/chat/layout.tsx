"use client";
import React from "react";
import { useUser } from "@clerk/nextjs";

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();

  if (!user) {
    return <div>laoding</div>;
  }

  return <>{children}</>;
};

export default ChatLayout;
