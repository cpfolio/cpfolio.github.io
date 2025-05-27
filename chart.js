let colors = [
  '#bfbfbf',
  '#b2f2bb',
  '#c5f6fa',
  '#a5d8ff',
  '#d0bfff',
  '#fff3bf',
  '#ffd8a8',
  '#ffa8a8',
  '#ff8787',
];
let line_colors = ['#e53935', '#1e88e5', '#8bc34a'];
let opacity = 0.85;
let line = {
  shape: 'spline',
  smoothing: 0.8,
  color: '#1f77b4',
  width: 1.5,
};
let data = [
  {
    x: [
      '2024-03-01',
      '2024-04-01',
      '2024-06-01',
      '2024-07-01',
      '2024-09-01',
      '2024-10-01',
      '2024-12-01',
      '2025-01-01',
      '2025-03-01',
      '2025-04-01',
      '2025-04-22',
    ],
    y: [1300, 1450, 1520, 1430, 1600, 1620, 1770, 1950, 1750, 2200, 2560],
    type: 'scatter',
    mode: 'lines+markers',
    line: {
      ...line,
      color: line_colors[0],
    },
    name: 'Codeforces',
  },
  {
    x: ['2024-03-01', '2024-04-01', '2024-05-01', '2025-03-01', '2025-04-01', '2025-04-22'],
    y: [1300, 1430, 1600, 1770, 1850, 1900],
    type: 'scatter',
    mode: 'lines+markers',
    line: {
      ...line,
      color: line_colors[1],
    },
    name: 'AtCoder',
  },
  {
    x: ['2024-03-01', '2024-04-01', '2024-05-01', '2025-03-01', '2025-04-01', '2025-04-22'],
    y: [1300 + 100, 1430 + 100, 1600 + 100, 1770 + 100, 1850 + 100, 1900 + 100],
    type: 'scatter',
    mode: 'lines+markers',
    line: {
      ...line,
      color: line_colors[2],
    },
    name: 'YukiCoder',
  },
];

Plotly.newPlot(
  'plotlyChart',
  data,
  {
    paper_bgcolor: '#f8f9fa',
    margin: {
      t: 30,
      r: 30,
      b: 30,
      l: 30,
    },
    xaxis: {
      range: ['2024-03-01', '2025-04-22'],
      type: 'date',
      tickformat: '%Y-%m',
      showgrid: false,
      rangeselector: {
        buttons: [
          {
            count: 1,
            label: '1m',
            step: 'month',
            stepmode: 'backward',
          },
          {
            count: 6,
            label: '6m',
            step: 'month',
            stepmode: 'backward',
          },
          {
            count: 12,
            label: '1y',
            step: 'month',
            stepmode: 'backward',
          },
          { step: 'all' },
        ],
      },
    },

    yaxis: {
      autorange: false,
      range: [1000, 3500],
      type: 'linear',
      showgrid: false,
    },
    legend: {
      orientation: 'v',
      x: 1,
      y: -0.075,
      xanchor: 'right',
      yanchor: 'top',
    },
    shapes: [
      {
        type: 'rect',
        xref: 'paper',
        x0: 0,
        x1: 1,
        yref: 'y',
        y0: 0,
        y1: 1200,
        fillcolor: colors[0], // shit
        opacity: opacity,
        layer: 'below',
        line: { width: 0 },
      },
      {
        type: 'rect',
        xref: 'paper',
        x0: 0,
        x1: 1,
        yref: 'y',
        y0: 1200,
        y1: 1400,
        fillcolor: colors[1], // newbie
        opacity: opacity,
        layer: 'below',
        line: { width: 0 },
      },
      {
        type: 'rect',
        xref: 'paper',
        x0: 0,
        x1: 1,
        yref: 'y',
        y0: 1400,
        y1: 1600,
        fillcolor: colors[2], // specialist
        opacity: opacity,
        layer: 'below',
        line: { width: 0 },
      },
      {
        type: 'rect',
        xref: 'paper',
        x0: 0,
        x1: 1,
        yref: 'y',
        y0: 1600,
        y1: 1900,
        fillcolor: colors[3], // expert
        opacity: opacity,
        layer: 'below',
        line: { width: 0 },
      },
      {
        type: 'rect',
        xref: 'paper',
        x0: 0,
        x1: 1,
        yref: 'y',
        y0: 1900,
        y1: 2100,
        fillcolor: colors[4], // candidate
        opacity: opacity,
        layer: 'below',
        line: { width: 0 },
      },
      {
        type: 'rect',
        xref: 'paper',
        x0: 0,
        x1: 1,
        yref: 'y',
        y0: 2100,
        y1: 2300,
        fillcolor: colors[5], // master
        opacity: opacity,
        layer: 'below',
        line: { width: 0 },
      },
      {
        type: 'rect',
        xref: 'paper',
        x0: 0,
        x1: 1,
        yref: 'y',
        y0: 2300,
        y1: 2400,
        fillcolor: colors[6], // int master
        opacity: opacity,
        layer: 'below',
        line: { width: 0 },
      },
      {
        type: 'rect',
        xref: 'paper',
        x0: 0,
        x1: 1,
        yref: 'y',
        y0: 2400,
        y1: 2600,
        fillcolor: colors[7], // grandmaster
        opacity: opacity,
        layer: 'below',
        line: { width: 0 },
      },
      {
        type: 'rect',
        xref: 'paper',
        x0: 0,
        x1: 1,
        yref: 'y',
        y0: 2600,
        y1: 10000,
        fillcolor: colors[8], // int grandmaster
        opacity: opacity,
        layer: 'below',
        line: { width: 0 },
      },
    ],
  },
  {
    staticPlot: true,
  }
);

