import Link from "next/link";

import { CreatePost } from "@/app/_components/create-post";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/login");
  }
  return (
    <main className="w-full p-3">
     hi
    </main>
  );
}
