import { SignIn, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();
  if (user) {
    redirect("/chat");
  }

  return (
    <main className="p-10 w-full h-screen">
      <div>
        <h1 className="text-4xl font-bold">
          Room<span className="text-[#00b086]">chat</span>
        </h1>
      </div>
      <div className="h-[calc(100%-50px)] grid place-content-center">
        <SignIn afterSignInUrl={"/chat"} />
      </div>
    </main>
  );
}
