import React, { useState, Fragment } from 'react';
import CostModel from './components/cost-model/CostModel';
import LoadCostModel from './components/cost-model/LoadCostModel';
import SaveCostModel from './components/cost-model/SaveCostModel';
import EC2Config from './components/EC2/EC2Config';
import EC2List from './components/EC2/EC2List';
import Card from './components/UI/Card';
import useHttp from './hooks/use-http';

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

  /*   // array destructuring; using fetchTasks as alias for sendRequest function
    const { isLoading, error, sendRequest: saveCostModel } = useHttp();
  
    const printData = () => {
      console.log(ec2List);
    };
  
    const onSaveHandler = () => {
      saveCostModel({
        url: 'http://localhost:5000/pricing/save',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: ec2List
      }, printData);
    };
  
    const dataList = (obj) => {
      console.log(obj);
    };
  
    const onLoadHandler = () => {
      saveCostModel({
        url: 'http://localhost:5000/pricing/load',
      }, dataList);
    };
   */

  return (
    <Fragment>
      <CostModel costModel={ec2List} />
      <EC2Config onAddEC2={addEC2Handler} />
      <EC2List ec2List={ec2List} />
    </Fragment>
  );
}

export default App;
