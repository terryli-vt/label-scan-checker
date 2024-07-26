import React from "react";
import Counter from "./counter";
import { useTranslation } from "react-i18next";

function Counters(props) {
  const { counters, onIncrement, onDecrement } = props;
  const { t } = useTranslation();

  return (
    <div>
      {counters.map((counter) => (
        <div key={counter.id} className="d-flex justify-content-between">
          <h1>{t(counter.label)}</h1>
          <Counter
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            counter={counter}
          />
        </div>
      ))}
    </div>
  );
}
export default Counters;
