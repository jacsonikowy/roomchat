import ChatComponent from "@/components/ChatComponent";
import { prisma } from "@/lib/db";
const getData = async () => {
  const data = await prisma.message.findMany({
    select: {
      content: true,
      id: true,
      username: true,
      userImg: true,
      userId: true,
    },
  });
  return data;
};

const page = async () => {
  const data = await getData();
  return <ChatComponent data={data} />;
};

export default page;
