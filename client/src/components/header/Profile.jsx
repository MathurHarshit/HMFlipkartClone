import {Box,Typography,styled} from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
const Component=styled(Menu)`
    margin-top:5px;
`;
const LogoutText=styled(Typography)`
    font-size:14px;
    margin-left:10px;
`;
function Profile(props){
    const [open,setOpen]=useState(false);

    function handleClick(e){
        setOpen(e.currentTarget);
    }

    function handleClose(){
        setOpen(false);
    }

    function logoutUser(){
        props.setAccount('');
    }
    return <>
        <Box onClick={(e)=>handleClick(e)}>
            <Typography style={{marginTop:2,cursor:'pointer'}}>{props.account}</Typography>
            
        </Box>
        <Component
                
                anchorEl={open}
                open={Boolean(open)}
                onClose={handleClose}
                
            >
            <MenuItem onClick={()=>{handleClose(); logoutUser();}}>
                <LogoutIcon color='error' fontSize='small' />
                <LogoutText>Logout</LogoutText>
            </MenuItem>
            
            </Component>
    </>
}

export default Profile;