import { useCallback, useEffect, useState } from "react";
import { Fragment } from "react/cjs/react.production.min";
import useHttp from "../../hooks/use-http";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import GeneralModel from "../UI/GeneralModal";
import classes from './LoadDiagrams.module.css'

const LoadDiagram = (props) => {
    const [loadedDiagrams, setLoadedDiagrams] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const { isLoading, error, sendRequest: loadDiagrams } = useHttp();

    const [diagram, setDiagram] = useState([]);
    const { isLoadingCostModel, errorCostModel, sendRequest: loadCostModelData } = useHttp();

    const costModelData = useCallback((obj) => {
        setDiagram(obj);
        setLoaded(true);
    });

    const loadedDiagramsAsCodeHandler = (data) => {
        console.log(data);
        props.onDiagramLoad(data.code);
    }

    const onLoadDiagramHandler = (name) => {
        console.log(name);
        loadCostModelData({
            url: 'http://localhost:5001/diagram/loaddiagram',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: name
        }, loadedDiagramsAsCodeHandler);

    };


    useEffect(() => {
        const dataList = (obj) => {
            const data = [];
            for (const key in obj) {
                data.push(
                    <li>
                        <h3>{obj[key]}</h3>
                        <Button onClick={onLoadDiagramHandler.bind(null, obj[key])}>Load</Button>
                    </li>
                );
            }
            setLoadedDiagrams(data);
        };

        loadDiagrams({ url: 'http://localhost:5001/diagram/loadalldiagrams' },
            dataList);

    }, [loadDiagrams]);



    const displayData = isLoading ? <p>Loading...</p> : <ul className={classes['diagrams']}>{loadedDiagrams}</ul>

    return (
        <Fragment>
            {!loaded && <GeneralModel title="Saved Diagrams as Code" message={displayData} onConfirm={props.onClose} />}
            {error && <ErrorModal title={"Error"} message={error} onConfirm={props.onClose} />}
            {loaded && <GeneralModel title={diagram.name} message="Load Successful" onConfirm={props.onClose} />}
        </Fragment>
    );
};

export default LoadDiagram;