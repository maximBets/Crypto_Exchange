import React, { useEffect, useRef, useState } from "react";
import { ICurrencyList } from "../MainPage/types/list";
import { ReactComponent as DropDownImg } from "../../assets/icon/Vector.svg";
import styles from "./CurrencyInput.module.css";
import OptionList from "./Components/OptionList";
import { classNames } from "../../helpers/className";

interface ICurrencyInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  selectedOption: ICurrencyList | null;
  onOptionChange: (option: ICurrencyList) => void;
  оnChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  options: ICurrencyList[];
}

const CustomSelectInput = ({
  value,
  selectedOption,
  onOptionChange,
  оnChange,
  options,
  className,
  ...otherProps
}: ICurrencyInputProps) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const selectBoxRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (option: ICurrencyList) => {
    onOptionChange(option);
    setShowOptions(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      selectBoxRef.current &&
      !selectBoxRef.current.contains(event.target as Node)
    ) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={classNames(styles.customSelectInput, {}, [className])}>
      <input type='text' value={value} onChange={оnChange} {...otherProps} />
      <div
        className={styles.selectBox}
        ref={selectBoxRef}
        onClick={() => setShowOptions(!showOptions)}
      >
        <div className={styles.wrapperCryptocurrency}>
          <img
            src={selectedOption?.image}
            alt={selectedOption?.ticker}
            className={styles.imgCryptocurrency}
          />
          <span className={styles.ticker}>
            {selectedOption?.ticker.toUpperCase()}
          </span>
        </div>
        <DropDownImg />
        <OptionList
          options={options}
          onOptionClick={handleOptionClick}
          showOptions={showOptions}
        />
      </div>
    </div>
  );
};

export default React.memo(CustomSelectInput);
