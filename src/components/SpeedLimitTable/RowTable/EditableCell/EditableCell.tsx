import React, {
  ChangeEvent,
  FC,
  KeyboardEvent,
  useEffect,
  useState,
} from "react";
import styles from "./EditableCell.module.scss";
import { useAppDispatch } from "../../../../store/createStore";
import { changeSpeedLimit } from "../../../../store/trainsSlice";

type Props = {
  speedLimit: number;
  currentTrain: number;
  idSpeed: number;
};

export const EditableCell: FC<Props> = ({
  speedLimit,
  currentTrain,
  idSpeed,
}) => {
  const dispatch = useAppDispatch();

  const [editMode, setEditMode] = useState(false);
  const [value, setValue] = useState(String(speedLimit));
  const [error, setError] = useState(false);

  const activationEditMode = () => setEditMode(true);

  const activationViewMode = () => {
    if (!error) {
      setEditMode(false);
      dispatch(
        changeSpeedLimit({ currentTrain, idSpeed, value: Number(value) })
      );
    }
  };

  const keyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      activationViewMode();
    }
  };

  const change = (e: ChangeEvent<HTMLInputElement>) => {
    const res = Number(e.target.value);
    if (res && res > 0) {
      setError(false);
    } else {
      setError(true);
    }
    setValue(e.target.value);
  };

  useEffect(() => {
    setValue(String(speedLimit));
  }, [speedLimit]);

  return (
    <td className={styles.cell}>
      {editMode ? (
        <input
          className={styles.input}
          onChange={change}
          value={value}
          onBlur={activationViewMode}
          onKeyDown={keyDown}
          autoFocus
        />
      ) : (
        <span className={styles.span} onDoubleClick={activationEditMode}>
          {speedLimit}
        </span>
      )}
      {error && (
        <div className={styles.error}>
          ← Значение должно быть положительным целым числом
        </div>
      )}
    </td>
  );
};
