"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaDiscord } from "react-icons/fa";

const SignInForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const submitEmail = async () => {
    setLoading(true);
    const res = await signIn("discord");
    console.log(res);
    if (res?.error) {
      setLoading(false);
      router.push("/error")
    } else {
      setLoading(false);
    }
  };
  return (
    <div className="w-[20rem]">
      <div className="mb-5 text-xl font-bold">BDSM ECOMMERCE </div>
      <Button className="w-full" onClick={submitEmail}>
        {loading ? (
          <AiOutlineLoading3Quarters className="animate-spin" />
        ) : (
          <div className="flex items-center">
            Sign in with Discord <FaDiscord className="ml-3" />
          </div>
        )}
      </Button>
    </div>
  );
};

export default SignInForm;
