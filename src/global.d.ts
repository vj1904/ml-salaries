declare module '@ant-design/charts' {
    import { FC } from 'react';
  
    export interface LineConfig {
      data: any[];
      xField: string;
      yField: string;
      seriesField?: string;
      xAxis?: { type: string };
      yAxis?: { label?: { formatter: (v: number) => string } };
      point?: { size: number; shape: string };
      tooltip?: { showMarkers: boolean; formatter: (datum: any) => { name: string; value: string } };
    }
  
    export const Line: FC<LineConfig>;
  }
  