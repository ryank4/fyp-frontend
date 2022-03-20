import { useContext, useEffect, useState } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import classes from './ELB.module.css'
import { Fragment } from "react";
import useHttp from "../../hooks/use-http";
import CostModelContext from "../../store/cost-model-context";
import ConfigItem from "../EC2/ConfigItem";


const ELBConfig = props => {

    //first argument is current state snapshot, second is function to call to change state 
    const [region, setRegion] = useState('US East (Ohio)');

    const [tcpProcessedBytes, setTcpProcessedBytes] = useState(0);
    const [tcpNewConnections, setTcpNewConnections] = useState(0);
    const [tcpAvgConnectionDuration, setTcpAvgConnectionDuration] = useState(0);

    const [udpProcessedBytes, setUdpProcessedBytes] = useState(0);
    const [udpNewConnections, setUdpNewConnections] = useState(0);
    const [udpAvgConnectionDuration, setUdpAvgConnectionDuration] = useState(0);

    const [tlsProcessedBytes, setTlsProcessedBytes] = useState(0);
    const [tlsNewConnections, setTlsNewConnections] = useState(0);
    const [tlsAvgConnectionDuration, setTlsAvgConnectionDuration] = useState(0);

    const [price, setPrice] = useState(0.00);

    const costModeltCtx = useContext(CostModelContext);

    const regionChangeHandler = (event) => {
        setRegion(event.target.value);
    }

    const tcpProcessedBytesChangeHandler = (event) => {
        setTimeout(() => {
            setTcpProcessedBytes(event.target.value);
        }, 1000);
    }

    const tcpNewConnectionsChangeHandler = (event) => {
        setTimeout(() => {
            setTcpNewConnections(event.target.value);
        }, 1000);
    }

    const tcpAvgConnectionDurationChangeHandler = (event) => {
        setTimeout(() => {
            setTcpAvgConnectionDuration(event.target.value);
        }, 1000);
    }

    const udpProcessedBytesChangeHandler = (event) => {
        setTimeout(() => {
            setUdpProcessedBytes(event.target.value);
        }, 1000);
    }

    const udpNewConnectionsChangeHandler = (event) => {
        setTimeout(() => {
            setUdpNewConnections(event.target.value);
        }, 1000);
    }

    const udpAvgConnectionDurationChangeHandler = (event) => {
        setTimeout(() => {
            setUdpAvgConnectionDuration(event.target.value);
        }, 1000);
    }

    const tlsProcessedBytesChangeHandler = (event) => {
        setTimeout(() => {
            setTlsProcessedBytes(event.target.value);
        }, 1000);
    }

    const tlsNewConnectionsChangeHandler = (event) => {
        setTimeout(() => {
            setTlsNewConnections(event.target.value);
        }, 1000);
    }

    const tlsAvgConnectionDurationChangeHandler = (event) => {
        setTimeout(() => {
            setTlsAvgConnectionDuration(event.target.value);
        }, 1000);
    }


    // array destructuring; using fetchTasks as alias for sendRequest function
    const { isLoading, error, sendRequest: sendPriceRequest } = useHttp();


    useEffect(() => {
        const elbData = {
            region, tcpProcessedBytes, tcpNewConnections, tcpAvgConnectionDuration, 
            udpProcessedBytes, udpNewConnections, udpAvgConnectionDuration,
            tlsProcessedBytes, tlsNewConnections, tlsAvgConnectionDuration
        }

        sendPriceRequest({
            url: 'http://localhost:5000/pricing/elb',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: elbData
        }, setPrice);


        return () => {
            console.log(elbData, price.price);
        }
    }, [sendPriceRequest,  region, tcpProcessedBytes, tcpNewConnections, tcpAvgConnectionDuration, 
        udpProcessedBytes, udpNewConnections, udpAvgConnectionDuration,
        tlsProcessedBytes, tlsNewConnections, tlsAvgConnectionDuration]);


    const addServiceHandler = () => {
        costModeltCtx.addService({
            id: Math.random().toString(),
            service: 'ELB',
            region, tcpProcessedBytes, tcpNewConnections, tcpAvgConnectionDuration, 
            udpProcessedBytes, udpNewConnections, udpAvgConnectionDuration,
            tlsProcessedBytes, tlsNewConnections, tlsAvgConnectionDuration,
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
                    <h2>Network Load Balancer</h2>
                    <ConfigItem id='region' label='Region' onChange={regionChangeHandler} value={region} url='http://localhost:5000/ec2/attributes/regions' />
                    
                    <h3>TCP Traffic</h3>
                    <label>Processed bytes per NLB for TCP</label>
                    <div className={classes.data}>
                        <input type="number" id='tcp-processed-bytes' label='Processed bytes per NLB for TCP' onChange={tcpProcessedBytesChangeHandler} />
                        <span>GB per hour</span>
                    </div>
                    <label>Average number of new TCP connections</label>
                    <div className={classes.data}>
                        <input type="number" id='tcp-new-connections' label='Average number of new TCP connections' onChange={tcpNewConnectionsChangeHandler} />
                        <span>per second</span>
                    </div>
                    <label>Average TCP connection duration</label>
                    <div className={classes.data}>
                        <input type="number" id='tcp-avg-connection' label='Average TCP connection duration' onChange={tcpAvgConnectionDurationChangeHandler} />
                        <span>seconds</span>
                    </div>

                    <h3>UDP Traffic</h3>
                    <label>Processed bytes per NLB for UDP</label>
                    <div className={classes.data}>
                        <input type="number" id='tcp-processed-bytes' label='Processed bytes per NLB for UDP' onChange={udpProcessedBytesChangeHandler} />
                        <span>GB per hour</span>
                    </div>
                    <label>Average number of new UDP Flows</label>
                    <div className={classes.data}>
                        <input type="number" id='udp-new-flows' label='Average number of new UDP Flows' onChange={udpNewConnectionsChangeHandler} />
                        <span>per second</span>
                    </div>
                    <label>Average UDP Flow duration</label>
                    <div className={classes.data}>
                        <input type="number" id='udp-avg-connection' label='Average UDP Flow duration' onChange={udpAvgConnectionDurationChangeHandler} />
                        <span>seconds</span>
                    </div>

                    <h3>TLS Traffic</h3>
                    <label>Processed bytes per NLB for TLS</label>
                    <div className={classes.data}>
                        <input type="number" id='tls-processed-bytes' label='Processed bytes per NLB for TLS' onChange={tlsProcessedBytesChangeHandler} />
                        <span>GB per hour</span>
                    </div>
                    <label>Average number of new TLS connections</label>
                    <div className={classes.data}>
                        <input type="number" id='tls-new-connections' label='Average number of new TLS connections' onChange={tlsNewConnectionsChangeHandler} />
                        <span>per second</span>
                    </div>
                    <label>Average TLS connection duration</label>
                    <div className={classes.data}>
                        <input type="number" id='tls-avg-connection' label='Average TLS connection duration' onChange={tlsAvgConnectionDurationChangeHandler} />
                        <span>seconds</span>
                    </div>

                    <h2>Price: {isLoading ? '...' : displayPrice}</h2>

                    <Button type="button" disabled={disableButton} onClick={addServiceHandler}>Add</Button>
                </form>
            </Card>
        </Fragment>
    )
};

export default ELBConfig;