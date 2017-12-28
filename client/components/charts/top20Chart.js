import React from 'react';
import { HorizontalBar } from 'react-chartjs-2';

const options = {}; // Use to configure chart
const dataSet = {
  labels: [],
  datasets: [
    {
      label: 'U.S. Dollars',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      hoverBorderWidth: 4,
      data: []
    }
  ]
};

const Top20Chart = (props) => {
  const { metric, data } = props;

  dataSet.labels = data.map((candidate, index) => `${index + 1}. ${candidate.name}`);
  dataSet.datasets[0].data = data.map(candidate => candidate[metric]);

  return (
    <HorizontalBar data={dataSet} options={options} />
  );
};

export default Top20Chart;
