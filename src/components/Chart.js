import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend,
} from 'recharts';

export default class Chart extends PureComponent {
  render() {
    const options = { month: 'numeric', day: 'numeric' };
    const data = this.props.data.map(day => {
      return {
        name: new Date(day.applicable_date).toLocaleDateString('en-GB', options),
        temp: Math.round(day.the_temp),
        min: Math.round(day.min_temp),
        max: Math.round(day.max_temp),
      }
    })
    return (
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5, right: 0, left: 0, bottom: 5,
        }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="max" stroke="#F56565" />
        <Line type="monotone" dataKey="temp" stroke="#9F7AEA" />
        <Line type="monotone" dataKey="min" stroke="#4299E1" />
        
      </LineChart>
    );
  }
}
