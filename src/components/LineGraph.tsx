// src/components/LineGraph.tsx
import React from 'react';
import { Line } from '@ant-design/charts';
import { SalaryData } from '../data';

interface LineGraphProps {
  data: SalaryData[];
}

const LineGraph: React.FC<LineGraphProps> = ({ data }) => {
  const config = {
    data,
    xField: 'year',
    yField: 'avgSalary',
    seriesField: 'year',
    xAxis: { type: 'category' },
    yAxis: { label: { formatter: (v: number) => `$${v.toFixed(2)}` } },
    point: {
      size: 5,
      shape: 'diamond',
    },
    tooltip: {
      showMarkers: false,
      formatter: (datum: any) => ({
        name: 'Average Salary',
        value: `$${datum.avgSalary.toFixed(2)}`,
      }),
    },
  };

  return <Line {...config} />;
};

export default LineGraph;
