import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6F61', '#6B5B95', '#88B04B'];

function PieChartComponent({ data, onLegendClick }) {
  return (
    <PieChart width={800} height={400}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        outerRadius={150}
        fill="#8884d8"
        dataKey="value"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.fill || COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend
        onClick={onLegendClick}
        formatter={(value, entry) => (
          <span style={{
            textDecoration: entry.payload.fill === '#E0E0E0' ? 'line-through' : 'none',
            color: entry.payload.fill === '#E0E0E0' ? 'gray' : 'black',
          }}>
            {value}
          </span>
        )}
      />
    </PieChart>
  );
}

export default PieChartComponent;
