"use client";

import { useUser, ClerkLoaded, SignInButton, UserButton, SignedIn} from "@clerk/nextjs"; // Added ClerkLoaded
import Link from "next/link";
import Form from "next/form";
import Image from "next/image";
import { TiShoppingCart } from "react-icons/ti";
import { GoPackage } from "react-icons/go";

function Header() {
  const { user } = useUser();

  const createClerkPassKey=async()=>{

  };

  console.log(user);
  return (
    <header className="flex flex-wrap justify-between items-center px-4 py-2 bg-emerald-700">
      {/* Top Row */}
      <div className="flex w-full flex-wrap justify-between items-center">
       <Link href="#TOP">
       <Image
            src="/assets/logo.png" 
            alt="EcoCart Logo"
            width={100} 
            height={50} 
            className="mx-auto sm:mx-0 " 
          />
        </Link>
        <Form action="/search" className="w-full sm:w-auto sm:flex-1 sm:mx-4 mt-2 sm:mt-0 mr-1">
          <input
            type="text"
            name="query"
            placeholder="Search For Products"
            className="bg-gray-100 text-gray-800 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-50 focus:ring-opacity-50 border w-full max-w-4xl"
          />
        </Form>

        <div className="flex items-center space-x-4 mt-4 sm:mt-0 flex-1 sm:flex-none">
          <Link
            href="/Cart"
            className="flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-emerald-700 hover:bg-green-300 text-white font-bold py-2 px-4 rounded"
          >
            <TiShoppingCart className="w-6 h-6" />
            {/* Span items count once global state implemented */}
            <span>My Cart</span>
          </Link>

          {/* User Area */}
          <ClerkLoaded>
            <SignedIn>
           
              <Link
                href="/orders"
                className="flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-emerald-700 hover:bg-green-300 text-white font-bold py-2 px-4 rounded"
              >
                <GoPackage className="w-6 h-6" /> {/* Replaced PackageIcon with a suitable icon */}
                <span>My Orders</span>
              </Link>
            </SignedIn>

            {user ? (
            <div className="flex items-center space-x-2">
             <UserButton/>
                <div className="hidden sm:block text-xs">
                    <p className="text-white">Welcome back</p>
                    <p className="font-bold text-white">{user.fullName}!</p>
                </div>
            </div>
            ):(
                <SignInButton mode="modal" className="text-white" />
            )}
             {user ?.passkeys.length===0 && (
                <button
                    onClick={createClerkPassKey} className="bg-white hover:bg-green-400 hover:text-white animate-pulse text-green-500 font-bold py-2 px-4 rounded border-green-300 border">
                        Create A Passkey Now!
                    </button>
            )}
          </ClerkLoaded>
        </div>
      </div>
    </header>
  );
}

export default Header;