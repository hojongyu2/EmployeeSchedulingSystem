import { createContext, useContext, useState, useEffect } from "react";

export const userContext = createContext();

export default function UserContextProvider({children}){

    const [user, setUser] = useState(null);
    console.log(user)

    const savedUserData = JSON.parse(localStorage.getItem('currentUser'))

    useEffect(() => {
        if (savedUserData) {
          setUser(savedUserData);
        } else {
          localStorage.removeItem('currentUser');
          setUser(null);
        }
      }, []);

    return (
        <userContext.Provider value={{user, setUser}}>
            {children}
        </userContext.Provider>
    )
}