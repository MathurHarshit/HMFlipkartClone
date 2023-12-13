import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductDetails } from "../../redux/actions/productActions";
import {Box, styled,Grid} from '@mui/material';
import ActionItem from "./ActionItem";
import ProductDetail from "./ProductDetail";
const Component=styled(Box)`
    background:#F2F2F2
`;
const Container=styled(Grid)(({theme})=>({
    background:'#fff',
    display:'flex',
    [theme.breakpoints.down('md')]:{
        margin:0
    }
}));
   

const RightContainer=styled(Grid)`
    margin-top:50px;
`;

function DetailView(){
    
    const dispatch=useDispatch();
    const {id}=useParams();
    const {loading,product}=useSelector(state=>state.getProductDetails);
    useEffect(()=>{
        if(product && id!==product.id){
            dispatch(getProductDetails(id))
        }
        
    },[dispatch,id,product,loading]);
    return <Component>
        {
            product && Object.keys(product).length &&
            <Container container>
                <Grid item xl={4} lg={5} md={6} sm={12} xs={12}>
                    <ActionItem product={product} />
                </Grid>
                <RightContainer item xl={8} lg={7} md={6} sm={12} xs={12}>
                 
                    <ProductDetail product={product} />
                </RightContainer>
            </Container>
        }
    </Component>
}
export default DetailView;