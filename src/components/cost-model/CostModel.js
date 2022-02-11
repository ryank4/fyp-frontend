import Card from "../UI/Card";
import LoadCostModel from "./LoadCostModel";
import SaveCostModel from "./SaveCostModel";
import classes from './CostModel.module.css'

const CostModel = props => {
    return (
        <Card className={classes.costModel}>
             <SaveCostModel costModel={props.costModel} />
             <LoadCostModel />
        </Card>
    );
};

export default CostModel;