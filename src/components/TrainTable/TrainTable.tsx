import React, { FC, memo } from "react";
import { Train } from "../../services/http";
import style from "./TrainTable.module.scss";

type Props = {
  name: string;
  trains: Train[];
  clickRow: (current: number) => void;
};

export const TrainTable: FC<Props> = memo(({ name, trains, clickRow }) => {
  return (
    <>
      {trains.length && (
        <table>
          <caption>{name}</caption>
          <tbody>
            <tr>
              <th>Название</th>
              <th>Описание</th>
            </tr>
            {trains.map((train, index) => (
              <tr
                key={index}
                className={style.row}
                onClick={() => clickRow(index)}
              >
                <td>{train.name}</td>
                <td>{train.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
});
