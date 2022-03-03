import { useState, useCallback, useEffect } from "react";
import classes from './InstanceTypeInfo.module.css'
import ErrorModal from "../UI/ErrorModal";
import { Fragment } from "react";
import useHttp from "../../hooks/use-http";
import Card from "../UI/Card";

const InstanceTypeInfo = props => {

    //first argument is current state snapshot, second is function to call to change state 
    const [data, setData] = useState([]);

    // array destructuring; using fetchTasks as alias for sendRequest function
    const { isLoading, error, sendRequest: fetchData } = useHttp();

    useEffect(() => {
        const dataList = (obj) => {
            const data = [];
            for (const key in obj) {
                data.push({ index: key, value: obj[key] });
            }
            setData(data);
        };

        fetchData({
            url: 'http://127.0.0.1:5000/ec2/attributes/instancetypeinfo',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: props.instanceType
        },
            dataList);

    }, [fetchData, props.instanceType]);

    console.log(data.map((d) => d.index + ":" + d.value));

    return (
        <div className={classes.container}>
            {!isLoading ?
                data.map((d) => {
                    return <span className={classes.info} key={d.index}><label>{d.index}</label>{d.value}</span>
                })
                : <p>Loading...</p>
            }
            {error && <p>{error}</p>}
        </div>
    )
};

export default InstanceTypeInfo;