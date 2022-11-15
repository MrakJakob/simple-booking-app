import React, { useEffect, useState } from "react";
import {
  getSalonApointments,
  getUserApointments,
} from "../../hooks/useFirestore";
import { AppointmentType } from "../../types/ApointmentType";
import { Apointment } from "../apointment/Apointment";
import "./Apointments.css";

type AppointmentsProps = {
  entityId: string;
  entity: "salon" | "user";
};

const getApointmentData = async (uid: string, entity: string) => {
  // console.log("get apointment data");
  try {
    const apointments =
      entity === "user"
        ? await getUserApointments(uid)
        : await getSalonApointments(uid);
    return apointments;
  } catch (error) {
    console.log("Firestore: Error getting apointments", error);
    return null;
  }
};

export const Apointments = ({ entityId, entity }: AppointmentsProps) => {
  const [apointments, setApointments] = useState<AppointmentType[]>([]);

  // get users apointments from firestore
  useEffect(() => {
    // console.log("Apointments.tsx: useEffect");
    if (entityId !== null && entityId !== undefined) {
      getApointmentData(entityId, entity).then((apointmentsData) => {
        if (apointmentsData !== null && apointmentsData !== undefined) {
          setApointments(apointmentsData);
        } else {
          alert("apointments not found");
        }
      });
    } else {
      alert("No user id");
    }
  }, []);

  return (
    <div className="apointments">
      {apointments && apointments.length > 0 ? (
        apointments.map((apointment, index) => (
          <Apointment
            key={index}
            salonId={apointment.salonId}
            userId={apointment.userId}
            termin={apointment.termin}
            odd={index % 2 === 0}
            entity={entity}
          />
        ))
      ) : (
        <div className="info_msg">You have no apointments</div>
      )}
    </div>
  );
};