const plot = document.getElementById('plotlyChart');

var isRelayouting = false;
plot.on('plotly_relayout', eventData => {
  console.log('Relayout event:', plot);
  if (isRelayouting) {
    isRelayouting = false;
    return;
  }

  let latestDate = null,
    earliestDate = null;
  for (let i = 0; i < plot._fullData.length; ++i) {
    if (plot._fullData[i].visible === true) {
      for (let j = 0; j < plot._fullData[i].x.length; ++j) {
        const date = new Date(plot._fullData[i].x[j]);
        if (!latestDate || date > latestDate) latestDate = date;
        if (!earliestDate || date < earliestDate) earliestDate = date;
      }
    }
  }

  let limitDate = dayjs(latestDate);
  let found = false;
  for (let i = 0; i < plot._fullLayout.xaxis.rangeselector.buttons.length; ++i) {
    let button = plot._fullLayout.xaxis.rangeselector.buttons[i];
    if (button._isActive === true) {
      found = true;
      if (button.step === 'all') limitDate = earliestDate;
      else {
        limitDate = limitDate.subtract(button.count, button.step);
        limitDate = limitDate.toDate();
        if (limitDate < earliestDate) limitDate = earliestDate;
      }
    }
  }
  if (!found) limitDate = earliestDate;

  let ylow = 100000,
    yhigh = -100000;
  for (let i = 0; i < plot._fullData.length; ++i) {
    if (plot._fullData[i].visible === true) {
      for (let j = 0; j < plot._fullData[i].x.length; ++j) {
        let d = plot._fullData[i];
        let date = new Date(d.x[j]);
        if (date >= limitDate) {
          if (ylow > d.y[j]) ylow = d.y[j];
          if (yhigh < d.y[j]) yhigh = d.y[j];
        }
      }
    }
  }

  isRelayouting = true;
  Plotly.relayout(plot, {
    'xaxis.range': [limitDate.toISOString().split('T')[0], latestDate.toISOString().split('T')[0]],
    'yaxis.range': [ylow - 300, yhigh + 300],
  });
});

Plotly.relayout(plot, {});
