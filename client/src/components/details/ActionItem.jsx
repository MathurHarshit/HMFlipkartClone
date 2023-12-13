import { Box, Button, styled } from "@mui/material";
import { ShoppingCart as Cart, FlashOn as Flash } from "@mui/icons-material";
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {addToCart} from '../../redux/actions/cartActions';
import { useState,useContext } from "react";
import { payWithCashfreePayments } from "../../service/api";
import { cashfree } from "../../utils/cashfree-utils";
import { DataContext } from "../../context/DataProvider";



const LeftContainer = styled(Box)(({theme})=>({
  minWidth: '40%',
  padding: '40px 0 0 80px',
  [theme.breakpoints.down('lg')]:{
    padding:'20px 40px'
  }
}));

const Image = styled("img")({
  padding: "15px 20px",
  width:"90%"
});
const StyledButton = styled(Button)(({theme})=>({
  width: '48%',
  height: '50px',
  borderRadius: '2px',
  [theme.breakpoints.down('lg')]:{
    width:'46%'
  },
  [theme.breakpoints.down('sm')]:{
    width:'48%'
  }
}));
function ActionItem({ product }) {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [quantity,setQuantity]=useState(1);
  const {id}=product;
  const {account,setAccount}=useContext(DataContext);
  function addItemToCart(){
    dispatch(addToCart(id,quantity));
    navigate('/cart');
  }

  async function buyNow(){
    let response=await payWithCashfreePayments({amount:product.price.cost,custDetails:account});
    //console.log(response.data);
    //console.log(account);
    account ? handlePayment(response.data):alert("Please Login")
  }

  function handlePayment(sessionId){
    let checkoutOptions = {
      paymentSessionId: sessionId,
      returnUrl: "http://localhost:3000",
      
  }   
  cashfree.checkout(checkoutOptions).then(function(result){
      if(result.error){
          alert(result.error.message);
      }
      if(result.redirect){
          console.log("Redirection")
          console.log(result);
      }
  });
  }
  return (
    <LeftContainer>
      <Box
        style={{
          padding: "15px 20px",
          border: "1px solid #f0f0f0",
          width: "90%",
        }}
      >
        <Image src={product.detailUrl} alt="product" />
      </Box>
      <StyledButton
        variant="contained"
        style={{ marginRight: 10, background: "#ff9f00" }}
        onClick={()=>addItemToCart()}
      >
        <Cart />
        Add to Cart
      </StyledButton>
      <StyledButton variant="contained" onClick={()=>buyNow()}  style={{ background: "#fb541b" }}>
        <Flash />
        Buy Now
      </StyledButton>
    </LeftContainer>
  );
}

export default ActionItem;
