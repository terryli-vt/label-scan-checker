import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import Check from "../images/icon_check.svg";
import { postHistory } from "../services/historyService";
import { useTranslation } from "react-i18next";

function ScanReport() {
  const { t } = useTranslation();

  const location = useLocation();
  const [data] = useState(location.state || {});

  useEffect(() => {
    async function submit() {
      // console.log("Submitting history");
      // console.log("data: ", data);
      try {
        const date = new Date();
        const now = Date.now();
        const history = {
          partNumber: data.partNumber,
          name: data.name,
          dateStr: date.toLocaleString(),
          dateNumber: now,
          match: data[0].value,
          mismatch: data[1].value,
          unscannable: data[2].value,
        };
        // console.log("History data generated: ", history);
        await postHistory(history);
        // const response = await postHistory(history);
        // console.log("History submitted!");
        // console.log("Data returned from post:", response);
      } catch (ex) {
        console.error("Error adding history:", ex);
      }
    }

    submit();
  }, [data]);

  return (
    <div className="center-page-container" style={{ height: "20vh" }}>
      <div className="half-screen text-center">
        <img
          src={Check}
          alt="Check Icon"
          style={{ width: "7em", height: "7em", margin: "2em" }}
        />
        <h1>{t("scan_finished")}</h1>
        <h1>
          {data.name} - {data.partNumber}
        </h1>
        <br />
        <br />
        <h1>
          {t("match")}: {data[0].value}
        </h1>
        <h1>
          {t("unmatch")}: {data[1].value}
        </h1>
        <h1>
          {t("unscannable")}: {data[2].value}
        </h1>
        <br />
        <br />
        <Link
          className="btn btn-primary btn-bg"
          style={{ width: "100%", fontSize: "2em" }}
          to="/"
        >
          {t("go_to_home")}
        </Link>
      </div>
    </div>
  );
}

export default ScanReport;
