// src/components/MainTable.tsx
import React, { useEffect, useState } from 'react';
import { Table, Spin, Alert } from 'antd';
import { fetchMLData, SalaryData } from './data';
import JobTitlesTable from './components/JobTitlesTable';
import LineGraph from './components/LineGraph';

const MainTable: React.FC = () => {
  const [data, setData] = useState<SalaryData[]>([]);
  const [originalData, setOriginalData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const { processedData, originalData } = await fetchMLData();
        setData(processedData);
        setOriginalData(originalData);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const columns = [
    {
      title: 'Year',
      dataIndex: 'year',
      key: 'year',
      sorter: (a: SalaryData, b: SalaryData) => a.year - b.year,
    },
    {
      title: 'Total Jobs',
      dataIndex: 'totalJobs',
      key: 'totalJobs',
      sorter: (a: SalaryData, b: SalaryData) => a.totalJobs - b.totalJobs,
    },
    {
      title: 'Average Salary (USD)',
      dataIndex: 'avgSalary',
      key: 'avgSalary',
      sorter: (a: SalaryData, b: SalaryData) => a.avgSalary - b.avgSalary,
    },
  ];

  const handleRowClick = (record: SalaryData) => {
    setSelectedYear(record.year);
  };

  if (loading) {
    return <Spin tip="Loading..." />;
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }

  return (
    <div>
      <Table
        dataSource={data}
        columns={columns}
        rowKey="year"
        pagination={false}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
      />
      <LineGraph data={data} />
      {selectedYear && <JobTitlesTable year={selectedYear} data={originalData} />}
    </div>
  );
};

export default MainTable;
