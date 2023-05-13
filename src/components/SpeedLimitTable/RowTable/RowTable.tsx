import React, { FC, memo } from "react";
import { SpeedLimit } from "../../../services/http";
import { EditableCell } from "./EditableCell/EditableCell";
import styles from "./RowTable.module.scss";

export const RowTable: FC<
  SpeedLimit & { currentTrain: number; idSpeed: number }
> = memo(({ name, idSpeed, currentTrain, speedLimit }) => {
  return (
    <tr className={styles.row}>
      <td>{name}</td>
      <EditableCell
        currentTrain={currentTrain}
        idSpeed={idSpeed}
        speedLimit={speedLimit}
      />
    </tr>
  );
});
