import React from "react";
import "./header.css";

import Nav from "../nav/nav";
import HeroSection from "../main/hero";

export default function Header() {
  return (
    <header>
      <Nav />
      <HeroSection />
    </header>
  );
}
