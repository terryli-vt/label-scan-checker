import React from "react";
import { useTranslation } from "react-i18next";

const SearchBox = ({ value, onChange }) => {
  const { t } = useTranslation();

  return (
    <input
      type="text"
      name="query"
      className="form-control m-3"
      placeholder={t("search")}
      value={value}
      onChange={(e) =>
        /* retrieves the current value of the input field */
        onChange(e.currentTarget.value)
      }
    />
  );
};

export default SearchBox;
