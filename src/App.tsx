import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "./store/createStore";
import { getAllTrains } from "./store/trainsSlice";
import { TrainTable } from "./components/TrainTable/TrainTable";
import { SpeedLimitTable } from "./components/SpeedLimitTable/SpeedLimitTable";
import "./App.scss";
import { Loading } from "./components/Loading/Loading";
import { Button } from "./components/Button/Button";

function App() {
  const trains = useAppSelector((state) => state.trains.data);
  const isLoading = useAppSelector((state) => state.trains.isLoading);
  const dispatch = useAppDispatch();

  const [currentTrain, setCurrentTrain] = useState(0);

  const clickRow = useCallback((current: number) => {
    setCurrentTrain(current);
  }, []);

  const trainsCache = useMemo(() => {
    return trains;
  }, [isLoading]);

  useEffect(() => {
    dispatch(getAllTrains());
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="App">
      <div>
        {trainsCache.length && (
          <TrainTable
            name={"Поезда"}
            trains={trainsCache}
            clickRow={clickRow}
          />
        )}
      </div>
      <div>
        {trains[currentTrain]?.speedLimits.length && (
          <SpeedLimitTable
            name={"Скорости поезда №"}
            currentTrain={currentTrain}
            speedData={trains[currentTrain].speedLimits}
          />
        )}
        <Button name={"Отправить данные на сервер"} />
      </div>
    </div>
  );
}

export default App;
