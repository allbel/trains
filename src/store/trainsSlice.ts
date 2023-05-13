import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { train, Train } from "../services/http";
import { RootState } from "./createStore";

export const getAllTrains = createAsyncThunk(
  "trains/getAllTrains",
  async (payload, { rejectWithValue }) => {
    try {
      return await train.getAll();
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const sendDataTrains = createAsyncThunk<
  undefined,
  void,
  { state: RootState }
>("trains/sendDataTrains", async (payload, { rejectWithValue, getState }) => {
  try {
    const sendDataAPI = getState().trains.data;
    console.log("Data: ", sendDataAPI);
  } catch (e) {
    return rejectWithValue(e);
  }
});

type TrainsState = {
  data: Train[];
  isLoading: boolean;
};

const initialState: TrainsState = {
  data: [],
  isLoading: true,
};

const trainsSlice = createSlice({
  name: "trains",
  initialState,
  reducers: {
    changeSpeedLimit(
      state,
      action: PayloadAction<{
        currentTrain: number;
        idSpeed: number;
        value: number;
      }>
    ) {
      let trains = state.data[action.payload.currentTrain].speedLimits;
      trains[action.payload.idSpeed].speedLimit = action.payload.value;
      trains
        .sort((a, b) => a.speedLimit - b.speedLimit)
        .forEach((train, index) => (train.name = `Скорость №${index}`));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTrains.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(getAllTrains.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllTrains.rejected, (state, action) => {
        state.isLoading = false;
        console.log("Ошибка: ", action.payload);
      })
      .addCase(sendDataTrains.fulfilled, (state, action) => {
        console.log("Данные успешно отправлены");
      })
      .addCase(sendDataTrains.rejected, (state, action) => {
        console.log("Ошибка: ", action.payload);
      });
  },
});

export const { changeSpeedLimit } = trainsSlice.actions;

export default trainsSlice.reducer;
