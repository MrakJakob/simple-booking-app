import React, { useEffect, useState } from "react";
import { getSalonDocument, getUserDocument } from "../../hooks/useFirestore";
import "./Apointment.css";

type ApointmentProps = {
  salonId: string;
  userId: string;
  termin: string;
  odd: boolean;
  entity: "salon" | "user";
};

const getSalonData = async (salonId: string) => {
  // console.log("get salon data");
  try {
    const salon = await getSalonDocument(salonId);
    return salon;
  } catch (error) {
    console.log("Firestore: Error getting salon", error);
    return null;
  }
};

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

export const Apointment = ({
  salonId,
  userId,
  termin,
  odd,
  entity,
}: ApointmentProps) => {
  const [name, setName] = useState("");

  // get salon data
  useEffect(() => {
    // console.log("Apointment.tsx: useEffect");
    if (entity === "user") {
      getSalonData(salonId).then((salonData) => {
        if (salonData !== null && salonData !== undefined) {
          setName(salonData.name);
        } else {
          alert("salon not found");
        }
      });
    } else {
      getUserData(userId).then((userData) => {
        if (userData !== null && userData !== undefined) {
          setName(userData.name);
        } else {
          alert("user not found");
        }
      });
    }
  }, []);

  return (
    <div className={odd ? "apointment_container gray" : "apointment_container"}>
      <div className="apointment_field">{name}</div>
      <div className="apointment_field">{termin}</div>
    </div>
  );
};
