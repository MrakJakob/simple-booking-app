import React from "react";
import "./TerminCard.css";

type TerminProps = {
  termin: string;
  index: number;
  selectedTermin: number;
  setSelectedTermin: React.Dispatch<React.SetStateAction<number>>;
};

export const TerminCard = ({
  termin,
  index,
  selectedTermin,
  setSelectedTermin,
}: TerminProps) => {
  return (
    <div
      className={
        selectedTermin == index ? "termin_card selected" : "termin_card"
      }
      onClick={() => setSelectedTermin(index)}
    >
      {termin}
    </div>
  );
};
