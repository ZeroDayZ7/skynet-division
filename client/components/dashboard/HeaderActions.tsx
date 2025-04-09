"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Notifications from "@/components/notification/Notification";
import LogoutDialog from "@/components/auth/LogoutDialog";
import { ModeToggle } from "../theme/theme-button";

import { FaSpinner } from "react-icons/fa";

export default function HeaderActions() {
  // const router = useRouter();
  // const [isLoading, setIsLoading] = useState<boolean>(false);


  //   if (isLoading) {
  //     return (
  //       <div className="flex justify-center items-center min-h-screen">
  //         <FaSpinner className="text-4xl text-blue-500 animate-spin" />
  //       </div>
  //     );
  //   }

  return (
      <div className="flex">
          <Notifications />
          <ModeToggle />
          <LogoutDialog />
      </div>
  );
}
