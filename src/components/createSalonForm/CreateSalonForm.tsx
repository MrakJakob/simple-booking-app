import React, { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { createSalonDocument } from "../../hooks/useFirestore";
import "./CreateSalonForm.css";

const termin = ["10:00", "10:30", "11:00", "11:30", "12:00"];

type CreateSalonProps = {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CreateSalonForm = ({ setOpenModal }: CreateSalonProps) => {
  const salonNameRef = useRef(null);
  const salonEmailRef = useRef(null);
  const salonServiceRef = useRef(null);
  const salonTerminRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { currentUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      salonNameRef.current !== null &&
      salonEmailRef.current !== null &&
      salonServiceRef.current !== null &&
      salonTerminRef.current !== null &&
      salonNameRef.current["value"] !== "" &&
      salonEmailRef.current["value"] !== "" &&
      salonServiceRef.current["value"] !== "" &&
      salonTerminRef.current["value"] !== ""
    ) {
      // console.log("submitting form");

      if (currentUser?.uid !== undefined) {
        try {
          setError("");
          setLoading(true);
          const salon = {
            name: salonNameRef.current["value"],
            email: salonEmailRef.current["value"],
            ownerId: currentUser?.uid,
            services: [salonServiceRef.current["value"]],
            timetable: termin,
            apointments: [],
          };

          await createSalonDocument(salon);
          setOpenModal(false);
        } catch (error) {
          setError("Failed to create a salon");
        }
        setLoading(false);
      } else {
        setError("You must be logged in to create a salon");
      }
    } else {
      setError("Fill out all fields");
    }
  };

  return (
    <div className="form_container">
      <form className="create_salon_form" onSubmit={handleSubmit}>
        <h2 className="form_title">Create your own Salon booking page!</h2>
        {error && <p className="signup_error">{error}</p>}
        <div className="input_container">
          <div className="form_field_title">Salon name</div>
          <input
            className="input_salon"
            type="salon_name"
            ref={salonNameRef}
          ></input>
        </div>
        <div className="input_container">
          <div className="form_field_title">Salon email</div>
          <input
            className="input_salon"
            type="salon_email"
            ref={salonEmailRef}
          ></input>
        </div>
        <div className="input_container">
          <div className="form_field_title">Salon service (demo)</div>
          <input
            className="input_salon"
            type="salon_service"
            value="Haircut"
            ref={salonServiceRef}
            disabled
          ></input>
        </div>
        <div className="input_container">
          <div className="form_field_title">Salon termines (demo)</div>
          <input
            className="input_salon"
            type="salon_termines"
            value={termin}
            ref={salonTerminRef}
            disabled
          ></input>
        </div>
        <div className="button_container">
          <button
            className="cancel_button"
            type="reset"
            onClick={() => setOpenModal(false)}
          >
            Cancel
          </button>
          <button
            className="create_salon_button"
            type="submit"
            disabled={loading}
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};
