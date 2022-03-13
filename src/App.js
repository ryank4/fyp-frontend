import React, { useState, useContext } from 'react';
import { Route } from 'react-router-dom';
import CostModelView from './components/cost-model/CostModelView';
import LoadedCostModels from './components/cost-model/LoadedCostModels';
import EC2Config from './components/EC2/EC2Config';
import S3Config from './components/S3/S3Config';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import CostModelContext from './store/cost-model-context';
import CostModelProvider from './store/CostModelProvider';
import CostSummary from './components/cost-model/CostSummary';
import PlaceHolder from './components/General/Placeholder';
import Home from './components/General/Home';
import Diagrams from './components/diagrams/Diagrams';
import { Switch } from 'react-router-dom';
import ConfigLayout from './components/Layout/ConfigLayout';
import Layout from './components/Layout/Layout';

function App() {
  const costModelCtx = useContext(CostModelContext);
  const { services } = costModelCtx;

  const [showCostModelView, setShowCostModelView] = useState(false);
  const [loadCostModels, setLoadedCostModels] = useState(false);

  const showCostModelViewHandler = () => {
    setShowCostModelView(true);
  };

  const hideCostModelViewHandler = () => {
    setShowCostModelView(false);
  };

  const showLoadedCostModelHandler = () => {
    setLoadedCostModels(true);
  };

  const hideLoadedCostModelHandler = () => {
    setLoadedCostModels(false);
  };

  console.log(services);
  console.log(loadCostModels);

  return (
    <CostModelProvider>
      {/* {showCostModelView && <CostModelView onClose={hideCostModelViewHandler} />}
      {loadCostModels && <LoadedCostModels onClose={hideLoadedCostModelHandler} />}
      <Header onShowCostModel={showCostModelViewHandler} onLoadCostModels={showLoadedCostModelHandler} /> */}
      {/* <Route path="/load">
        <LoadedCostModels onClose={hideLoadedCostModelHandler} />
      </Route> */}
      <Layout>
        <Switch>
          <Route path="/diagram" exact>
            <Diagrams />
          </Route>
          <ConfigLayout>
            <Route path={["/rds", "/elb", "/cloudwatch"]} exact>
              <PlaceHolder />
            </Route>
            <Route path="/ec2">
              <EC2Config />
            </Route>
            <Route path="/s3">
              <S3Config />
            </Route>
            <Route path="/" exact>
              <Home />
            </Route>
          </ConfigLayout>
        </Switch>
      </Layout>
    </CostModelProvider>
  );
}


export default App;
