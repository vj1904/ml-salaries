import axios from "axios";

export interface SalaryData {
  year: number;
  totalJobs: number;
  avgSalary: number;
}

export const fetchMLData = async (): Promise<SalaryData[]> => {
  try {
    const response = await axios.get("http://localhost:5000/api/kaggle-data", {
      responseType: "json",
    });

    const jsonData = response.data;

    // Initialize an object to store total jobs and total salaries for each year
    const yearStats: {
      [year: number]: { totalJobs: number; totalSalary: number; count: number };
    } = {};

    // Process each data item
    jsonData.forEach((item: any) => {
      const year = parseInt(item.work_year, 10);
      const salary = parseFloat(item.salary_in_usd);

      // Update the stats for the current year
      if (!yearStats[year]) {
        yearStats[year] = { totalJobs: 0, totalSalary: 0, count: 0 };
      }
      yearStats[year].totalJobs += 1; // Increment the total jobs
      yearStats[year].totalSalary += salary; // Add the salary
      yearStats[year].count += 1; // Increment the count of data items for the year
    });

    // Calculate average salary and format the data
    const processedData: SalaryData[] = Object.entries(yearStats).map(
      ([year, stats]) => ({
        year: parseInt(year, 10),
        totalJobs: stats.totalJobs,
        avgSalary: parseFloat((stats.totalSalary / stats.count).toFixed(2)), // Calculate average salary with 2 digits after the decimal
      })
    );

    return processedData;
  } catch (error) {
    console.error("Error fetching data from proxy server:", error);
    throw error;
  }
};
