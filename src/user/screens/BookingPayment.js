import React, { useState } from "react";

import logo from "../public/image/logo/logo.png";
import "./App.css";
import { useLocation } from "react-router-dom";

const App = () => {
  const location = useLocation();
  const { data } = location.state;
  console.log(data.payableAmount, "data");
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     payment_amount: 0,
  //   };

  //   this.paymentHandler = this.paymentHandler.bind(this);
  // }
  const [paymentAmt, setPaymentAmt] = useState(data.payableAmount);

  // const { payment_amount } = this.state;
  const paymentHandler = () => {
    console.log(paymentAmt, "paymentAmt");
    const options = {
      key: "rzp_test_bolvGRv48sO691",
      amount: paymentAmt * 100,
      name: "Payments",
      image: logo,
      description: "Donate yourself some time",
      prefill: {
        name: "Shashank Shekhar",
        email: "ss@localtrip.in",
        contact: "9999999999",
      },
      notes: {
        address: "Goa,India",
      },
      theme: {
        color: "#9D50BB",
      },
      handler(response) {
        const paymentId = response.razorpay_payment_id;
        console.log("hi1---------");
        const url =
          "http://localhost:3000/api/v1/rzp_capture/" +
          paymentId +
          "/" +
          paymentAmt;
        // Using my server endpoints to capture the payment
        console.log("hi2---------");
        fetch(url, {
          method: "get",
          headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
        })
          .then((resp) => {
            console.log("hi3---------");

            resp.json();
            console.log("hi4---------");
          })
          .then(function (data) {
            //api call insert booking
            console.log(paymentAmt, "payment done");
            console.log("Request succeeded with JSON response", data);
          })
          .catch(function (error) {
            //error booking
            console.log("Request failed", error);
          });
      },
    };
    const rzp1 = new window.Razorpay(options);

    rzp1.open();
  };

  return (
    <div className="wrapper">
      <div className="payments">
        <div className="payments-title">
          <h1>Test Payments</h1>
        </div>
        <div className="payments-form">
          <form action="#" onSubmit={paymentHandler()}>
            <p>
              <label htmlFor="pay_amount" className="pay_amount">
                Amount to be paid
              </label>
            </p>
            <input
              type="number"
              defaultValue={paymentAmt}
              className="pay_amount"
              placeholder="Amount in INR"
              onChange={(e) => setPaymentAmt(e.target.value)}
            />
            <p>
              <button type="submit">Pay Now</button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
