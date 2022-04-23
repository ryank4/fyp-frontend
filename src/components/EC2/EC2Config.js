import { useContext, useEffect, useState } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import classes from './EC2Config.module.css'
import { Fragment } from "react";
import ConfigItem from "../General/ConfigItem";
import useHttp from "../../hooks/use-http";
import InstanceTypeInfo from "./InstanceTypeInfo";
import CostModelContext from "../../store/cost-model-context";


const EC2Config = props => {

    //first argument is current state snapshot, second is function to call to change state 
    const [region, setRegion] = useState('US East (Ohio)');
    const [os, setOS] = useState('Linux');
    const [instanceType, setInstanceType] = useState('a1.2xlarge');
    const [dataIntra, setDataIntra] = useState(0);
    const [dataOutTo, setDataOutTo] = useState('internet');
    const [dataOut, setDataOut] = useState(0);
    const [price, setPrice] = useState(0.00);

    const costModeltCtx = useContext(CostModelContext);


    const regionChangeHandler = (event) => {
        setRegion(event.target.value);
    }

    const osChangeHandler = (event) => {
        setOS(event.target.value);
    }

    const instanceTypeChangeHandler = (event) => {
        setInstanceType(event.target.value);
    }

    const dataIntraChangeHandler = (event) => {
        setTimeout(() => {
            setDataIntra(event.target.value);
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
        const ec2Data = {
            os, instance_type: instanceType, region, dataIntra, dataOut, dataOutTo
        }

        sendPriceRequest({
            url: 'http://localhost:5000/pricing/ec2',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: ec2Data
        }, setPrice);


        return () => {
            console.log(region, os, instanceType, price.price);
        }
    }, [sendPriceRequest, region, os, instanceType, dataIntra, dataOutTo, dataOut]);


    const addServiceHandler = () => {
        costModeltCtx.addService({
            _id: Math.random().toString(),
            service: 'EC2',
            region: region,
            os: os,
            instanceType: instanceType,
            dataIntra: dataIntra,
            dataOutTo: dataOutTo,
            dataOut: dataOut,
            price: price.price
        });

        console.log(costModeltCtx.services);
    };

    const displayPrice = price.price === 0 ? 'Not Available' : '$' + price.price?.toFixed(2)
    const disableButton = price.price === 0

    return (
        <Fragment>
            <Card className={classes.container}>
                <form >
                    <ConfigItem id='region' label='Region' onChange={regionChangeHandler} value={region} url='http://localhost:5000/ec2/attributes/regions' />
                    <ConfigItem id='os' label='Operating System' value={os} onChange={osChangeHandler} url='http://localhost:5000/ec2/attributes/os' />
                    <ConfigItem id='instance-type' label='Instance Type' value={instanceType} onChange={instanceTypeChangeHandler} url='http://localhost:5000/ec2/attributes/instancetype' />
                    <InstanceTypeInfo instanceType={instanceType} />
                    <label>Intra-Region Data Transfer</label>
                    <div className={classes.data} >
                        <input type="number" id='intra-data-transfer' label='Intra-Region Data Transfer' onChange={dataIntraChangeHandler} />
                        <span>TB per month</span>
                    </div>
                    <label>Outbound Data Transfer</label>
                    <select onChange={dataOutToChangeHandler}><option>internet</option><option>other regions</option></select>
                    <div className={classes.data} >              
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

export default EC2Config;