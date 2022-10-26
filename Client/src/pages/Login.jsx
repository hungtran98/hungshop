import styled from "styled-components";
import {mobile} from "../responsive";
import { login } from '../redux/apiCalls'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";



const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    background-color: yellow;
    cursor: not-allowed;
  }
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Loader = styled.div`
  border: 3px solid #f3f3f3; /* Light grey */
  border-top: 3px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 2s linear infinite;
  @keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;

const Error = styled.span`
  color: red
`

const Login = () => {
  const [username, setUsername ] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const { isFetching, error } = useSelector(state => state.user)
  const handleClick = (e) => {
    e.preventDefault()
    login(dispatch, {username, password})
  }
  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input placeholder="username" onChange={(e) =>  setUsername(e.target.value)}/>
          <Input placeholder="password" type="password" onChange={(e) => setPassword(e.target.value)}/>
          <Button onClick={handleClick} disabled={isFetching}>LOGIN</Button>
          {/* <Loader />  */}
          {
           error && 
            <Error>
              Something went wrong
            </Error>
          }
          <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
          <Link>CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;