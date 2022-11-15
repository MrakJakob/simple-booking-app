import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
  UserCredential,
} from "firebase/auth";
import { createUserDocument } from "../hooks/useFirestore";

interface AuthContextValue {
  currentUser: User | null | undefined;
  signup: (
    email: string,
    password: string,
    name: string
  ) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
}

// We explicitly allow `undefined` as a potential value here
// to tell the compiler we plan to deal with it.
const AuthContext = React.createContext<AuthContextValue | undefined>(
  undefined
);

export const useAuth = () => {
  const context = useContext(AuthContext);
  // If context is undefined, we know we used the hook
  // outside of our provider so we can throw a more helpful
  // error!
  if (context === undefined) {
    throw Error(
      "Auth context is undefined. Make sure you use the useAuth hook inside the AuthProvider"
    );
  }
  return context;
};

export const AuthProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<User | null>();
  const [loading, setLoading] = useState(true);

  const signup = async (email: string, password: string, name: string) => {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    //console.log("creating user");

    await createUserDocument(
      { uid: data.user.uid, email: data.user.email },
      { name: name }
    );
    // console.log("user created");
    return data;
  };

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return auth.signOut();
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe; // unsubscribe from onAuthStateChanged listener when component unmounts
  }, []);

  const value: AuthContextValue = { currentUser, signup, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
