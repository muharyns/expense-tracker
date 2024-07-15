"use client";
import Image from "next/image";
import React from "react";
import { UserButton, useUser } from "@clerk/nextjs";
function Hero() {
  const { user, isSignedIn } = useUser();
  return (
    <section className="bg-gray-50 flex items-center flex-col">
      <div
        className="mx-auto max-w-screen-xl px-4 py-32 
      lg:flex"
      >
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Manager Your Expense
            <strong className="font-extrabold text-primary sm:block">
              {" "}
              Control Your Money.{" "}
            </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed">
            Track your expenses for better saving management
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
              href={isSignedIn ? "/dashboard" : "/sign-in"}
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
      <Image
        src={"/hero.png"}
        alt="hero"
        width={500}
        height={300}
        //  className="-mt-9 rounded-xl border-2"
      />
    </section>
  );
}

export default Hero;
