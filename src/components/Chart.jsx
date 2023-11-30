import React from 'react';
import { Cell, Pie, PieChart, Legend, Tooltip } from 'recharts';

const COLORS = ['#66BB6A', '#EF5350'];

export const Chart = ({ monthlySummary, selectedMonths, rateUSD, rateEUR }) => {
  const data = selectedMonths.map((selected, index) => {
    if (selected) {
      const month = Object.keys(monthlySummary)[index];
      const { totalIncome, totalExpenses } = monthlySummary[month];
      const value = totalIncome - totalExpenses;
      const name = month;
      return { value, name };
    }
    return null;
  }).filter(item => item !== null);

  return (
    <PieChart width={250} height={250}>
      <Pie
        data={data}
        cx={'50%'}
        cy={'50%'}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={2}
        dataKey="value"
      >
        {data.map((_, index) => (
          <Cell
            key={`cell-${index}`}
            fill={COLORS[index % COLORS.length]}
          />
        ))}
      </Pie>

      <Legend />

      <Tooltip />
    </PieChart>
  );
};
