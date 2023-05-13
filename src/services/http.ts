import axios from "axios";

const httpService = axios.create({
  baseURL: "https://gist.githubusercontent.com/",
});

export const train = {
  getAll() {
    return httpService
      .get<Train[]>(
        "GlennMiller1991/152583a1bf1e057e8db06f5949ae3dda/raw/f84adf51092706ae0e7c0abc7589ad49800d8112/trains.json"
      )
      .then((res) => res.data);
  },
};

// types

export type SpeedLimit = {
  name: string;
  speedLimit: number;
};

export type Train = {
  name: string;
  description: string;
  speedLimits: SpeedLimit[];
};
