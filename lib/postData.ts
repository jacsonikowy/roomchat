"use server";
import { currentUser } from "@clerk/nextjs";
import { prisma } from "./db";
import Pusher from "pusher";

export const postData = async (formData: FormData) => {
  "use server";
  const message = formData.get("message");
  const user = await currentUser();

  const prismaMessage = await prisma.message.create({
    data: {
      content: message as string,
      userImg: user?.imageUrl as string,
      username: user?.username || (user?.firstName as string),
      userId: user?.id as string,
    },
  });

  const pusher = new Pusher({
    appId: process.env.APP_ID!,
    key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
    secret: process.env.SECRET!,
    cluster: process.env.CLUSTER!,
    useTLS: true,
  });

  await pusher.trigger("message", "new-message", prismaMessage);
};
