import { prisma } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { currentUser } from "@clerk/nextjs";
import { NextRequest } from "next/server";
import * as z from "zod";

interface IData {
  content: string;
  id: number;
  username: string;
  userImg: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message } = body;

    const validationSchema = z.string().nonempty("Message cannot be empty");

    const validatedMessage = validationSchema.parse(message);

    const user = await currentUser();

    const prismaMessage = await prisma.message.create({
      data: {
        content: validatedMessage,
        userId: user?.id as string,
        userImg: user?.imageUrl as string,
        username: user?.username as string,
      },
    });

    await pusherServer.trigger("message", "new-message", prismaMessage);

    return new Response("OK");
  } catch {
    return new Response("Internal server error", { status: 500 });
  }
}
