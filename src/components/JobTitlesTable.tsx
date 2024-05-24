// src/components/JobTitlesTable.tsx
import React from 'react';
import { Table } from 'antd';

interface JobTitlesTableProps {
  year: number;
  data: any[];
}

const JobTitlesTable: React.FC<JobTitlesTableProps> = ({ year, data }) => {
  const filteredData = data.filter((item) => item.work_year === year.toString());

  const jobTitleCounts = filteredData.reduce((acc: any, item: any) => {
    if (acc[item.job_title]) {
      acc[item.job_title] += 1;
    } else {
      acc[item.job_title] = 1;
    }
    return acc;
  }, {});

  const tableData = Object.entries(jobTitleCounts).map(([jobTitle, count], index) => ({
    key: index,
    jobTitle,
    count,
  }));

  const columns = [
    {
      title: 'Job Title',
      dataIndex: 'jobTitle',
      key: 'jobTitle',
    },
    {
      title: 'Number of Jobs',
      dataIndex: 'count',
      key: 'count',
    },
  ];

  return <Table dataSource={tableData} columns={columns} pagination={false} />;
};

export default JobTitlesTable;
