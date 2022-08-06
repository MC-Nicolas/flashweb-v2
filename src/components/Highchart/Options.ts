export const options = {
  chart: {
    type: 'line',
    height: 300,
    backgroundColor: 'transparent',
  },
  title: {
    text: 'Your results',
    style: { color: 'white' },
  },

  yAxis: {
    title: {
      text: 'Results ( % ) ',
    },
  },

  xAxis: {
    categories: [],
  },
  series: [],

  legend: {
    enabled: false,
  },

  tooltip: {
    //@ts-ignore
    formatter: function () {
      //@ts-ignore
      return '<br /><b>Date : ' + this.x + '<br/>Result :</b> ' + this.y + ' %';
    },
  },
};
