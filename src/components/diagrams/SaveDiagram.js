import { Fragment, useState } from "react";
import useHttp from "../../hooks/use-http";
import useInput from "../../hooks/use-input";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import classes from "./SaveDiagram.module.css";

const SaveDiagram = (props) => {

    /* ----------------- Name Input Handler ---------------------*/
    const {
        value: diagramName,
        isValid: diagramNameIsValid,
        hasError: nameInputError,
        valueChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
        reset: resetName
    } = useInput(value => value.trim() !== '');

    let valid = false;
    if (diagramNameIsValid) {
        valid = true;
    }

    const confirmHandler = (event) => {
        event.preventDefault();

        if (!diagramNameIsValid) {
            return;
        }

        resetName();

    };

    const nameControlClasses = `${classes.control} ${nameInputError ? classes.invalid : ''}`;
    /* ----------------- Save Handler ----------------------------*/
    const [saved, setSaved] = useState('');
    const [saveResponse, setSaveResponse] = useState('');
    const { isLoading, error, sendRequest: saveDiagram } = useHttp();

    const saveResponseHandler = (res) => {
        setSaved(true);
        setSaveResponse(res.response);
    };


    const onSaveHandler = () => {
        const diagramData = {
            name: diagramName,
            diagramCode: props.diagram
        }
        console.log("SAVE DIAGRAM");
        saveDiagram({
            url: 'http://localhost:5001/diagram/save',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: diagramData
        }, saveResponseHandler);
    };

    const diagramSaveContent = (
        <form onSubmit={confirmHandler}>
        <div className={nameControlClasses}>
            <label htmlFor='name'>Diagram Name</label>
            <input
                type='text'
                id='name'
                onChange={nameChangeHandler}
                onBlur={nameBlurHandler}
                value={diagramName} />
        </div>
        <div className={classes.content}>
            <Button disabled={!valid} onClick={onSaveHandler}>Save</Button>
            <Button onClick={props.onClose}>Cancel</Button>
        </div>
    </form>
    )

    const saveResponseContent = (<Fragment>
        <p>{saveResponse}</p>
        <div className={classes.content}>
            <Button onClick={props.onClose}>OK</Button>
        </div>
    </Fragment>)

    return (
       <Modal>
           {!saved && diagramSaveContent}
           {saved && saveResponseContent}
       </Modal>
    );
};

export default SaveDiagram;