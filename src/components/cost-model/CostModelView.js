import { Fragment, useContext, useState } from "react";
import CostModelContext from "../../store/cost-model-context";
import Modal from "../UI/Modal";
import SaveCostModel from "./SaveCostModel";
import classes from "../UI/Modal.module.css";
import viewClasses from "./CostModelView.module.css";
import Card from "../UI/Card";
import CostModelName from "./CostModelName";
import Button from "../UI/Button";

const CostModelView = props => {
    const costModelCtx = useContext(CostModelContext);
    const { services, totalCost } = costModelCtx;

    const [isSaving, setIsSaving] = useState(false);
    const [didSave, setDidSave] = useState(false);
    const [valid, setValid] = useState(false);
    const [saveResponse, setSaveResponse] = useState('');

    let content = [];
    const costModel = [];

    const costModelRemoveHandler = id => {
        costModelCtx.removeService(id)
    };

    for (const key in services) {
        content.push(<h4>{services[key].service}</h4>)
        for (const k in services[key]) {
            content.push(k !== 'id' && k !== 'service' ? <ul>
                <li id={services[key].id}>{k + ": " + services[key][k]}</li>
            </ul> : '')
            costModel.push({ index: k, value: services[key][k] });
        }
        content.push(<button className={viewClasses.button} onClick={costModelRemoveHandler.bind(null, services[key].id)}>Remove</button>)
    }
    costModel.push({ index: 'name', value: costModelCtx.name })
    content.push(<h4>Total Monthly Cost: ${totalCost.toFixed(2)}</h4>)
    console.log(costModel);


    const saveHandler = () => {
        setIsSaving(true);
    };

    const onSaveValidityHandler = (value) => {
        setValid(value);
    };

    const onSaveComplete = (res) => {
        setDidSave(true);
        setSaveResponse(res);
        setIsSaving(false);
        costModelCtx.clearCostModel();
        console.log(saveResponse);
    };

    const disableSave = totalCost === 0

    const modalActions = <div>
        <Button onClick={props.onClose}>Close</Button>
        <Button disabled={disableSave} onClick={saveHandler}>Save</Button>
    </div>

    const costModelContent = (
        <Card className={classes.modal}>
            <header className={classes.header}>
                <h2>Cost Model</h2>
            </header>
            <div className={classes.content}>
                {content}
            </div>
            <div>
                {isSaving && <CostModelName costModel={costModel} onClose={props.onClose} saveValidity={onSaveValidityHandler} />}
            </div>
            <footer className={classes.actions}>
                {!isSaving && modalActions}
                {isSaving && <SaveCostModel costModel={costModel} valid={valid} onClose={props.onClose} onSaveResponse={onSaveComplete} />}
                {/* <SaveCostModel costModel={costModel} /> */}
            </footer>
        </Card>
    )

    const didSaveContent = (<Fragment>
        <p>{saveResponse}</p>
        <div>
            <Button onClick={props.onClose}>OK</Button>
        </div>
    </Fragment>)

    return (
        <Modal onClose={props.onClose} >
            {!didSave && costModelContent}
            {didSave && didSaveContent}
        </Modal>
    )
}
export default CostModelView;