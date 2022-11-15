import React, { useEffect, useState } from "react";
import "./SalonPage.css";
import image from "../../assets/images/hairdresser.webp";
import { useParams } from "react-router";
import { SalonType } from "../../types/SalonType";
import { TerminCard } from "../terminCard/TerminCard";
import { useAuth } from "../../context/AuthContext";
import {
  createAnApointment,
  getSalonDocument,
  updateSalonsTimeTable,
} from "../../hooks/useFirestore";
import { Apointments } from "../apointments/Apointments";

const getSalonData = async (id: string) => {
  // console.log("get salon data");
  try {
    const salon = await getSalonDocument(id);
    return salon;
  } catch (error) {
    console.log("Firestore: Error getting salon", error);
    return null;
  }
};

export const SalonPage = () => {
  const { currentUser } = useAuth();
  const [selectedTermin, setSelectedTermin] = useState(-1);
  const [timetableUpdated, setTimetableUpdated] = useState(false);
  const [salon, setSalon] = useState<SalonType>();
  const { id } = useParams();

  useEffect(() => {
    // This useEffect is called when the component is mounted and timeTableUpdated is changed
    // get salon from firestore
    // console.log("SalonPage.tsx: useEffect");
    if (id) {
      getSalonData(id).then((salonData) => {
        if (salonData !== null && salonData !== undefined) {
          setSalon(salonData);
        } else {
          alert("salon not found");
        }
      });
    } else {
      alert("No salon id");
    }
  }, [timetableUpdated]);

  const handleClick = async () => {
    if (selectedTermin === -1) {
      alert("Please select a termin");
    } else {
      if (currentUser && salon) {
        const res = await createAnApointment(
          currentUser.uid,
          salon.id,
          salon.timetable[selectedTermin]
        );
        if (res) {
          await updateSalonsTimeTable(
            salon.id,
            salon.timetable[selectedTermin]
          );
          setTimetableUpdated(!timetableUpdated);
          alert("Termin booked");
        } else {
          alert("Termin not booked, something went wrong");
        }
      }
    }
  };

  return (
    <>
      {salon ? (
        <div className="salon_page_container">
          <div className="salon_data_container">
            <div className="salon_img_container">
              <img src={image} alt="salon_img" className="salon_img" />
            </div>
            <div className="salon_info">
              <div className="salon_name">{salon.name}</div>
              <div className="info_element">
                <div className="var">Email:</div>
                <div className="arg">{salon.email}</div>
              </div>
              <div className="info_element">
                <div className="var">Services:</div>
                <div className="arg">{salon.services}</div>
              </div>
            </div>
          </div>
          <div className="salon_booking_container">
            {salon.ownerId !== currentUser?.uid ? (
              <>
                <div className="booking_title">Book an apointment:</div>
                <div
                  className={salon.timetable.length > 0 ? "termin_grid" : ""}
                >
                  {salon.timetable && salon.timetable.length > 0 ? (
                    salon.timetable.map((termin, index) => (
                      <TerminCard
                        termin={termin}
                        index={index}
                        setSelectedTermin={setSelectedTermin}
                        selectedTermin={selectedTermin}
                        key={index}
                      />
                    ))
                  ) : (
                    <div className="no_termine">
                      There is no termine available
                    </div>
                  )}
                </div>
                <div className="book_selected">
                  <button
                    className="book_button"
                    onClick={handleClick}
                    disabled={salon.timetable.length <= 0}
                  >
                    Book selected termin
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="booking_title">Your salons apointments:</div>
                <div className="apointments_container">
                  <Apointments entityId={salon.id} entity={"salon"} />
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};
