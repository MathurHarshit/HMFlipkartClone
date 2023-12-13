import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { IconButton, Typography, styled,Drawer, List,ListItemButton } from '@mui/material';
import Box from '@mui/material/Box';
import Search from './Search'
import CustomButtons from './CustomButtons';
import { Link } from 'react-router-dom';
import {Menu} from '@mui/icons-material';
import { useState } from 'react';


const StyledHeader=styled(AppBar)`
   background:#2874f0;
   height:55px;
`

const Component=styled(Link)`
    margin-left:12%;
    line-height:0;
    text-decoration:none;
    color:inherit
`

const SubHeading=styled(Typography)`
    font-size:11px;
    font-style:italic;
`;

const CustomButtonWrapper=styled(Box)(({theme})=>({
   margin:'0 5% 0 2%',
   [theme.breakpoints.down('md')]:{
     display:'none'
   }
}));

const MenuButton=styled(IconButton)(({theme})=>({
    display:'none',
    [theme.breakpoints.down('md')]:{
        display:'block',
        
    }
}));




function Header(){
    const [open,setOpen]=useState(false)
    function handleOpen(){
        setOpen(true);
    }
    function handleClose(){
        setOpen(false);
    }
    
    return <StyledHeader>
        <Toolbar style={{minHeight:55}}>
            <MenuButton color='inherit' onClick={handleOpen}>
                <Menu />
            </MenuButton>
            <Drawer open={open} onClose={handleClose}>
                <Box style={{width:200}} onClick={handleClose}>
                    <List>
                        <ListItemButton>
                            <CustomButtons />
                        </ListItemButton>
                    </List>
                </Box>
            </Drawer>
            <Component to='/'>
                <img src={require('../../images/flipkart logo.png')} alt='flipkart logo' style={{width:75}}/>
                <Box style={{display:'flex'}}>
               <SubHeading>Explore&nbsp; 
                 <Box component="span" style={{color:'#FFE500'}}>Plus</Box>
               </SubHeading>
               <img src={require('../../images/Explore Plus logo.png')} alt='Explore Plus logo' style={{width:10,height:10,marginLeft:4}} />
               </Box>
            </Component>
            <Search />
            <CustomButtonWrapper>
                <CustomButtons />
            </CustomButtonWrapper>
        </Toolbar>
    </StyledHeader>
}

export default Header;