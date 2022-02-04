import { useState, useCallback, useEffect } from "react";
import classes from './ConfigItem.module.css'
import ErrorModal from "../UI/ErrorModal";
import { Fragment } from "react";
import useHttp from "../../hooks/use-http";

const ConfigItem = props => {

    //first argument is current state snapshot, second is function to call to change state 
    const [data, setData] = useState([]);

    // array destructuring; using fetchTasks as alias for sendRequest function
    const { isLoading, error, sendRequest: fetchData } = useHttp();

    useEffect(() => {
        const dataList = (obj) => {
            const data = [];
            for (const key in obj) {
                data.push({index: key, value: obj[key]});
            }
            setData(data);
        };

        fetchData({ url: props.url },
            dataList);

    }, [fetchData]);

    return (
        <Fragment>
            <label className={classes.label} htmlFor={props.id}>{props.label}</label>
            {<select className={classes.select} onChange={props.onChange} value={props.value}>
                {isLoading ? <option>Loading... </option> : data.map((d) => {
                    return <option key={d.index}>{d.value}</option>
                })}
            </select>}
        </Fragment>
    )
};

export default ConfigItem;