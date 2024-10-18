import React from "react";
import "./header.css";

import Nav from "../nav/nav";

import { ReactComponent as LittleLemonLogo } from "../../assets/logo/Logo.svg";

export default function Header() {
  return (
    <header>
      <LittleLemonLogo />
      <Nav />
    </header>
  );
}
