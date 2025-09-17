'use client';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
    setIsOpen(false); // close mobile menu after navigation
  };

  return (
    <header className="bg-white shadow py-4 px-6 md:px-12">
      <div className="flex justify-between items-center">
        <h1
          className="text-2xl font-bold text-blue-600 cursor-pointer"
          onClick={() => handleNavigate('/')}
        >
          ReduceSize
        </h1>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <button
            type="button"
            className="text-gray-700 hover:text-blue-600 transition"
            onClick={() => handleNavigate('/blog')}
          >
            Blog
          </button>
          <button
            type="button"
            className="text-gray-700 hover:text-blue-600 transition"
            onClick={() => handleNavigate('/faq')}
          >
            FAQ
          </button>
          <button
            type="button"
            className="text-gray-700 hover:text-blue-600 transition"
            onClick={() => handleNavigate('/login')}
          >
            Login
          </button>
          <button
            type="button"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            onClick={() => handleNavigate('/signup')}
          >
            Sign Up
          </button>
        </nav>

        {/* Mobile Hamburger */}
        <button
          type="button"
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden mt-4 flex flex-col gap-3 bg-gray-50 p-4 rounded-lg shadow">
          <button
            type="button"
            className="text-gray-700 hover:text-blue-600 w-full text-left transition"
            onClick={() => handleNavigate('/blog')}
          >
            Blog
          </button>
          <button
            type="button"
            className="text-gray-700 hover:text-blue-600 w-full text-left transition"
            onClick={() => handleNavigate('/faq')}
          >
            FAQ
          </button>
          <button
            type="button"
            className="text-gray-700 hover:text-blue-600 w-full text-left transition"
            onClick={() => handleNavigate('/login')}
          >
            Login
          </button>
          <button
            type="button"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full text-center"
            onClick={() => handleNavigate('/signup')}
          >
            Sign Up
          </button>
        </nav>
      )}
    </header>
  );
}
