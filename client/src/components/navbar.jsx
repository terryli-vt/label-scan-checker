import React from "react";
import Logo from "../images/logo.png";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import LanguageSwitcher from "./common/languageSwitcher";
import { useTranslation } from "react-i18next";

function NavBar() {
  const { t } = useTranslation();

  return (
    <nav className="navbar navbar-expand-lg bg-light d-flex justify-content-between">
      <div className="d-flex flex-row align-items-center">
        <Link to="/">
          <img src={Logo} alt="Logo" />
        </Link>
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="container-fluid">
            <h1 className="navbar-brand fs-1">{t("label_scan_checker")}</h1>
          </div>
        </Link>
      </div>
      <LanguageSwitcher />
    </nav>
  );
}
export default NavBar;
