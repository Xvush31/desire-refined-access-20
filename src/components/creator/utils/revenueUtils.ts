
export const generateRevenueData = (monthlyRevenue: number, monthlyRevenueChange: number) => {
  const data = [];
  let value = monthlyRevenue * 0.8;
  const trend = monthlyRevenueChange > 0 ? 0.4 : -0.2;
  
  for (let i = 0; i < 30; i++) {
    const daily = ((Math.random() - 0.3) * 2) * (monthlyRevenue * 0.05);
    const trendEffect = (i / 30) * monthlyRevenue * trend;
    value = Math.max(300, value + daily + (trendEffect / 30));
    data.push({ day: i + 1, value: Math.round(value) });
  }
  return data;
};
