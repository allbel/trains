import React, { FC, memo } from "react";
import styles from "./Button.module.scss";
import { useAppDispatch } from "../../store/createStore";
import { sendDataTrains } from "../../store/trainsSlice";

export const Button: FC<{ name: string }> = memo(({ name }) => {
  const dispatch = useAppDispatch();
  const click = () => {
    dispatch(sendDataTrains());
  };

  return (
    <button className={styles.button} onClick={click}>
      {name}
    </button>
  );
});
