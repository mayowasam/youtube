import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { loginFailure, loader, loginSuccess } from "../redux/userSlice";
import { auth, provider } from "../utils/firebase";
import { signInWithPopup } from "firebase/auth";
// import { async } from "@firebase/util";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 7rem);
  color: ${({ theme }) => theme.text};
  gap: 1rem;

`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  align-items: center;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: .5rem 1rem;
  gap: .5rem;
  // border: 2px solid red;

  form{
    display: flex;
    flex-direction: column;
    width: 100%;

    button{
      justify-self: center;

    }
  
  }
`;

const Title = styled.h1`
  font-size: 1.2rem;
`;

const SubTitle = styled.h2`
  font-size: 1rem;
  font-weight: 300;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const More = styled.div`
  display: flex;
  font-size: .8rem;
  color: ${({ theme }) => theme.textSoft};
  gap: 0 1rem;

`;

const Links = styled.div`
display: flex;
gap: 0 1rem;

`;

const Link = styled.span`

`;

const SignIn = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  })

  const { email, password } = formData
  const dispatch = useDispatch();
  const navigate = useNavigate()

  //normal signin
  const handleLogin = async (e) => {
    e.preventDefault();
    if(!email || !password) return;
    dispatch(loader());
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/signin`, { email, password });
      console.log(data.user);
      dispatch(loginSuccess(data.user));
      navigate("/")
    } catch (err) {
      dispatch(loginFailure());
    }
  };


  //signin with google
  const signInWithGoogle = async () => {
    dispatch(loader());
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log({result});

        //after i get a user obj from google
        //send it to the backend

        axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/google`, {
            name: result.user.displayName,
            email: result.user.email,
            img: result.user.photoURL,
          })
          .then((res) => {
            console.log(res)
            dispatch(loginSuccess(res.data.user));
            navigate("/")
          });
      })
      .catch((error) => {
        dispatch(loginFailure());
      });
  };

  //TODO: REGISTER FUNCTIONALITY


  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <SubTitle>to continue to MTube</SubTitle>

        <form>
          <Input
            placeholder="email"
            name="email"
            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
          />
          <Input
            type="password"
            name="password"
            placeholder="password"
            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
          />
          <Button onClick={handleLogin}>Sign in</Button>

        </form>


        <Title>or</Title>
        <Button onClick={signInWithGoogle}>Signin with Google</Button>
        <Title>or</Title>


        <form>

          <Input
            placeholder="username"
            name="name"
            onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
          />
          <Input
            placeholder="email"
            name="email"
            onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })} />

          <Input
            type="password"
            placeholder="password"
            name="password"
            onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
          />
          <Button>Sign up</Button>
        </form>

      </Wrapper>
      <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  );
};

export default SignIn;
