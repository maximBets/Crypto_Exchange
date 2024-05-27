import React, { useEffect, useState, useCallback } from "react";
import { ICurrencyList } from "./types/list";
import styles from "./MainPage.module.css";
import useFetch from "../../hooks/useFetch";
import { ReactComponent as Swap } from "../../assets/icon/swap.svg";
import CurrencyInput from "../CurrencyInput/CurrencyInput";
import ExchangeForm from "../ExchangeForm/ExchangeForm";

const MainPage = () => {
  const [inputValues, setInputValues] = useState({
    valueOne: "",
    valueTwo: "",
  });
  const [selectedOptions, setSelectedOptions] = useState<{
    optionOne: ICurrencyList | null;
    optionTwo: ICurrencyList | null;
  }>({
    optionOne: null,
    optionTwo: null,
  });
  const [minAmount, setMinAmount] = useState<number | null>(null);
  const [shouldFetchExchangeAmount, setShouldFetchExchangeAmount] =
    useState(false);
  const [error, setError] = useState<string | null>(null);

  const exchangeAmountUrl =
    shouldFetchExchangeAmount &&
    selectedOptions.optionOne &&
    selectedOptions.optionTwo &&
    Number(inputValues.valueOne) > 0
      ? `https://api.changenow.io/v1/exchange-amount/${inputValues.valueOne}/${selectedOptions.optionOne.ticker}_${selectedOptions.optionTwo.ticker}/?api_key=${process.env.REACT_APP_API_KEY}`
      : null;

  const minAmountUrl =
    selectedOptions.optionOne && selectedOptions.optionTwo
      ? `https://api.changenow.io/v1/min-amount/${selectedOptions.optionOne.ticker}_${selectedOptions.optionTwo.ticker}?api_key=${process.env.REACT_APP_API_KEY}`
      : null;

  const handleOnChangeOptionOne = useCallback((option: ICurrencyList) => {
    setSelectedOptions((prev) => ({ ...prev, optionOne: option }));
  }, []);

  const handleOnChangeOptionTwo = useCallback((option: ICurrencyList) => {
    setSelectedOptions((prev) => ({ ...prev, optionTwo: option }));
  }, []);

  const handleOnChangeInputOne = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      const regex = /^-?\d*\.?\d*$/;

      if (regex.test(value) || value === "") {
        setInputValues((prev) => ({ ...prev, valueOne: value }));
        setShouldFetchExchangeAmount(true);
      }
    },
    []
  );

  const {
    data: list,
    isLoading: listLoading,
    error: listError,
  } = useFetch(
    "https://api.changenow.io/v1/currencies?active=true&fixedRate=true"
  );

  useEffect(() => {
    if (list && list.length >= 2) {
      setSelectedOptions({ optionOne: list[0], optionTwo: list[1] });
    }
  }, [list]);

  const { data: minAmountData } = useFetch(minAmountUrl);

  useEffect(() => {
    if (minAmountData) {
      if (minAmountData.minAmount === null) {
        setError("This pair is disabled now");
      } else {
        setError(null);
        setMinAmount(minAmountData.minAmount);
        setInputValues((prev) => ({
          ...prev,
          valueOne: minAmountData.minAmount,
        }));
        setShouldFetchExchangeAmount(true);
      }
    }
  }, [minAmountData]);

  const { data: exchangeAmountData } = useFetch(exchangeAmountUrl);

  useEffect(() => {
    if (exchangeAmountData) {
      if (exchangeAmountData.estimatedAmount === null) {
        setError("This pair is disabled now");
      } else {
        setError(null);
        setInputValues((prev) => ({
          ...prev,
          valueTwo:
            Number(inputValues.valueOne) < (minAmount || 0)
              ? "-"
              : exchangeAmountData.estimatedAmount,
        }));

        setShouldFetchExchangeAmount(false);
      }
    }
  }, [exchangeAmountData, inputValues.valueOne, minAmount]);

  if (listLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (listError) {
    return <div>Error: {listError.message}</div>;
  }

  return (
    <div className={styles.contentMain}>
      <h1 className={styles.title}>Crypto Exchange</h1>
      <span className={styles.text}>Exchange fast and easy</span>

      <div className={styles.selectInputsWrapper}>
        <CurrencyInput
          value={inputValues.valueOne}
          selectedOption={selectedOptions.optionOne}
          onOptionChange={handleOnChangeOptionOne}
          onChange={handleOnChangeInputOne}
          options={list || []}
        />
        <div className={styles.swapContainer}>
          <Swap />
        </div>
        <CurrencyInput
          value={inputValues.valueTwo}
          selectedOption={selectedOptions.optionTwo}
          onOptionChange={handleOnChangeOptionTwo}
          options={list || []}
          readOnly={true}
        />
      </div>

      {Number(inputValues.valueOne) < (minAmount || 0) && (
        <span>Сумма меньше, чем минимальная</span>
      )}

      <ExchangeForm selectedOptions={selectedOptions.optionTwo} error={error} />
    </div>
  );
};

export default MainPage;
