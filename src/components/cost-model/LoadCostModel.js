import { useCallback, useEffect, useState } from "react";
import { Fragment } from "react/cjs/react.production.min";
import useHttp from "../../hooks/use-http";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import Modal from "../UI/Modal";

const LoadCostModel = () => {
    const [costModel, setCostModel] = useState([]);
    const [show, setShow] = useState(false);
    const { isLoading, error, sendRequest: loadCostModel } = useHttp();

    useEffect(() => {

    })
    const dataList = useCallback((obj) => {
        console.log(obj);
        // const data = [];
        // for (const key in obj) {
        //     data.push(obj[key]);
        // }
        const tranform = {
            name: obj.name,
            serviceDetails: obj.serviceDetails,
            totalCost: obj.totalCost

        }

        setCostModel(tranform);


        setShow(true);
    });

    const showHandler = () => {
        setShow(false); // set error to a falsy value so modal is not rendered
    };

    const errorHandler = () => {
        error = false; // set error to a falsy value so modal is not rendered
    };

    const onLoadHandler = () => {
        loadCostModel({
            url: 'http://localhost:5000/pricing/load',
        }, dataList);
    };

    return (
        <Fragment>
            <Button onClick={onLoadHandler}>Load</Button>
            {show && <Modal title="Cost Model" message={costModel} onConfirm={showHandler} />}
            {error && <ErrorModal title={"Error"} message={error} onConfirm={errorHandler} />}
        </Fragment>
    );
};

export default LoadCostModel;