import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.post("/api/me");
      } catch (error) {
        console.log(error);
        setUser(null);
      }
    };
    fetchUser();
  });
  return <UserContext.Provider values={user}>{children}</UserContext.Provider>;
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
