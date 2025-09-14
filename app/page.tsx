import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import MaxWithWrapper from "@/components/MaxWithWrapper copy";
import {
 SignInButton,
  
} from "@clerk/nextjs";


export default function Home() {
  return (
    <div className="min-h-screen pt-10 bg-black text-white">
      {/* Fixed Navbar */}
      <NavBar />

      {/* Hero Section */}
      <MaxWithWrapper className="pt-28 mb-12 flex flex-col justify-center items-center">
        <div>
          <button className="w-[230px] bg-gray-900 h-10 shadow rounded-2xl font-semibold text-blue-400">
            Convex is now live!
          </button>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-center mt-8 mb-4 text-white">
          Converse with your <span className="text-blue-400">documents</span>{" "}
          instantly.
        </h1>

        <p className="text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-xl xl:text-2xl text-center mb-8">
          Convex lets you chat with any document, find answers, and unlock
          insights in seconds. Powered by AI, designed for everyone.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <SignInButton mode="modal" >
            <button className="w-[220px] bg-blue-600 h-11 shadow rounded-xl font-semibold text-white hover:bg-blue-700 transition duration-300 flex items-center justify-center gap-2">
              Try Convex
              <FaLongArrowAltRight />
            </button>
          </SignInButton>

        </div>
      </MaxWithWrapper>

      {/* Dashboard Preview */}
      <div className="w-full flex justify-center mb-8">
        <div className="rounded-2xl m-2 overflow-hidden shadow-lg bg-gray-900">
          <Image
            src="/dashboard-preview.jpg"
            alt="Convex Dashboard Preview"
            width={900}
            height={500}
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Why Convex Section */}
      <MaxWithWrapper className="mb-16 mt-20">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center mb-4 text-white">
          Why Convex?
        </h2>
        <p className="text-gray-300 text-lg sm:text-xl md:text-2xl text-center mb-8">
          Convex transforms how you work with documents. Ask questions,
          summarize, and extract data with ease. No more endless scrolling—just
          instant answers.
        </p>
      </MaxWithWrapper>

      {/* Steps */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-start text-left">
            <hr className="mb-6 border-blue-600 w-1/2 self-start" />
            <h1 className="text-blue-400 font-bold text-xl mb-2">Step 1</h1>
            <p className="text-2xl lg:text-xl xl:text-2xl font-bold mb-2 text-white">
              Create your free account
            </p>
            <p className="text-gray-300">
              Get started with Convex for free or upgrade for advanced features.{" "}
              <Link href="/pricing" className="text-blue-400 hover:underline">
                See plans
              </Link>
            </p>
          </div>

          <div className="flex flex-col items-start text-left">
            <hr className="mb-6 border-blue-700 w-1/2 self-start" />
            <h1 className="text-blue-400 font-bold text-xl mb-2">Step 2</h1>
            <p className="text-2xl lg:text-xl xl:text-2xl font-bold mb-2 text-white">
              Upload your document
            </p>
            <p className="text-gray-300">
              Convex processes your file and prepares it for instant
              conversation.
            </p>
          </div>

          <div className="flex flex-col items-start text-left">
            <hr className="mb-6 border-blue-700 w-1/2 self-start" />
            <h1 className="text-blue-400 font-bold text-xl mb-2">Step 3</h1>
            <p className="text-2xl lg:text-xl xl:text-2xl font-bold mb-2 text-white">
              Start chatting
            </p>
            <p className="text-gray-300">
              Ask questions, get summaries, and discover insights—right from
              your document.
            </p>
          </div>
        </div>
      </div>

      {/* File Upload Preview */}
      <div className="w-full flex justify-center mt-20 mb-8">
        <div className="rounded-2xl m-2 overflow-hidden shadow-lg bg-gray-900">
          <div className="relative w-full rounded-2xl p-3">
            <Image
              src="/file-upload-preview.jpg"
              alt="Convex File Upload Preview"
              width={900}
              height={500}
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
