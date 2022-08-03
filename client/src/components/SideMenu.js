import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiFillHome, AiFillVideoCamera, AiOutlineHistory, AiOutlineSetting } from 'react-icons/ai'
import { MdAccountCircle, MdLibraryMusic, MdExplore, MdOutlineMovie, MdLiveTv, MdOutlineArticle } from 'react-icons/md'
import { IoIosBasketball, IoIosHelpCircle, IoLogoGameControllerA } from 'react-icons/io'
import { BsBrightnessHigh, BsFillCollectionPlayFill } from 'react-icons/bs'
import { IoFlagOutline } from 'react-icons/io5'
import logo from '../assets/logo.png'


const Container = styled.div`
height: 100vh;
position: sticky;
top: 0;
flex: 1;
background-color: ${({ theme }) => theme.bgLighter};
color: ${({ theme }) => theme.text};
font-size: 14px;
border: 2px solid green;
`;
const Wrapper = styled.div`
  padding: 18px 26px;
`;
const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  margin-bottom: 25px;
`;

const Img = styled.img`
  height: 25px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 7.5px 0px;

  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Login = styled.div``;
const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Title = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: #aaaaaa;
  margin-bottom: 20px;
`;

const SideMenu = ({ darkMode, setDarkMode }) => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <Container>
      <Wrapper>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Logo>
            <Img src={logo} />
            MTube
          </Logo>
        </Link>

        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <AiFillHome />
            Home
          </Item>
        </Link>
        <Link to="trends" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <MdExplore />
            Explore
          </Item>
        </Link>
        <Link
          to="subscriptions"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <BsFillCollectionPlayFill />
            Subscriptions
          </Item>
        </Link>
        <Hr />
        <Item>
          <AiFillVideoCamera />
          Library
        </Item>
        <Item>
          <AiOutlineHistory />
          History
        </Item>
        <Hr />
        {!currentUser &&
          <>
            <Login>
              Sign in to like videos, comment, and subscribe.
              <Link to="signin" style={{ textDecoration: "none" }}>
                <Button>
                  <MdAccountCircle />
                  SIGN IN
                </Button>
              </Link>
            </Login>
            <Hr />
          </>
        }
        <Title>BEST OF MTUBE</Title>
        <Item>
          <MdLibraryMusic />
          Music
        </Item>
        <Item>
          <IoIosBasketball />
          Sports
        </Item>
        <Item>
          <IoLogoGameControllerA />
          Gaming
        </Item>
        <Item>
          <MdOutlineMovie />
          Movies
        </Item>
        <Item>
          <MdOutlineArticle />
          News
        </Item>
        <Item>
          <MdLiveTv />
          Live
        </Item>
        <Hr />
        <Item>
          <AiOutlineSetting />
          Settings
        </Item>
        <Item>
          <IoFlagOutline />
          Report
        </Item>
        <Item>
          <IoIosHelpCircle />
          Help
        </Item>
        <Item onClick={() => setDarkMode(!darkMode)}>
          <BsBrightnessHigh />
          {darkMode ? "Light" : "Dark"} Mode
        </Item>
      </Wrapper>
    </Container>
  );
};

export default SideMenu;
