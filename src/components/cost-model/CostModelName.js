import { useContext, useEffect, useRef, useState } from 'react';
import useInput from '../../hooks/use-input';
import CostModelContext from '../../store/cost-model-context';
import classes from './CostModelName.module.css';

const CostModelName = (props) => {
    const {
        value: enteredName,
        isValid: enteredNameIsValid,
        hasError: nameInputError,
        valueChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
        reset: resetName
    } = useInput(value => value.trim() !== '');

    let valid = false;
    if (enteredNameIsValid) {
        valid = true;
    }

    const costModelCtx = useContext(CostModelContext);
    useEffect(() => {
        if (enteredNameIsValid) {
            costModelCtx.addName(enteredName);
        }
        console.log(costModelCtx);
        props.saveValidity(valid);

    }, [enteredName]);

    const confirmHandler = (event) => {
        event.preventDefault();

        if (!enteredNameIsValid) {
            return;
        }

        resetName();

    };

    const nameControlClasses = `${classes.control} ${nameInputError ? classes.invalid : ''}`;

    return (
        <form onSubmit={confirmHandler}>
            <div className={nameControlClasses}>
                <label htmlFor='name'>Cost Model Name</label>
                <input
                    type='text'
                    id='name'
                    onChange={nameChangeHandler}
                    onBlur={nameBlurHandler}
                    value={enteredName} />
            </div>
            {nameInputError && <p className='error-text'>Please provide a name.</p>}
            {/* <SaveCostModel costModel={props.costModel} valid={valid} onClose={props.onClose} onSave={costModelSaveResponse}/> */}
        </form>
    )
}

export default CostModelName;