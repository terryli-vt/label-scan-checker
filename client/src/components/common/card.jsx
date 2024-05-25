import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import "../../styles/card.css";

const Card = ({ icon, title, description }) => {
  const { t } = useTranslation();

  return (
    <div className="card">
      <div className="card-icon">
        <FontAwesomeIcon icon={icon} size="3x" />
      </div>
      <div className="card-content">
        <h3 className="card-title">{t(title)}</h3>
        <p className="card-description">{t(description)}</p>
      </div>
    </div>
  );
};

Card.propTypes = {
  icon: PropTypes.object.isRequired, // Font Awesome class name
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Card;
