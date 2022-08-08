import { ChartState } from '@/types/chart';
import { createSlice } from '@reduxjs/toolkit';

const initialState: ChartState = {
  series: [
    {
      data: [],
    },
  ],
  xAxis: {
    categories: [],
  },
  config: {
    strokeColor: 'green',
  },
};

export const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    setSeries: (
      state,
      action: { payload: { values: any; categories: string[] } }
    ) => {
      state.series = [{ data: action.payload.values }];
      state.xAxis = { ...state.xAxis, categories: action.payload.categories };
    },
    setStrokeColor: (state, action: { payload: string }) => {
      state.config.strokeColor = action.payload;
    },
  },
});

export const { setStrokeColor, setSeries } = chartSlice.actions;

export default chartSlice.reducer;
