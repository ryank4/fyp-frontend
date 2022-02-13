import { useState } from "react";
import { Fragment } from "react/cjs/react.production.min";
import useHttp from "../../hooks/use-http";
import Button from "../UI/Button";

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
    <Fragment>
      <Button disabled={!props.valid} onClick={onSaveHandler}>Confirm</Button>
      <Button onClick={props.onClose}>Cancel</Button>
    </Fragment>

  );
};

export default SaveCostModel;