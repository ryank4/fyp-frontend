import React, { useState, useContext, Fragment } from 'react';
import CostModel from './components/cost-model/CostModel';
import CostModelView from './components/cost-model/CostModelView';
import LoadCostModel from './components/cost-model/LoadCostModel';
import SaveCostModel from './components/cost-model/SaveCostModel';
import EC2Config from './components/EC2/EC2Config';
import EC2List from './components/EC2/EC2List';
import Header from './components/Layout/Header';
import Card from './components/UI/Card';
import Modal from './components/UI/Modal';
import useHttp from './hooks/use-http';
import CostModelContext from './store/cost-model-context';
import CostModelProvider from './store/CostModelProvider';

function App() {
  const [ec2List, setEc2List] = useState([]);
  const costModelCtx = useContext(CostModelContext);
  const { services } = costModelCtx;

  const addEC2Handler = (region, os, instanceType, price) => {
    // passing function will automatically get previous state snapshot
    // setEc2List((prevEC2List) => {
    //   return [
    //     ...prevEC2List,
    //     { id: Math.random().toString(), region: region, os: os, instanceType: instanceType, price: price }];
    // }
    // costModeltCtx.addService({
    //   id: Math.random().toString(), region: region, os: os, instanceType: instanceType, price: price
    console.log(costModelCtx);
  };
  

  const [showCostModel, setShowCostModel] = useState(false);

  const showCostModelHandler = () => {
    setShowCostModel(true);
  };

  const hideCostModelHandler = () => {
    setShowCostModel(false);
  };

  console.log(services);

  return (
    <CostModelProvider>
      {showCostModel && <CostModelView onClose={hideCostModelHandler} />}
      <Header onShowCostModel={showCostModelHandler} />
        <main>
          <EC2Config onAddEC2={addEC2Handler} />
        </main>
    </CostModelProvider>
  );
}


export default App;
