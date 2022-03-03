import { useContext, useEffect, useState } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import classes from './S3Config.module.css'
import { Fragment } from "react";
import useHttp from "../../hooks/use-http";
import CostModelContext from "../../store/cost-model-context";
import ConfigItem from "../EC2/ConfigItem";


const S3Config = props => {

    //first argument is current state snapshot, second is function to call to change state 
    const [region, setRegion] = useState('US East (Ohio)');
    const [storage, setStorage] = useState(0);
    const [requests1, setRequests1] = useState(0);
    const [requests2, setRequests2] = useState(0);
    const [dataReturned, setDataReturned] = useState(0);
    const [dataScanned, setDataScanned] = useState(0);
    const [dataOutTo, setDataOutTo] = useState('internet');
    const [dataOut, setDataOut] = useState(0);
    const [price, setPrice] = useState(0.00);

    const costModeltCtx = useContext(CostModelContext);

    const regionChangeHandler = (event) => {
        setRegion(event.target.value);
    }

    const storageChangeHandler = (event) => {
        setTimeout(() => {
            setStorage(event.target.value);
        }, 1000);
    }

    const requests1ChangeHandler = (event) => {
        setTimeout(() => {
            setRequests1(event.target.value);
        }, 1000);
    }

    const requests2ChangeHandler = (event) => {
        setTimeout(() => {
            setRequests2(event.target.value);
        }, 1000);
    }

    const dataReturnedChangeHandler = (event) => {
        setTimeout(() => {
            setDataReturned(event.target.value);
        }, 1000);
    }

    const dataScannedChangeHandler = (event) => {
        setTimeout(() => {
            setDataScanned(event.target.value);
        }, 1000);
    }

    const dataOutChangeHandler = (event) => {
        setTimeout(() => {
            setDataOut(event.target.value);
        }, 1000);
    }

    const dataOutToChangeHandler = (event) => {
        setDataOutTo(event.target.value);
    }

    // array destructuring; using fetchTasks as alias for sendRequest function
    const { isLoading, error, sendRequest: sendPriceRequest } = useHttp();


    useEffect(() => {
        const s3Data = {
            region, storage, requests1, requests2, dataReturned, dataScanned, dataOutTo, dataOut
        }

        sendPriceRequest({
            url: 'http://localhost:5000/pricing/s3',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: s3Data
        }, setPrice);


        return () => {
            console.log(s3Data, price.price);
        }
    }, [sendPriceRequest, region, storage, requests1, requests2, dataReturned, dataScanned, dataOutTo, dataOut]);


    const addServiceHandler = () => {
        costModeltCtx.addService({
            id: Math.random().toString(),
            service: 'S3',
            region, region,
            storage: storage,
            requests1: requests1,
            requests2: requests2,
            dataReturned: dataReturned,
            dataScanned, dataScanned,
            dataOutTo: dataOutTo,
            dataOut: dataOut,
            price: price.price
        });

        console.log(costModeltCtx.services);
    };

    const displayPrice = undefined ? 'Not Available' : '$' + price.price?.toFixed(2)
    const disableButton = price.price === undefined

    return (
        <Fragment>
            <Card className={classes.container}>
                <form >
                    <ConfigItem id='region' label='Region' onChange={regionChangeHandler} value={region} url='http://localhost:5000/ec2/attributes/regions' />
                    <label>S3 Standard storage</label>
                    <input type="number" id='s3-standard-storage' label='S3-Standard-Storage' onChange={storageChangeHandler} />
                    <label>PUT, COPY, POST, LIST requests to S3 Standard</label>
                    <input type="number" id='requests1' label='PUT, COPY, POST, LIST requests to S3 Standard' onChange={requests1ChangeHandler} />
                    <label>GET, SELECT, and all other requests from S3 Standard</label>
                    <input type="number" id='requests2' label='GET, SELECT, and all other requests from S3 Standard' onChange={requests2ChangeHandler} />
                    <label>Data returned by S3 Select</label>
                    <input type="number" id='data-returned' label='Data returned by S3 Select' onChange={dataReturnedChangeHandler} />
                    <label>Data scanned by S3 Select</label>
                    <input type="number" id='data-scanned' label='Data scanned by S3 Select' onChange={dataScannedChangeHandler} />
                    <label>Outbound Data Transfer</label>
                    <select onChange={dataOutToChangeHandler}><option>internet</option><option>other regions</option></select>
                    <div className={classes.data}>
                        <input type="number" id='out-data-transfer' label='Outbound Data Transfer' onChange={dataOutChangeHandler} />
                        <span>TB per month</span>
                    </div>
                    <h2>Price: {isLoading ? '...' : displayPrice}</h2>
                    <Button type="button" disabled={disableButton} onClick={addServiceHandler}>Add</Button>
                </form>
            </Card>
        </Fragment>
    )
};

export default S3Config;