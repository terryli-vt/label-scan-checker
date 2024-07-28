import React from "react";
import { useTranslation } from "react-i18next";

// use rest operator to get other properties in props
const Input = ({ name, label, error, ...rest }) => {
  const { t } = useTranslation();
  return (
    <div className="form-group my-4">
      <label htmlFor={name}>{t(label)}</label>
      <input
        /* 
        The rest operator here is equivalent to:

        value={value}
        onChange={onChange}
        type={type} 

        With this change, if you want to pass additional attributes, 
        we don't have to come back here and extract that parameter.
        We automatically set any other attributes that are in props
        */
        {...rest}
        name={name}
        id={name}
        className="form-control"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};
export default Input;
