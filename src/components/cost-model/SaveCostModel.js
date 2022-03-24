import useHttp from "../../hooks/use-http";
import Button from "../UI/Button";
import classes from "./SaveCostModel.module.css";

const SaveCostModel = (props) => {
  const { isLoading, error, sendRequest: saveCostModel } = useHttp();

  const saveResponseHandler = (res) => {
    props.onSaveResponse(res.response);
  };


  const onSaveHandler = () => {
    saveCostModel({
      url: 'http://localhost:5000/pricing/save',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: props.costModel
    }, saveResponseHandler);
  };

  console.log(props.valid);
  return (
    <div className={classes.content}>
      <Button disabled={!props.valid} onClick={onSaveHandler}>Save</Button>
      <Button onClick={props.onClose}>Cancel</Button>
    </div>

  );
};

export default SaveCostModel;