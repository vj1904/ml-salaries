// src/data.ts
import axios from "axios";

export interface SalaryData {
  year: number;
  totalJobs: number;
  avgSalary: number;
}

export const fetchMLData = async (): Promise<{ processedData: SalaryData[], originalData: any[] }> => {
  try {
    const response = await axios.get("http://localhost:5000/api/kaggle-data", {
      responseType: "json",
    });

    const jsonData = response.data;

    const yearStats: { [year: number]: { totalJobs: number; totalSalary: number; count: number } } = {};

    jsonData.forEach((item: any) => {
      const year = parseInt(item.work_year, 10);
      const salary = parseFloat(item.salary_in_usd);

      if (!yearStats[year]) {
        yearStats[year] = { totalJobs: 0, totalSalary: 0, count: 0 };
      }
      yearStats[year].totalJobs += 1;
      yearStats[year].totalSalary += salary;
      yearStats[year].count += 1;
    });

    const processedData: SalaryData[] = Object.entries(yearStats).map(([year, stats]) => ({
      year: parseInt(year, 10),
      totalJobs: stats.totalJobs,
      avgSalary: parseFloat((stats.totalSalary / stats.count).toFixed(2)),
    }));

    return { processedData, originalData: jsonData };
  } catch (error) {
    console.error("Error fetching data from proxy server:", error);
    throw error;
  }
};
