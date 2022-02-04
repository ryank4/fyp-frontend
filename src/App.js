import React, { useState, Fragment } from 'react';
import EC2Config from './components/EC2/EC2Config';
import EC2List from './components/EC2/EC2List';

function App() {
  const [ec2List, setEc2List] = useState([]);

  const addEC2Handler = (region, os, instanceType, price) => {
    // passing function will automatically get previous state snapshot
    setEc2List((prevEC2List) => {
      return [
        ...prevEC2List,
        { id: Math.random().toString(), region: region, os: os, instanceType: instanceType, price: price }];
    });
  }

  return (
    <Fragment>
      <EC2Config onAddEC2={addEC2Handler} />
      <EC2List ec2List={ec2List} />
    </Fragment>
  );
}

export default App;
