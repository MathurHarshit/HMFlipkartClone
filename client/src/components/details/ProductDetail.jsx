import { Typography,Box,Table,styled, TableBody, TableRow, TableCell } from "@mui/material";
import { LocalOffer as Badge } from "@mui/icons-material";

const SmallText=styled(Box)`
  font-size:14px;
  vertical-align:baseline;
  & > p{
    font-size:14px;
    margin-top:10px;
  }
`;

const StyledBadge=styled(Badge)`
  margin-right:10px;
  color:#00CC00;
  font-size:15px;
`;

const ColumnText=styled(TableRow)`
  font-size:14px;
  vertical-align:baseline;
  & > td{
    font-size:14px;
    margin-top:10px;
    border:none;
  }
`
function ProductDetail({ product }) {
  const fassured =
    "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png";
    const adURL = 'https://rukminim1.flixcart.com/lockin/774/185/images/CCO__PP_2019-07-14.png?q=50';
  const date=new Date(new Date().getTime()+(5*24*60*60*1000));
  return (
    <>
      <Typography>{product.title.longTitle}</Typography>
      <Typography style={{ marginTop: 5, color: "#878787", fontSize: 14 }}>
        8 Rating & 1 Reviews
        <Box component="span">
          <img
            src={fassured}
            alt="fassured"
            style={{ width: 77, marginLeft: 20 }}
          />
        </Box>
      </Typography>
      <Typography>
        <Box component="span" style={{ fontSize: 28 }}>
          ₹{product.price.cost}
        </Box>
        &nbsp;&nbsp;&nbsp;
        <Box component="span" style={{ color: "#878787" }}>
          <strike>₹{product.price.mrp}</strike>
        </Box>
        &nbsp;&nbsp;&nbsp;
        <Box component="span" style={{ color: "#388E3C" }}>
          {product.price.discount}
        </Box>
      </Typography>
      <Typography>Available Offers</Typography>
      <SmallText>
        <Typography>
        <StyledBadge />Bank Offer10% off on HDFC Bank Credit Card EMI Transactions, up to
          ₹1,500 on orders of ₹7,500 and above T&C
        </Typography>
        <Typography>
        <StyledBadge />Bank OfferExtra ₹500 off on HDFC Bank Credit Card EMI on 6 months and
          above tenure, Min. Product Value ₹24,990 T&C
        </Typography>
        <Typography><StyledBadge />Buy for 150 get ₹100 off your Next Buy T&C</Typography>
        <Typography><StyledBadge />Bank Offer5% Cashback on Flipkart Axis Bank Card T&C</Typography>
        <Typography><StyledBadge />Buy for 100 get ₹75 off your Next Buy T&C</Typography>
        <Typography><StyledBadge />EMI starting from ₹2,057/month</Typography>
      </SmallText>
      <Table>
      <TableBody>
        <ColumnText>
          <TableCell style={{color:'#878787'}}>Delivery</TableCell>
          <TableCell style={{fontWeight:600}}>Delivery by {date.toDateString()} | ₹40</TableCell>
        </ColumnText>
        <ColumnText>
          <TableCell style={{color:'#878787'}}>Warranty</TableCell>
          <TableCell>No Warranty</TableCell>
        </ColumnText>
        <ColumnText>
          <TableCell style={{color:'#878787'}}>Seller</TableCell>
          <TableCell>
            <Box component="span" style={{color:'#2874f0'}}>
              SuperComNet
            </Box>
            <Typography>GST invoice available</Typography>
            <Typography>View more sellers starting from ₹{product.price.cost}</Typography>
          </TableCell>
        </ColumnText>
        <ColumnText>
          <TableCell colSpan={2}>
              <img src={adURL} style={{width:390}} alt='Super Coin' />
          </TableCell>
          
        </ColumnText>
        <ColumnText>
          <TableCell style={{color:'#878787'}}>Description</TableCell>
          <TableCell>{product.description}</TableCell>
        </ColumnText>
      </TableBody>
      </Table>
    </>
  );
}

export default ProductDetail;
