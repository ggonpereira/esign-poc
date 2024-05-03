import { createContext, useCallback, useState } from "react";

export interface UserProviderProps {
  children: React.ReactNode;
}

export interface State {
  usersList: User[];
  user: User | null;
  toggleUser: (userId: number) => void;
}

export const UserContext = createContext({} as State);

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const users = [
  {
    id: 1,
    name: "John Doe",
    email: "gabriel.goncalves+johndoe@flatironsdevelopment.com",
    role: "spouse",
  },
  {
    id: 2,
    name: "Janny Doe",
    email: "gabriel.goncalves+jannydoe@flatironsdevelopment.com",
    role: "spouse",
  },
  {
    id: 3,
    name: "Walter White",
    email: "gabriel.goncalves+walterwhite@flatironsdevelopment.com",
    role: "professional",
  },
];

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(users[0]);

  const toggleUser = useCallback((userId: number) => {
    const selectedUser = users.find((user) => user.id === userId);

    if (selectedUser) {
      setUser(selectedUser);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        toggleUser,
        user,
        usersList: users,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
