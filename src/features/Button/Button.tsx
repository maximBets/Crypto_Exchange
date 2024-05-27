import React, { ButtonHTMLAttributes, FC } from "react";
import styles from "./Button.module.css";
import { classNames } from "../../helpers/className";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const Button: FC<IButtonProps> = (props) => {
  const { className, children, ...otherProps } = props;

  return (
    <button
      className={classNames(styles.buttonCustom, {}, [className])}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
