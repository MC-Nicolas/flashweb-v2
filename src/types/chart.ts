export interface ChartDataType {
  name: string;
  value: number;
}

export interface ChartConfigType {
  strokeColor: string;
}

export interface ChartState {
  series: any[];
  xAxis: {
    categories: string[];
  };
  config: ChartConfigType;
}
