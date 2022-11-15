import React, { useEffect, useState } from "react";
import "./Profile.css";
import { CgProfile } from "react-icons/cg";
import { Apointments } from "../apointments/Apointments";
import { MySalons } from "../mySalons/MySalons";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import { UserType } from "../../types/UserType";
import { CreateSalonForm } from "../createSalonForm/CreateSalonForm";
import { getUserDocument } from "../../hooks/useFirestore";

const getUserData = async (uid: string) => {
  // console.log("get user data");
  try {
    const user = await getUserDocument(uid);
    return user;
  } catch (error) {
    console.log("Firestore: Error getting user", error);
    return null;
  }
};

export const Profile = () => {
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [user, setUser] = useState<UserType>();
  const [page, setPage] = useState(
    user ? <Apointments entityId={user.uid} entity={"user"} /> : null
  );
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser?.uid !== undefined) {
      getUserData(currentUser.uid).then((user) => {
        if (user !== null && user !== undefined) {
          setUser(user);
          setPage(<Apointments entityId={user.uid} entity={"user"} />);
        } else {
          setError("User not found");
        }
      });
    } else {
      setUser(undefined);
    }
    // console.log("App.tsx: useEffect");
  }, []);

  const handleLogout = async () => {
    setError("");
    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
      alert(error);
    }
  };

  return (
    <div className="profile_container">
      <div className="first_half"></div>
      {!openModal ? (
        <div className="second_half">
          <div className="avatar_container">
            <CgProfile className="avatar" />
          </div>
          <div className="data_container">
            <div className="data_element">
              <div className="data_element_title">
                Name: <span className="info">{user?.name}</span>
              </div>

              <button className="log_out" onClick={handleLogout}>
                Log Out
              </button>
            </div>
            <div className="data_element">
              <div className="data_element_title">
                Email: <span className="info">{user?.email}</span>
              </div>
            </div>
          </div>
          <div className="profile_menu">
            <div
              className="profile_menu_element"
              onClick={() =>
                setPage(<Apointments entity="user" entityId={user!.uid} />)
              }
            >
              My apointments
            </div>
            <div
              className="profile_menu_element"
              onClick={() => setPage(<MySalons setOpenModal={setOpenModal} />)}
            >
              My salons
            </div>
          </div>
          <div className="page">{page && page}</div>
        </div>
      ) : (
        <CreateSalonForm setOpenModal={setOpenModal} />
      )}
    </div>
  );
};
