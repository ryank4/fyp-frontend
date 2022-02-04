import { useState, useCallback, useEffect } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import classes from './EC2Config.module.css'
import ErrorModal from "../UI/ErrorModal";
import { Fragment } from "react";
import useHttp from "../../hooks/use-http";

// const transformList = (obj, setState) => {
//     const transformList = [];
//     for (const key in obj) {
//         transformList.push({ id: key, text: obj[key].text });
//     }
//     setState(transformList);
// };

const EC2Config = props => {

    //first argument is current state snapshot, second is function to call to change state 
    const [region, setRegion] = useState('');
    const [os, setOS] = useState([]);
    const [instanceType, setInstanceType] = useState([]);

    const [selectedOS, setSelectedOS] = useState('');
    const [selectedInstanceType, setSelectedInstanceType] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');
    // array destructuring; using fetchTasks as alias for sendRequest function
    const { isLoading, error, sendRequest: fetchOS } = useHttp();
    const { sendRequest: fetchInstanceType } = useHttp();

    useEffect(() => {
        const osList = (obj) => {
            const osList = [];
            for (const key in obj) {
                osList.push(obj[key]);
            }
        };
        fetchOS({ url: 'http://localhost:5000/attributes/ec2/os' },
        osList);

        const instanceTypeList = (obj) => {
            const instanceTypeList = [];
            for (const key in obj) {
                instanceTypeList.push(obj[key]);
            }
        };
        fetchInstanceType({ url: 'http://localhost:5000/attributes/ec2/instancetype' },
        instanceTypeList);

    }, [fetchOS, fetchInstanceType]);


    const regionChangeHandler = (event) => {
        setRegion(event.target.value);
    }

    const osChangeHandler = (event) => {
        setSelectedOS(event.target.value);
    }

    const instanceTypeChangeHandler = (event) => {
        selectedInstanceType(event.target.value);
    }
    console.log(typeof (os));

    let os_values = [];
    for (const o in os) {
        os_values.push(<option value={o}>{o}</option>);
    }

    return (
        <Fragment>
            {error && <p>{error.message}</p>}
            {isLoading && <p>Loading... </p>}
            <Card className={classes.input}>
                <form>
                    <label htmlFor="region">Region</label>
                    <input
                        id="region"
                        type="text"
                        value={region}
                        onChange={regionChangeHandler}

                    />
                    <label htmlFor="os">Operating System</label>
                    <select onChange={osChangeHandler}>
                        {os.map((value, index) => {
                            return <option key={index}>{value}</option>
                        })}
                    </select>

                    <label htmlFor="instance-type">Instance Type</label>
                    <input
                        id="instance-type"
                        type="text"
                        value={instanceType}
                        onChange={instanceTypeChangeHandler}
                    />
                    <Button type="submit">Add EC2</Button>
                </form>
            </Card>
        </Fragment>
    )
};

export default EC2Config;