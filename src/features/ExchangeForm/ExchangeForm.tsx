import React from "react";
import styles from "./ExchangeForm.module.css";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { ICurrencyList } from "../MainPage/types/list";

interface IExchangeForm {
  selectedOptions: ICurrencyList | null;
  error: string | null;
}

const ExchangeForm = ({ selectedOptions, error }: IExchangeForm) => {
  return (
    <div className={styles.addressWrapper}>
      <label>Your {selectedOptions?.name} address</label>
      <div className={styles.exchangeInputWrapper}>
        <Input className={styles.marginInput} />
        <div className={styles.buttonWrapper}>
          <Button>
            <b>EXCHANGE</b>
          </Button>
          {error && <div className={styles.errorText}>{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default ExchangeForm;
