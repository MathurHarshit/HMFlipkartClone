import axios from "axios";
import "dotenv/config";
import bodyParser from "body-parser";

export const newOrderId = async (req, res) => {
  try {
    const options = {
      method: "POST",
      url: "https://sandbox.cashfree.com/pg/orders",
      headers: {
        accept: "application/json",
        "x-api-version": "2022-09-01",
        "content-type": "application/json",
        "x-client-id": process.env.APP_ID,
        "x-client-secret": process.env.SECRET_KEY,
       

      },
      data: {
        customer_details: {
          customer_id: "CID89898" + Date.now(),
          customer_email: req.body.custDetails.email || 'customer@gmail.com',
          customer_phone: "+91"+req.body.custDetails.mobilenumber || '+911234567896',
          customer_name:req.body.custDetails.firstname+" "+req.body.custDetails.lastname || 'customer'
        },
        order_meta: {
          payment_methods: "",
        },
        order_amount: req.body.amount,
        order_id: "ORID665456" + Date.now(),
        order_currency: "INR",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        //console.log(response.data.payment_session_id);
        return res.status(200).send(response.data.payment_session_id);
      })
      .catch(function (error) {
        console.error(error);
      });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
};
