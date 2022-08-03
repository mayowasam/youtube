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

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
  border: 2px solid yellow;
  z-index:2;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative;
`;

const Search = styled.div`
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
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};

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
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  position:relative;
  svg{
    color: ${({ theme }) => theme.text};

  }

  &:hover{ 
    .dropdown__content {
        display: block;
    }
  } 

  .dropdown__content{
    
    display: none;
    position: absolute;
    top:100%;
    background:${({ theme }) => theme.text};
    width: 10rem;
    padding: .5rem 1rem;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    

    a{
      float: none;
      color:${({ theme }) => theme.body};
      padding: 12px 16px;
      text-decoration: none;
      display: block;
      text-align: center;
      // border: 2px solid red;
    }

      
    .logout{
      padding: 12px 16px;
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

  const Logout = async() => {
    // if (currentUser.fromGoogle) {
    //   signOut(auth).then(() => {
    //     dispatch(logout())
    //   }).catch((err) => {
    //     console.log(err);

    //   })

    // }else{
      try {
        const {data} = await axios.get(`${process.env.REACT_APP_SERVER_URL}/auth/logout`)
        if(data.success){
          dispatch(logout())
          navigate('/')

        }
      } catch (error) {
        console.log(error);

      }

    }

  // }
  return (
    <>
      <Container>
        <Wrapper>
          <Search>
            <Input
              placeholder="Search"
              onChange={(e) => setQuery(e.target.value)}
            />
            <AiOutlineSearch onClick={() => navigate(`/search?q=${query}`)} />
          </Search>
          {currentUser ? (
            <User>
              <AiFillVideoCamera onClick={() => setOpen(true)} />
              <Avatar src={currentUser.img ? currentUser.img : avatar} />
              {currentUser.name}


              <div className="dropdown__content">



                <a href="!#" onClick={Logout}>logout</a>



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
