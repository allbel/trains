import React from "react";
import Loader from "../../assets/Eclipse-0.6s-200px.svg";
import styles from "./Loading.module.scss";

export const Loading = () => {
  return (
    <div className={styles.loader}>
      <img src={Loader} alt="Loader" />
    </div>
  );
};
