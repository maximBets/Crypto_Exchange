import React from "react";
import styles from "./Input.module.css";
import { classNames } from "../../helpers/className";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = ({ className, ...otherProps }: IInputProps) => {
  return (
    <input
      className={classNames(styles.input, {}, [className])}
      {...otherProps}
    ></input>
  );
};

export default Input;
