import Card from "../UI/Card";
import classes from './EC2List.module.css'

const EC2List = props => {
    return (
        <Card className={classes.ec2}>
            <ul>
                {props.ec2List.map((ec2) => (
                    <li key={ec2.id} > 
                    {ec2.region} {ec2.os} {ec2.instanceType} {ec2.price}</li>
                ))}
            </ul>
        </Card>
    );
};

export default EC2List;