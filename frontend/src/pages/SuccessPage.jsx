import React from "react";
import success from "../assets/images/success.gif";
import MetaData from "../components/MetaData";


const SuccessPage = () => {

  return (
    <div>
      <MetaData title="Payment Successful" />
      <div className="flex justify-center items-center">
        <img src={success} alt="Payment Success" />
      </div>
      <h2 className="text-center mb-20 text-lg">Payment was successful!</h2>
    </div>
  );
};

export default SuccessPage;
