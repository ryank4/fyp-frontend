import { useContext, useEffect, useState } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import classes from './RDSConfig.module.css'
import { Fragment } from "react";
import ConfigItem from "../General/ConfigItem";
import useHttp from "../../hooks/use-http";
import CostModelContext from "../../store/cost-model-context";


const RDSConfig = props => {

    //first argument is current state snapshot, second is function to call to change state 
    const [region, setRegion] = useState('US East (Ohio)');
    const [instanceType, setInstanceType] = useState('db.m4.10xlarge');
    const [deploymentOption, setDeploymentOption] = useState('Single-AZ');
    const [volumeType, setVolumeType] = useState('General Purpose (SSD)');
    const [showProvisionedIOPS, setShowProvisionedIOPS] = useState(false);
    const [provisionedIOPS, setProvisionedIOPS] = useState(0);
    const [storageAmount, setStorageAmount] = useState(0);
    const [price, setPrice] = useState(0.00);

    const costModeltCtx = useContext(CostModelContext);


    const regionChangeHandler = (event) => {
        setRegion(event.target.value);
    }

    const instanceTypeChangeHandler = (event) => {
        setInstanceType(event.target.value);
    }

    const deploymentOptionChangeHandler = (event) => {
        setDeploymentOption(event.target.value);
    }

    const volumeTypeChangeHandler = (event) => {
        setVolumeType(event.target.value);
        if (volumeType === "Provisioned IOPS (SSD)") {
            setShowProvisionedIOPS(true);
        }
        else {
            setShowProvisionedIOPS(false);
        }    
    }

    const storageAmountChangeHandler = (event) => {
        setTimeout(() => {
            setStorageAmount(event.target.value);
        }, 1000);
    }

    const provisionedIOPSChangeHandler = (event) => {
        setTimeout(() => {
            setProvisionedIOPS(event.target.value);
        }, 1000);
    }

    console.log(showProvisionedIOPS);

    
    const provisionedIOPSContent = (
        <div>
            <label>Provisioning IOPS</label>
            <input type="number" id='provisioning-iops' label='Provisioning-IOPS' onChange={provisionedIOPSChangeHandler} />
        </div>
    )

    // array destructuring; using fetchTasks as alias for sendRequest function
    const { isLoading, error, sendRequest: sendPriceRequest } = useHttp();


    useEffect(() => {
        const rdsData = {
            region, instanceType, deploymentOption, volumeType, storageAmount
        }

        sendPriceRequest({
            url: 'http://localhost:5000/pricing/rds',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: rdsData
        }, setPrice);


        return () => {
            console.log(region, instanceType, deploymentOption, volumeType, storageAmount, price.price);
        }
    }, [sendPriceRequest, region, instanceType, deploymentOption, volumeType, storageAmount]);


    const addServiceHandler = () => {
        costModeltCtx.addService({
            id: Math.random().toString(),
            service: 'RDS',
            region,
            instanceType,
            deploymentOption,
            volumeType,
            storageAmount,
            price: price.price
        });

        console.log(costModeltCtx.services);
    };

    const displayPrice = price.price === 0 ? 'Not Available' : '$' + price.price?.toFixed(2)
    const disableButton = price.price === 0

    return (
        <Fragment>
            <Card className={classes.container}>
                <h2>MySQL</h2>
                <form >
                    <ConfigItem id='region' label='Region' onChange={regionChangeHandler} value={region} url='http://localhost:5000/ec2/attributes/regions' />

                    <h2>DB Instance</h2>
                    <ConfigItem id='instance-type' label='Instance Type' value={instanceType} onChange={instanceTypeChangeHandler} url='http://localhost:5000/rds/attributes/instancetype' />

                    <label>Deployment option</label>
                    <select onChange={deploymentOptionChangeHandler}><option>Single-AZ</option><option>Multi-AZ</option></select>

                    <h2>Storage</h2>
                    <label>Storage Type</label>
                    <select onChange={volumeTypeChangeHandler}><option>General Purpose (SSD)</option><option>Provisioned IOPS (SSD)</option><option>Magnetic</option></select>

                    {showProvisionedIOPS && provisionedIOPSContent}
                    
                    <label>Storage Amount</label>
                    <div className={classes.data} >
                        <input type="number" id='storage-amount' label='Storage-Amount' onChange={storageAmountChangeHandler} />
                        <span>GB</span>
                    </div>

                    <h2>Price: {isLoading ? '...' : displayPrice}</h2>
                    <Button type="button" disabled={disableButton} onClick={addServiceHandler}>Add</Button>
                </form>
            </Card>
        </Fragment>
    )
};

export default RDSConfig;