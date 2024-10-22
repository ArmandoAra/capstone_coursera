import React from "react";
import "./specials.css";

//Components
import CustomButton from "../buttons/customButton";
import SpecialCard from "./card/specialCard";

//Aseets
const greekSalad = require("../../assets/images/greek salad.jpg");
const bruchetta = require("../../assets/images/Bruchetas.png");
const lemonDessert = require("../../assets/images/lemon dessert.jpg");

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
        <SpecialCard
          image={greekSalad}
          title="Greek Salad"
          price="$12.99"
          text="The famous greek salad of crispy lett uce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.  "
        />
        <SpecialCard
          image={bruchetta}
          title="Bruchetta"
          price="$5.99"
          text="Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil. "
        />
        <SpecialCard
          image={lemonDessert}
          title="Lemon Dessert"
          price="$5.00"
          text="This comes straight from grandma’s recipe book, every last ingredient has been sourced and is as authentic as can be imagined."
        />
        <span />
      </div>
    </section>
  );
};

export default Specials;
