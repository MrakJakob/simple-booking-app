import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { getUsersSalons } from "../../hooks/useFirestore";
import { SalonType } from "../../types/SalonType";
import { Salon } from "../salon/Salon";
import "./MySalons.css";

type MySalonsProps = {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const MySalons = ({ setOpenModal }: MySalonsProps) => {
  const [salons, setSalons] = useState<SalonType[]>();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser?.uid !== undefined) {
      getUsersSalons(currentUser.uid).then((salonsData) => {
        if (salonsData !== null) {
          setSalons(salonsData);
        }
      });
    }
  }, []);

  const handleSalonClick = (salon: SalonType) => {
    navigate(`/salon/${salon.id}`);
  };

  return (
    <div className="salons_container">
      {salons && salons.length > 0 ? (
        salons.map((salon: any) => (
          <Salon salon={salon} key={salon.id} onClick={handleSalonClick} />
        ))
      ) : (
        <div className="info_msg">You have no salons</div>
      )}
      <button className="create_button" onClick={() => setOpenModal(true)}>
        Create a salon
      </button>
    </div>
  );
};
