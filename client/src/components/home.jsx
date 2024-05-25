import React from "react";
import Card from "./common/card";
import { Link } from "react-router-dom";
import {
  faWarehouse,
  faBarcode,
  faClockRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/home.css";

function Home() {
  return (
    <div className="home">
      <div className="cards">
        <Link
          className="card-wrapper"
          to="/products"
          style={{ textDecoration: "none" }}
        >
          <Card
            icon={faWarehouse}
            title="products"
            description="card_products"
          />
        </Link>
        <Link
          className="card-wrapper larger-card"
          to="/products"
          style={{ textDecoration: "none" }}
        >
          <Card icon={faBarcode} title="scan" description="card_scan" />
        </Link>
        <Link
          className="card-wrapper"
          to="/history"
          style={{ textDecoration: "none" }}
        >
          <Card
            icon={faClockRotateLeft}
            title="history"
            description="card_history"
          />
        </Link>
      </div>
    </div>
  );
}

export default Home;
