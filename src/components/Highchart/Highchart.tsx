import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@/redux/redux.hooks';

import Highcharts from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsReact from 'highcharts-react-official';

import { options } from './Options';
import FlexContainer from '../FlexContainer/FlexContainer';

if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts);
}

const Highchart = () => {
  const { config, series } = useAppSelector((state) => state.chart);
  const [highchartOptions, setHighchartOptions] = useState<any>(options);
  const { strokeColor } = config;

  useEffect(() => {
    setHighchartOptions({ ...options, series });
  }, [config, series]);

  if (series.length > 0) {
    return (
      <HighchartsReact highcharts={Highcharts} options={highchartOptions} />
    );
  } else {
    return <p>Loading</p>;
  }
};

export default Highchart;
