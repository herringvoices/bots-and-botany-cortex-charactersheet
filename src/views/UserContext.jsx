// UserContext.jsx
import React, { createContext, useState, useEffect } from "react"; // Import React hooks and createContext
import { onAuthStateChanged, signOut } from "firebase/auth"; // Import Firebase functions
import { auth } from "../firebase-config"; // Firebase configuration

// Create a context to manage user authentication state
export const UserContext = createContext();

// Create a provider component to wrap around your app and share user state
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // State to store the logged-in user

  // Effect to listen for authentication state changes
  useEffect(() => {
    // Firebase function to track user login/logout status
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // If a user is logged in, update the state with minimal details
        setUser({
          id: currentUser.uid, // Use Firebase UID as the unique ID
          username: currentUser.displayName || "NewUser", // Use displayName or a default value
        });
      } else {
        // If no user is logged in, clear the state
        setUser(null);
      }
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []); // Empty dependency array means this runs once when the component mounts

  // Function to log out the user
  const logout = async () => {
    try {
      await signOut(auth); // Call Firebase's signOut function
      setUser(null); // Clear the user state on successful logout
    } catch (error) {
      console.error("Error logging out:", error.message); // Handle logout errors
    }
  };

  // Provide user state and logout function to child components
  return (
    <UserContext.Provider value={{ user, logout }}>
      {children}
    </UserContext.Provider>
  );
};
