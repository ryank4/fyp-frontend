import { useContext, useEffect, useState } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import classes from './CloudWatch.module.css'
import { Fragment } from "react";
import useHttp from "../../hooks/use-http";
import CostModelContext from "../../store/cost-model-context";
import ConfigItem from "../General/ConfigItem";


const CloudWatch = props => {

    //first argument is current state snapshot, second is function to call to change state 
    const [region, setRegion] = useState('US East (Ohio)');

    const [numMetrics, setNumMetrics] = useState(0);
    const [getMetricData, setGetMetricData] = useState(0);
    const [getMetricWidgetImage, setMetricWidgetImage] = useState(0);
    const [otherMetrics, setOtherMetrics] = useState(0);

    const [standardLogs, setStandardLogs] = useState(0);
    const [logsDeliveredToCloudwatch, setLogsDeliveredToCloudwatch] = useState(0);
    const [logsDeliveredToS3, setLogsDeliveredToS3] = useState(0);

    const [logStorage, setLogStorage] = useState('No');
    const [parquetConversion, setParquetConversion] = useState('Disabled');

    const [price, setPrice] = useState(0.00);

    const costModeltCtx = useContext(CostModelContext);

    const regionChangeHandler = (event) => {
        setRegion(event.target.value);
    }

    const numMetricsChangeHandler = (event) => {
        setTimeout(() => {
            setNumMetrics(event.target.value);
        }, 1000);
    }

    const getMetricDataChangeHandler = (event) => {
        setTimeout(() => {
            setGetMetricData(event.target.value);
        }, 1000);
    }

    const getMetricWidgetImageChangeHandler = (event) => {
        setTimeout(() => {
            setMetricWidgetImage(event.target.value);
        }, 1000);
    }

    const otherMetricsChangeHandler = (event) => {
        setTimeout(() => {
            setOtherMetrics(event.target.value);
        }, 1000);
    }

    const standardLogsChangeHandler = (event) => {
        setTimeout(() => {
            setStandardLogs(event.target.value);
        }, 1000);
    }

    const logsDeliveredToCloudwatchChangeHandler = (event) => {
        setTimeout(() => {
            setLogsDeliveredToCloudwatch(event.target.value);
        }, 1000);
    }

    const logsDeliveredToS3ChangeHandler = (event) => {
        setTimeout(() => {
            setLogsDeliveredToS3(event.target.value);
        }, 1000);
    }

    const logStorageChangeHandler = (event) => {
        setLogStorage(event.target.value);
    }

    const parquetConversionChangeHandler = (event) => {
        setParquetConversion(event.target.value);
    }


    // array destructuring; using sendPriceRequest as alias for sendRequest function
    const { isLoading, error, sendRequest: sendPriceRequest } = useHttp();


    useEffect(() => {
        const cloudwatchData = {
            region, numMetrics, getMetricData, getMetricWidgetImage, otherMetrics, standardLogs, logsDeliveredToCloudwatch,
            logsDeliveredToS3, logStorage, parquetConversion
        }

        sendPriceRequest({
            url: 'http://localhost:5000/pricing/cloudwatch',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: cloudwatchData
        }, setPrice);


        return () => {
            console.log(cloudwatchData, price.price);
        }
    }, [sendPriceRequest, region, numMetrics, getMetricData, getMetricWidgetImage, otherMetrics, standardLogs, logsDeliveredToCloudwatch,
        logsDeliveredToS3, logStorage, parquetConversion]);


    const addServiceHandler = () => {
        costModeltCtx.addService({
            id: Math.random().toString(),
            service: 'CloudWatch',
            region, numMetrics, getMetricData, getMetricWidgetImage, otherMetrics, standardLogs, logsDeliveredToCloudwatch,
            logsDeliveredToS3, logStorage, parquetConversion,
            price: price.price
        });

        console.log(costModeltCtx.services);
    };

    const displayPrice = undefined ? 'Not Available' : '$' + price.price?.toFixed(2)
    const disableButton = price.price === undefined

    return (
        <Fragment>
            <Card className={classes.container}>
                <form>
                    <ConfigItem id='region' label='Region' onChange={regionChangeHandler} value={region} url='http://localhost:5000/ec2/attributes/regions' />

                    <h3>Metrics</h3>
                    <label>Number of Metrics (includes detailed and custom metrics)</label>
                    <input type="number" id='num-metrics' label='Number of Metrics' onChange={numMetricsChangeHandler} />

                    <h3>APIs</h3>
                    <label>GetMetricData: Number of metrics requested</label>
                    <input type="number" id='get-metric-data' label='GetMetricData' onChange={getMetricDataChangeHandler} />
                    <label>GetMetricWidgetImage: Number of metrics requested</label>
                    <input type="number" id='metric-widget' label='GetMetricWidgetImage' onChange={getMetricWidgetImageChangeHandler} />
                    <label>Number of other API requests</label>
                    <input type="number" id='other-requests' label='OtherRequests' onChange={otherMetricsChangeHandler} />

                    <h3>Logs</h3>
                    <label>Standard Logs: Data Ingested</label>
                    <div className={classes.data}>
                        <input type="number" id='standard-logs' label='Standard Logs' onChange={standardLogsChangeHandler} />
                        <span>GB</span>
                    </div>
                    <h4>Vended Logs</h4>
                    <p>Vended logs are specific AWS service logs natively published by AWS services</p>
                    <p>Supported service logs include: Amazon VPC flow logs, AWS Global Accelerator flow logs, Managed Streaming for Kafka (MSK) broker logs, Amazon Route 53 public DNS query logs, Amazon Route 53 Resolver query logs, and Amazon ElastiCache for Redis logs.</p>

                    <label>Logs Delivered to CloudWatch Logs</label>
                    <div className={classes.data}>
                        <input type="number" id='delivered-cloudwatch-logs' label='Delivered to CloudWatch Logs' onChange={logsDeliveredToCloudwatchChangeHandler} />
                        <span>GB</span>
                    </div>
                    <label>Log Storage/Archival (Standard and Vended Logs)</label>
                    <p>Log volume archived is estimated to be 15% of Log volume ingested (due to compression). Storage/Archival costs are estimated assuming customer choses a retention period of one (1) month. Default retention setting is 'never expire'.</p>
                    <select value={logStorage} onChange={logStorageChangeHandler}><option>Yes</option><option>No</option></select>
                    <label>Logs Delivered to S3</label>
                    <div className={classes.data}>
                        <input type="number" id='delivered-s3' label='Delivered to S3' onChange={logsDeliveredToS3ChangeHandler} />
                        <span>GB</span>
                    </div>
                    <p>Logs stored in S3 can be priced with S3 price configuration component</p>

                    <label>Logs Delivered to S3: Format Converted to Apache Parquet</label>
                    <select value={parquetConversion} onChange={parquetConversionChangeHandler}><option>Enabled</option><option>Disabled</option></select>
                    <h2>Price: {isLoading ? '...' : displayPrice}</h2>

                    <Button type="button" disabled={disableButton} onClick={addServiceHandler}>Add</Button>
                </form>
            </Card>
        </Fragment>
    )
};

export default CloudWatch;