import React from "react";
import { SalonType } from "../../types/SalonType";
import "./Salon.css";
import salonImage from "../../assets/images/hairdresser.webp";

type SalonProps = {
  salon: SalonType;
  onClick: (salon: SalonType) => void;
};

export const Salon = ({ salon, onClick }: SalonProps) => {
  return (
    <div className="salon_container" onClick={() => onClick(salon)}>
      <div className="salon_img_container">
        <img src={salonImage} alt="hairdresser" className="img" />
      </div>
      <div className="salon_data">
        <div className="salon_field">
          <span className="salon_name">{salon.name}</span>
        </div>
        <div className="salon_field">Services: {salon.services}</div>
      </div>
    </div>
  );
};
