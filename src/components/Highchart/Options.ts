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
      return (
        //@ts-ignore
        '<br /><b>Date : ' + this.x + '<br/>Success :</b> ' + this.y + ' %'
      );
    },
  },
};
