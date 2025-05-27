import { useEffect } from 'react';
import Plotly from 'plotly.js-dist';
import dayjs from 'dayjs';
import { useQuery } from '@tanstack/react-query';

import getRatingsByPlatform from '@src/api/rankings';
import { RatingData, InputRatingData } from '@shared/types';

interface AppProps {
   cp_handles: InputRatingData[];
}

const colors = [
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
const line_colors = ['#e53935', '#1e88e5', '#8bc34a', '#ff9800'];
const opacity = 0.85;
const smoothing_spline = 0.33;
const background_props = {
   type: 'rect',
   xref: 'paper',
   x0: 0,
   x1: 1,
   yref: 'y',
   opacity: opacity,
   layer: 'below' as const,
   line: { width: 0 },
};

export default function Graph({ cp_handles }: AppProps) {
   const promises = cp_handles
      .reduce((acc: InputRatingData[], curr) => {
         if (!acc.find(item => item.platform === curr.platform)) {
            acc.push(curr);
         }
         return acc;
      }, [])
      .map(platformData => getRatingsByPlatform(platformData));

   const { data, isLoading, error } = useQuery({
      queryKey: ['ratingsData', [...cp_handles].sort()],
      staleTime: 1000 * 60 * 5,
      queryFn: async () => {
         const results = await Promise.allSettled(promises);
         return results
            .filter(result => result.status === 'fulfilled')
            .map(result => (result as PromiseFulfilledResult<RatingData>).value);
      },
   });

   useEffect(() => {
      if (!data) return;

      const plotData = data.map((item: RatingData, i: number) => ({
         x: item.x,
         y: item.y,
         name: item.platform.charAt(0).toUpperCase() + item.platform.slice(1).toLowerCase(),
         type: 'scatter',
         mode: 'lines+markers',
         line: {
            shape: 'spline',
            smoothing: smoothing_spline,
            color: line_colors[i % line_colors.length],
            width: 1.5,
         },
      }));

      Plotly.newPlot(
         'plotlyChart',
         plotData,
         {
            paper_bgcolor: 'rgba(0,0,0,0)',
            margin: { t: 30, r: 30, b: 30, l: 30 },
            xaxis: {
               range: ['2024-03-01', '2025-04-22'],
               type: 'date',
               tickformat: '%Y-%m',
               showgrid: false,
               rangeselector: {
                  buttons: [
                     { count: 1, label: '1m', step: 'month', stepmode: 'backward' },
                     { count: 6, label: '6m', step: 'month', stepmode: 'backward' },
                     { count: 12, label: '1y', step: 'month', stepmode: 'backward' },
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
               orientation: 'h',
               bgcolor: 'rgba(0, 0, 0, 0)',
               bordercolor: 'rgba(0, 0, 0, 0)',
               x: 1,
               y: -0.085,
               xanchor: 'right',
               yanchor: 'top',
            },
            shapes: [
               { ...background_props, y0: 0, y1: 1200, fillcolor: colors[0] },
               { ...background_props, y0: 1200, y1: 1400, fillcolor: colors[1] },
               { ...background_props, y0: 1400, y1: 1600, fillcolor: colors[2] },
               { ...background_props, y0: 1600, y1: 1900, fillcolor: colors[3] },
               { ...background_props, y0: 1900, y1: 2100, fillcolor: colors[4] },
               { ...background_props, y0: 2100, y1: 2300, fillcolor: colors[5] },
               { ...background_props, y0: 2300, y1: 2400, fillcolor: colors[6] },
               { ...background_props, y0: 2400, y1: 2600, fillcolor: colors[7] },
               { ...background_props, y0: 2600, y1: 10000, fillcolor: colors[8] },
            ],
         },
         { staticPlot: true, responsive: true }
      );

      const plot: any = document.getElementById('plotlyChart');

      let isRelayouting = false;
      plot.on('plotly_relayout', (eventData: any) => {
         if (isRelayouting) {
            isRelayouting = false;
            return;
         }

         let latestDate: Date | null = null,
            earliestDate: Date | null = null;

         for (let i = 0; i < plot._fullData.length; ++i) {
            if (plot._fullData[i].visible === true) {
               for (let j = 0; j < plot._fullData[i].x.length; ++j) {
                  const date = new Date(plot._fullData[i].x[j]);
                  if (!latestDate || date > latestDate) latestDate = date;
                  if (!earliestDate || date < earliestDate) earliestDate = date;
               }
            }
         }

         let limitDate = dayjs(latestDate),
            limitDateDate: Date | null = null;
         let found = false;
         for (let i = 0; i < plot._fullLayout.xaxis.rangeselector.buttons.length; ++i) {
            let button = plot._fullLayout.xaxis.rangeselector.buttons[i];
            if (button._isActive === true) {
               found = true;
               if (button.step === 'all') limitDateDate = earliestDate;
               else {
                  limitDate = limitDate.subtract(button.count, button.step);
                  limitDateDate = limitDate.toDate();
                  if (limitDate < dayjs(earliestDate)) limitDateDate = earliestDate;
               }
            }
         }
         if (!found) limitDateDate = earliestDate;

         let ylow = 100000,
            yhigh = -100000;
         for (let i = 0; i < plot._fullData.length; ++i) {
            if (plot._fullData[i].visible === true) {
               for (let j = 0; j < plot._fullData[i].x.length; ++j) {
                  let d = plot._fullData[i];
                  let date = new Date(d.x[j]);
                  if (!limitDateDate || date >= limitDateDate) {
                     if (ylow > d.y[j]) ylow = d.y[j];
                     if (yhigh < d.y[j]) yhigh = d.y[j];
                  }
               }
            }
         }

         isRelayouting = true;
         Plotly.relayout(plot, {
            'xaxis.range': [
               limitDateDate ? limitDateDate.toISOString().split('T')[0] : '',
               latestDate ? latestDate.toISOString().split('T')[0] : '',
            ],
            'yaxis.range': [Math.max(0, ylow - 100), yhigh + 200],
         });
      });

      Plotly.relayout(plot, {});
   }, [data]);

   if (isLoading) return <p>Loading...</p>;
   if (error) return <p>Error loading data</p>;

   return (
      <div className="box">
         <h3 className="text-center m-0">Performance 📊</h3>
         <div id="plotlyChart" />
      </div>
   );
}
