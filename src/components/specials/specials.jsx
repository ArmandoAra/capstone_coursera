import React from "react";
import "./specials.css";

//Components
import CustomButton from "../buttons/customButton";
import SpecialCard from "./card/specialCard";

//Data
import { specialsData } from "../../data/constants";

const Specials = () => {
  return (
    <section>
      <div className="special-title-container">
        <span />
        <h2 className="special-title">This Weeks Specials!</h2>
        <span />
        <CustomButton
          title="Online Menu"
          background="#f4ce14"
          onClick={() => console.log("Online Menu")}
        />
        <span />
      </div>

      <div className="specials-cards-container">
        <span />
        {specialsData.map((special) => (
          <SpecialCard
            key={special.id}
            image={special.image}
            title={special.title}
            price={special.price}
            text={special.text}
          />
        ))}
        <span />
      </div>
    </section>
  );
};

export default Specials;
