import { getServerAuthSession } from "@/server/auth";
import SignInForm from "./_components/sign_in_form";
import { redirect } from "next/navigation";
import React from "react";

const LoginPage = async () => {
  const session = await getServerAuthSession();
  if (!session) {
    return (
      <>
        <div className="flex h-screen items-center justify-center">
          <SignInForm />
        </div>
      </>
    );
  } else {
    redirect("/");
  }
};

export default LoginPage;
