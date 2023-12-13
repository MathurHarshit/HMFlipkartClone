import { useSelector } from "react-redux";
import { Box, Button, Grid, Typography, styled } from "@mui/material";
import CartItem from "./CartItem";
import TotalView from "./TotalView";
import EmptyCart from "./EmptyCart";
import { payWithCashfreePayments } from "../../service/api";
import { cashfree } from "../../utils/cashfree-utils";
import { useState, useEffect,useContext } from "react";
import { DataContext } from "../../context/DataProvider";

const Container = styled(Grid)(({ theme }) => ({
  padding: "30px 135px",
  [theme.breakpoints.down("md")]: {
    padding: "15px 0",
  },
}));

const Header = styled(Box)`
  padding: 15px 24px;
  background: #fff;
`;

const ButtonWrapper = styled(Box)`
  padding: 16px 22px;
  background: #fff;
  box-shadow: 0 -2px 10px 0 rgb(0 0 0 / 10%);
  border-top: 1px solid #f0f0f0;
`;

const StyledButton = styled(Button)`
  display: flex;
  margin-left: auto;
  background: #fb641b;
  color: #fff;
  width: 250px;
  height: 51px;
  border-radius: 2px;
  font-weight: 600;
`;

const LeftComponent = styled(Grid)(({ theme }) => ({
  paddingRight: "15px",
  [theme.breakpoints.down("sm")]: {
    marginBottom: 15,
  },
}));
function Cart() {
  const { cartItems } = useSelector((state) => state.cart);
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const {account,setAccount}=useContext(DataContext);

  const totalAmount = () => {
    let price = 0,
      discount = 0;
    cartItems.map((item) => {
      price += item.price.mrp;
      discount += item.price.mrp - item.price.cost;
    });
    setPrice(price);
    setDiscount(discount);
  };

  useEffect(() => {
    totalAmount();
  }, [cartItems]);

  async function placeOrder() {
    let response = await payWithCashfreePayments({
      amount: price - discount + 40,
      custDetails:account
      
    });
    //console.log(response.data);
    account?handlePayment(response.data):alert("Please Login")
  }

  function handlePayment(sessionId) {
    let checkoutOptions = {
      paymentSessionId: sessionId,
      returnUrl: "https://hm-flipkart-clone.vercel.app",
    };
    cashfree.checkout(checkoutOptions).then(function (result) {
      if (result.error) {
        alert(result.error.message);
      }
      if (result.redirect) {
        console.log("Redirection");
        console.log(result);
      }
    });
  }
  return (
    <>
      {cartItems.length ? (
        <Container container>
          <LeftComponent item lg={9} md={9} sm={12} xs={12}>
            <Header>
              <Typography>My Cart ({cartItems.length})</Typography>
            </Header>
            {cartItems.map((item) => {
              return <CartItem item={item} />;
            })}
            <ButtonWrapper>
              <StyledButton onClick={() => placeOrder()}>
                Place Order
              </StyledButton>
            </ButtonWrapper>
          </LeftComponent>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <TotalView
              cartItems={cartItems}
              price={price}
              discount={discount}
            />
          </Grid>
        </Container>
      ) : (
        <EmptyCart />
      )}
    </>
  );
}

export default Cart;
