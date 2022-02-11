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
            url: 'http://127.0.0.1:5000/attributes/ec2/instancetypeinfo',
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
        <Card className={classes.info}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridGap: 20 }}>
                {!isLoading ?
                    data.map((d) => {
                        return <div key={d.index}>{d.index + ":" + d.value}</div>
                    })
                    : <p>Loading...</p>
                }
                {error && <p>{error}</p>}
            </div>
        </Card>
    )
};

export default InstanceTypeInfo;