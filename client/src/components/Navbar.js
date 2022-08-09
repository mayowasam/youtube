import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Upload from "./Upload";
import { MdAccountCircle } from "react-icons/md";
import { AiFillVideoCamera, AiOutlineSearch } from "react-icons/ai";
import avatar from '../assets/user.png'
import { getAuth, signOut } from "firebase/auth";
import { logout } from "../redux/userSlice";
import axios from "axios";
import logo from '../assets/logo.png'

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
  // border: 2px solid yellow;
  z-index:2;

  @media (max-width: 700px){
    padding: 1rem;

  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative;

  @media (max-width: 700px){
    padding: 0px;
    justify-content: space-between;

  }



`;

const Logo = styled.div`
  align-items: center;
  gap: 5px;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
  display: none;

  @media (max-width: 700px){
    display: flex;
  }
`;

const Img = styled.img`
  height: 25px;
  display: none;

  @media (max-width: 700px){
    display: block;
  }
`;


const Search = styled.form`
  width: 40%;
  position: absolute;
  left: 0px;
  right: 0px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  color: ${({ theme }) => theme.text};


  @media (max-width: 700px){
    position: unset;
    left: unset;
    right: unset;
    margin: unset;

  }


`;

const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};

  @media (max-width: 700px){
    width: 100%;

  }
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;

  @media (max-width: 700px){
    padding: 5px;
    font-size: .7rem;


  }
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  svg{
    cursor: pointer;
    color: ${({ theme }) => theme.text};

  }

  .avatar{
    display: flex;
    align-items: center;
    gap: 10px;
    position:relative;

    &:hover{ 
      .dropdown__content {
          display: block;
      }
    } 

    .dropdown__content{  
      display: none;
      position: absolute;
      top:100%;
     
      background:${({ theme }) => theme.textSoft};
      width: 10rem;
      padding: .5rem 1rem;
      box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
      z-index: 1;
      
  
      a{
        float: none;
        color:${({ theme }) => theme.text};
        padding: 12px 16px;
        text-decoration: none;
        display: block;
        text-align: center;
        // border: 2px solid red;
      }
  
        
      .logout{
        padding: 12px 16px;
      }

      &:hover{ 
       a{
        color:${({ theme }) => theme.bgLighter};

       }
      } 
    }

  }

  @media (max-width: 700px){
    .avatar{
      span{
        display: none;
      }

      .dropdown__content{
        left:20%;
        transform: translateX(-50%);
        width: 5rem;

        a{
          padding: 0;

        }

      }
    }

  }
 

`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const auth = getAuth();

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { currentUser } = useSelector((state) => state.user);

  const Logout = async (e) => {
    e.preventDefault()
    // if (currentUser.fromGoogle) {
    //   signOut(auth).then(() => {
    //     dispatch(logout())
    //   }).catch((err) => {
    //     console.log(err);

    //   })

    // }else{
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/auth/logout`)
      console.log({data});
      if (data.success) {
        dispatch(logout())
        navigate('/')

      }
    } catch (error) {
      console.log(error);

    }

  }

  const handleSearch = (e) => {
    e.preventDefault()
    navigate(`/search?q=${query}`)
  }

  // }
  return (
    <>
      <Container>
        <Wrapper>

          <Link to="/" style={{ textDecoration: "none", color: "inherit" }} className="hide">
            <Logo>
              <Img src={logo} />
              <span>MTube</span>
            </Logo>
          </Link>

          <Search onSubmit={handleSearch}>
            <Input
              placeholder="Search title"
              onChange={(e) => setQuery(e.target.value)}
            />
            <AiOutlineSearch onClick={() => navigate(`/search?q=${query}`)} />
          </Search>




          {currentUser ? (
            <User>
              <AiFillVideoCamera onClick={() => setOpen(true)} />

              <div className="avatar">
                <Avatar src={currentUser.img ? currentUser.img : avatar} />
                <span> {currentUser.name}</span>
                <div className="dropdown__content">
                  <a href="!#" onClick={Logout}>logout</a>
                </div>
              </div>




            </User>
          ) : (
            <Link to="signin" style={{ textDecoration: "none" }}>
              <Button>
                <MdAccountCircle />
                SIGN IN
              </Button>
            </Link>
          )}
        </Wrapper>
      </Container>
      {open && <Upload setOpen={setOpen} />}
    </>
  );
};

export default Navbar;
