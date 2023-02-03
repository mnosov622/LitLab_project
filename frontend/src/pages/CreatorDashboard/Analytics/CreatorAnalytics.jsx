import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { month: 'Jan', enrolled: 50 },
  { month: 'Feb', enrolled: 60 },
  { month: 'Mar', enrolled: 55 },
  { month: 'Apr', enrolled: 75 },
  { month: 'May', enrolled: 90 },
  { month: 'Jun', enrolled: 85 },
  { month: 'Jul', enrolled: 80 },
  { month: 'Aug', enrolled: 65 },
  { month: 'Sep', enrolled: 70 },
  { month: 'Oct', enrolled: 75 },
  { month: 'Nov', enrolled: 60 },
  { month: 'Dec', enrolled: 55 }
];

const CreatorAnalytics = () => {
  return (
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey='month' />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey='enrolled' fill='#8884d8' />
    </BarChart>
  );
};

export default CreatorAnalytics;
