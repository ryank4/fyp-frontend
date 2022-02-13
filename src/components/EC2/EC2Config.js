import { useContext, useEffect, useState } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import classes from './EC2Config.module.css'
import { Fragment } from "react";
import ConfigItem from "./ConfigItem";
import useHttp from "../../hooks/use-http";
import InstanceTypeInfo from "./InstanceTypeInfo";
import CostModelContext from "../../store/cost-model-context";


const EC2Config = props => {

    //first argument is current state snapshot, second is function to call to change state 
    const [region, setRegion] = useState('us-east-2');
    const [os, setOS] = useState('Linux');
    const [instanceType, setInstanceType] = useState('a1.2xlarge');
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

    const [data, setData] = useState([]);

    // array destructuring; using fetchTasks as alias for sendRequest function
    const { isLoading, error, sendRequest: sendPriceRequest } = useHttp();

    
    useEffect(() => {
        const ec2Data = {
            os, instance_type: instanceType, region
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
    }, [sendPriceRequest, region, os, instanceType]);

    const onAddEC2Handler = (event) => {
        event.preventDefault();
        console.log(region, os, instanceType, price.price)
        props.onAddEC2(region, os, instanceType, price.price)
    };



    const addServiceHandler = () => {
        costModeltCtx.addService({
            id: Math.random().toString(),
            service: 'EC2',
            region: region,
            instanceType: instanceType,
            price: price.price
        });

        console.log(costModeltCtx.services);
    };

    const displayPrice = price.price === 0 ? 'Not Available' : '$' + price.price?.toFixed(2)
       
    return (
        <Fragment>
            <Card className={classes.input}>
                <form >
                    <ConfigItem id='os' label='Operating System' value={os} onChange={osChangeHandler} url='http://localhost:5000/attributes/ec2/os' />
                    <ConfigItem id='instance-type' label='Instance Type' value={instanceType} onChange={instanceTypeChangeHandler} url='http://localhost:5000/attributes/ec2/instancetype' />
                    <InstanceTypeInfo instanceType={instanceType} />
                    <ConfigItem id='region' label='Region' onChange={regionChangeHandler} value={region} url='http://localhost:5000/attributes/ec2/regions' />
                    <h2>Price: {isLoading ? '...' : displayPrice}</h2>
                    <Button type="button" onClick={addServiceHandler}>Add EC2</Button>
                </form>
            </Card>
        </Fragment>
    )
};

export default EC2Config;