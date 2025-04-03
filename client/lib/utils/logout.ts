// lib/logout.ts

export const logout = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_SERV;
  
    try {
      console.log(`Attempting to log out from: ${apiUrl}/api/auth/logout`);
  
      const response = await fetch(`${apiUrl}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
  
      if (response.ok) {
        console.log("Successfully logged out.");
        window.location.href = "/";
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error logging out", error);
    }
  };
  