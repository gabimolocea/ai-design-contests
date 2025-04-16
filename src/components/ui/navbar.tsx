"use client"

import Link from "next/link"
import { useState } from "react";
import { AuthModal } from '@/components/auth-modal'

export function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    console.log("closeModal called"); // Debug log
    setIsModalOpen(false);
  };

  return (
    <header className="top-0 z-50 w-full">
      <div className="flex h-16 items-center justify-between px-4 w-full mx-auto">
        {/* Left side - Logo */}
        <Link href="/" className="text-xl font-bold">
          Zignative
        </Link>

        {/* Right side - Actions */}
        <div className="flex items-center gap-4">
          <Link href="/contests" className="text-sm font-medium hover:text-primary">
            Explore Contests
          </Link>
          {!isModalOpen && (
            <AuthModal closeModal={() => console.log('Modal closed')} />
          )}
        
    
        </div>
      </div>
    </header>
  )
}


//{isModalOpen && <AuthModal closeModal={closeModal} />}
//<AuthModal closeModal={openModal}/>
