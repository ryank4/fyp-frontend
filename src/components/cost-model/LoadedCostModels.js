import { useCallback, useContext, useEffect, useState } from "react";
import { Fragment } from "react/cjs/react.production.min";
import useHttp from "../../hooks/use-http";
import CostModelContext from "../../store/cost-model-context";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import GeneralModel from "../UI/GeneralModal";
import Modal from "../UI/Modal";
import classes from './LoadedCostModels.module.css'

const LoadedCostModels = (props) => {
    const [loadedCostModels, setLoadedCostModels] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const { isLoading, error, sendRequest: loadCostModels } = useHttp();

    const [costModel, setCostModel] = useState([]);
    const { isLoadingCostModel, errorCostModel, sendRequest: loadCostModelData } = useHttp();
    const costModeltCtx = useContext(CostModelContext);


    const costModelData = useCallback((obj) => {
        setCostModel(obj);
        setLoaded(true);
        costModeltCtx.clearCostModel();
        costModeltCtx.loadCostModel(obj);
    });



    console.log(costModeltCtx);

    let costModelContent = [];
    for (const key in costModel.serviceDetails) {
        costModelContent.push(<h4>{costModel.serviceDetails[key].service}</h4>)
        for (const k in costModel.serviceDetails[key]) {
            costModelContent.push(k !== 'id' && k !== 'service' ? <ul>
                <li id={costModel.serviceDetails[key].id}>{k + ": " + costModel.serviceDetails[key][k]}</li>
            </ul> : '')
        }
    }
    costModelContent.push(<h4>Total Monthly Cost: ${costModel.totalCost}</h4>)
    console.log(costModel.serviceDetails)


    const onLoadCostModelHandler = (name) => {
        console.log(name);
        loadCostModelData({
            url: 'http://localhost:5000/pricing/load_one',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: name
        }, costModelData);


    };

    console.log(costModel);
    console.log(errorCostModel);

    useEffect(() => {
        const dataList = (obj) => {
            const data = [];
            for (const key in obj) {
                data.push(
                    <li>
                        <h3>{obj[key]}</h3>
                        <Button onClick={onLoadCostModelHandler.bind(null, obj[key])}>Load</Button>
                    </li>
                );
            }
            setLoadedCostModels(data);
        };

        loadCostModels({ url: 'http://localhost:5000/pricing/load_all' },
            dataList);

    }, [loadCostModels]);


    console.log(loadedCostModels);

    const displayData = isLoading ? <p>Loading...</p> : <ul className={classes['cost-models']}>{loadedCostModels}</ul>

    return (
        <Fragment>
            {!loaded && <GeneralModel title="Saved Cost Models" message={displayData} onConfirm={props.onClose} />}
            {error && <ErrorModal title={"Error"} message={error} onConfirm={props.onClose} />}
            {loaded && <GeneralModel title={costModel.name} message="Load Successful" onConfirm={props.onClose} />}
        </Fragment>
    );
};

export default LoadedCostModels;