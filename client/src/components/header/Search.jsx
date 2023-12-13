import { Box, InputBase,List,ListItem,styled } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useState,useEffect } from "react";
import {useSelector,useDispatch} from 'react-redux';
import {getProducts} from '../../redux/actions/productActions'
import { Link } from "react-router-dom";
const SearchContainer=styled(Box)`
    background:#fff;
    width:38%;
    border-radius:2px;
    margin-left:10px;
    display:flex;
`;

const InputSearchBase=styled(InputBase)`
    padding-left:20px;
    width:100%;
    font-size:unset;
`;

const SearchIconBox=styled(Box)`
    color:#2874f0;
    padding:5px;
    display:flex;
`;

const ListWrapper=styled(List)`
    position:absolute;
    background:#fff;
    color:#000;
    margin-top:36px;
`;
function Search(){
    const [text,setText]=useState('');
    const {products}=useSelector(state=>state.getProducts);
    const dispatch=useDispatch();

    useEffect(()=>{
        dispatch(getProducts())
    },[dispatch])
    function getText(text){
        setText(text);
    }
    return <SearchContainer>
        <InputSearchBase placeholder="Search for products, brands and more"
            onChange={(e)=>getText(e.target.value)}
            value={text}
         />
        <SearchIconBox>
            <SearchIcon />
        </SearchIconBox>
        {
            text &&
            <ListWrapper>
            {
                  products.filter(product => product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product => (
                    <ListItem>
                        <Link 
                        to={`/product/${product.id}`} 
                        onClick={()=>setText('')}
                        style={{textDecoration:'none',color:'inherit'}}
                        >
                        {product.title.longTitle}
                        </Link>
                    </ListItem>
                  ))
                }  
            </ListWrapper>
        }
    </SearchContainer>
} 

export default Search;