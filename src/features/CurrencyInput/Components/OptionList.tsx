import React from "react";
import styles from "../CurrencyInput.module.css";
import { ICurrencyList } from "../../MainPage/types/list";

interface OptionListProps {
  options: ICurrencyList[];
  showOptions: boolean;
  onOptionClick: (option: ICurrencyList) => void;
}

const OptionList: React.FC<OptionListProps> = ({
  options,
  onOptionClick,
  showOptions,
}) => {
  return (
    <div
      className={`${styles.optionsContainer} ${showOptions ? styles.show : ""}`}
    >
      {options.map((option) => (
        <div
          key={option.ticker}
          className={styles.option}
          onClick={() => onOptionClick(option)}
        >
          <img loading='lazy' src={option.image} alt={option.ticker} />
          <span className={styles.ticker}>{option.ticker.toUpperCase()}</span>
          <span className={styles.nameCryptocurrency}>{option.name}</span>
        </div>
      ))}
    </div>
  );
};

export default OptionList;
