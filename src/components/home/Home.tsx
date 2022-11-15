import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getAllSalons } from "../../hooks/useFirestore";
import { SalonType } from "../../types/SalonType";
import { Salon } from "../salon/Salon";
import "./Home.css";

export const Home = () => {
  const [salons, setSalons] = useState<SalonType[]>();
  const navigate = useNavigate();

  useEffect(() => {
    // console.log("useEffect");
    getAllSalons().then((salons) => {
      setSalons(salons);
    });
  }, []);

  const handleSalonClick = (salon: SalonType) => {
    // console.log(salon);
    navigate(`/salon/${salon.id}`);
  };

  return (
    <div className="home_container">
      <div className="home_title">Available salons</div>
      <div className="salons_list">
        {salons &&
          salons.map((salon: SalonType) => (
            <Salon salon={salon} key={salon.id} onClick={handleSalonClick} />
          ))}
      </div>
    </div>
  );
};
