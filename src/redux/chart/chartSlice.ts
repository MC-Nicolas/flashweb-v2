import { ChartState } from '@/types/chart';
import { createSlice } from '@reduxjs/toolkit';

const initialState: ChartState = {
  series: [
    {
      data: [50, 45, 58, 60, 75, 35],
    },
  ],
  config: {
    strokeColor: 'green',
  },
};

export const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    setSeries: (state, action) => {
      state.series = action.payload;
    },
    setStrokeColor: (state, action: { payload: string }) => {
      state.config.strokeColor = action.payload;
    },
  },
});

export const { setStrokeColor, setSeries } = chartSlice.actions;

export default chartSlice.reducer;
