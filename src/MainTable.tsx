// src/MainTable.tsx
import React, { useEffect, useState } from 'react';
import { Table, Spin, Alert } from 'antd';
import { fetchMLData, SalaryData } from './data';

const MainTable: React.FC = () => {
  const [data, setData] = useState<SalaryData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const mlData = await fetchMLData();
        setData(mlData);
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

  if (loading) {
    return <Spin tip="Loading..." />;
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }

  return <Table dataSource={data} columns={columns} rowKey="year" />;
};

export default MainTable;
