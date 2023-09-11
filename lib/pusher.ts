import PusherClient from "pusher-js";
import PusherServer from "pusher";

export const pusher = new PusherClient(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
  cluster: "eu",
});

export const pusherServer = new PusherServer({
  appId: process.env.APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
  secret: process.env.SECRET!,
  cluster: process.env.CLUSTER!,
  useTLS: true,
});
