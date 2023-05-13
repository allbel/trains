import React, { FC } from "react";
import { SpeedLimit } from "../../services/http";
import { RowTable } from "./RowTable/RowTable";

type Props = {
  name: string;
  currentTrain: number;
  speedData: SpeedLimit[];
};

export const SpeedLimitTable: FC<Props> = ({
  name,
  currentTrain,
  speedData,
}) => {
  return (
    <>
      {speedData.length && (
        <table>
          <caption>{name + currentTrain}</caption>
          <tbody>
            <tr>
              <th>Название</th>
              <th>Лимит скорости</th>
            </tr>
            {speedData.map((limit, index) => (
              <RowTable
                key={index}
                name={limit.name}
                idSpeed={index}
                currentTrain={currentTrain}
                speedLimit={limit.speedLimit}
              />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
