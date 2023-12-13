import {Dialog,Box,TextField,Typography, Button,styled} from '@mui/material';
import { useState,useContext } from 'react';
import {authenticateSignup,authenticateLogin} from '../../service/api';
import {DataContext} from '../../context/DataProvider'
const Component=styled(Box)`
    height:70vh;
    width:90vh;
`;
const Image=styled(Box)`
    background:#2874f0 url(https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png) center 85% no-repeat;
    height:86.1%;
    width:28%;
    padding:45px 35px;
    & > p,& > h5{
        color:#fff;
        font-weight:600;
    }
`;
const Wrapper=styled(Box)`
    display:flex;
    flex-direction:column;
    padding:25px 35px;
    flex:1;
    & > div,& > Button,& > p{
        margin-top:20px;
    }
`;
const LoginButton=styled(Button)`
    text-transform:none;
    background:#FB641B;
    color:#fff;
    height:48px;
    border-radius:2px;
    font-weight:600;
`;
const Text=styled(Typography)`
    font-size:12px;
    color:#878787;
`;
const CreateAccountText=styled(Typography)`
    font-size:14px;
    text-align:center;
    color:#2874f0;
    font-weight:600;
    cursor:pointer;
`;
const ExistingUserButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
    font-weight:600;
    
`;
const Error=styled(Typography)`
    font-size:14px;
    color:#ff6161;
    line-height:0;
    margin-top:10px;
    font-weight:600;
`;

const accountInitialValues={
    login:{
        view:'login',
        heading:'Login',
        subHeading:'Get access to your Orders, Wishlist and Recommendations'
    },
    signup:{
        view:'signup',
        heading:"Looks like you're new here!",
        subHeading:'Sign up with your mobile number to get started'
    }
}
const signupInitialValues={
    firstname:'',
    lastname:'',
    email:'',
    mobilenumber:'',
    password:''
}
const loginInitialValues={
    username:'',
    password:''
}
function LoginDialog(props){
    const [account,toggleAccount]=useState(accountInitialValues.login);
    const [signup,setSignup]=useState(signupInitialValues);
    const {setAccount}=useContext(DataContext);
    const [login,setLogin]=useState(loginInitialValues);
    const [error,setError]=useState(false);
   
    function handleClose(){
        props.setOpen(false);
        toggleAccount(accountInitialValues.login);
        setError(false);
    }
    function toggleSignup(){
        toggleAccount(accountInitialValues.signup);
    }
    function toggleLogin(){
        toggleAccount(accountInitialValues.login);
    }
    function onInputChange(e){
       setSignup({...signup,[e.target.name]:e.target.value});
      
    }
    async function signupUser(){
       let response=await authenticateSignup(signup);
       if(response.status===200){
       handleClose();
       console.log(signup);
       setAccount(signup);
    }else{
        setError(true);
    }
       
    }
    function onValueChange(e){
        setLogin({...login,[e.target.name]:e.target.value});
    }
    async function loginUser(){
        let response=await authenticateLogin(login);
        if(response.status===200){
            handleClose();
            setAccount(response.data.userData);
            
        }else{
            setError(true);
        }
        
    }
    return <Dialog open={props.open} onClose={handleClose} PaperProps={{sx:{maxWidth:'unset'}}}>
        <Component>
        <Box style={{display:'flex',height:'100%'}}>
            <Image>
                <Typography variant='h5'>{account.heading}</Typography>
                <Typography style={{marginTop:20}}>{account.subHeading}</Typography>
            </Image>
            {
                account.view==='login'
            ?
            <Wrapper>
                {error && <Error>Please enter valid email and password</Error>}
                <TextField variant="standard" label="Enter Email" onChange={(e)=>onValueChange(e)} name="username" />
                <TextField type='password' variant="standard" label="Enter Password" onChange={(e)=>onValueChange(e)} name="password" />
                <Text>By continuing, you agree to Flipkart's Terms of Use and Privacy Policy.</Text>
                <LoginButton onClick={loginUser}>Login</LoginButton>
                <CreateAccountText onClick={toggleSignup}>New to Flipkart? Create an account</CreateAccountText>
            </Wrapper>
            :
            <Wrapper>
                {error && <Error>User already exist</Error>}
                <TextField variant="standard" label="Enter Firstname" name="firstname" onChange={(e)=>onInputChange(e)} />
                <TextField variant="standard" label="Enter Lastname" name="lastname" onChange={(e)=>onInputChange(e)} />
                <TextField variant="standard" label="Enter Email" name="email" onChange={(e)=>onInputChange(e)} />
                <TextField variant="standard" label="Enter Mobile number" name="mobilenumber" onChange={(e)=>onInputChange(e)} />
                <TextField type='password' variant="standard" label="Enter Password" name="password" onChange={(e)=>onInputChange(e)} />
                <LoginButton onClick={signupUser}>Continue</LoginButton>
                <ExistingUserButton onClick={toggleLogin}>Existing User? Log in</ExistingUserButton>
                
            </Wrapper>
            }

        </Box>
        </Component>
    </Dialog>
}
export default LoginDialog;