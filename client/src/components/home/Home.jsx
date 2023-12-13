import { useEffect } from "react";
import { Box,styled } from "@mui/material";
import Banner from "./Banner";
import NavBar from "./NavBar";
import {getProducts} from '../../redux/actions/productActions';
import {useDispatch,useSelector} from 'react-redux';
import Slide from "./Slide";
import MidSlide from "./MidSlide";
import MidSection from "./MidSection";
const Component=styled(Box)`
    padding:10px;
    background:#F2F2F2;
`;
function Home(){
    const {products}=useSelector(state=>state.getProducts);
    console.log(products);
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(getProducts());
    },[dispatch])
    return <>
        <NavBar />
        <Component>
        <Banner />
        <MidSlide products={products} title="Deal of the Day" timer={true} />
        <MidSection />
        <Slide products={products} title="Discounts for You" timer={false} />
        <Slide products={products} title="Suggested Items" timer={false} />
        <Slide products={products} title="Top Selection" timer={false} />
        <Slide products={products} title="Recommended Items" timer={false} />
        </Component>
    </>
}

export default Home;