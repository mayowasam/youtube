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
// border: 2px solid green;


@media (max-width: 700px){
  height: 100%;
  position: unset;


}




`;
const Wrapper = styled.div`
  padding: 18px 26px;

  @media (max-width: 700px){
    display: flex;
    padding: 0 1rem;
    justify-content: space-between;

    .hide{
      display: none;
    }

  }
`;
const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  margin-bottom: .5rem;
`;

const Img = styled.img`
  height: 25px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  padding: 7.5px 0px;

  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }


  @media (max-width: 700px){
    flex-direction:column;

    svg{
      font-size: 1.5rem;
    }

  }
`;

const Hr = styled.hr`
  margin: .5rem 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};

  @media (max-width: 700px){
    display: none;
  }
`;

const Login = styled.div`


`;
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
  margin-bottom: 1rem;
`;

const SideMenu = ({ darkMode, setDarkMode }) => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <Container>
      <Wrapper>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }} className="hide">
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
        <Item className="hide">
          <AiFillVideoCamera />
          Library
        </Item>
        <Item className="hide">
          <AiOutlineHistory />
          History
        </Item>
        <Hr />
        {!currentUser &&
          <>
            <Login className="hide">
              <span>Sign in to like videos, comment, and subscribe.</span>

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

        <Title className="hide">BEST OF MTUBE</Title>
        <Item className="hide">
          <MdLibraryMusic />
          Music
        </Item>
        <Item className="hide">
          <IoIosBasketball />
          Sports
        </Item>
        <Item className="hide">
          <IoLogoGameControllerA />
          Gaming
        </Item>
        <Item className="hide">
          <MdOutlineMovie />
          Movies
        </Item>
        {currentUser && (
          <>
            <Item className="hide">
              <MdOutlineArticle />
              News
            </Item>
            <Item className="hide">
              <MdLiveTv />
              Live
            </Item>
          </>

        )}
        <Hr />
        <Item className="hide">
          <AiOutlineSetting />
          Settings
        </Item>
        {currentUser && (
          <>
            <Item className="hide">
              <IoFlagOutline />
              Report
            </Item>
            <Item className="hide">
              <IoIosHelpCircle />
              Help
            </Item>
          </>

        )}
        <Item onClick={() => setDarkMode(!darkMode)} className="hide">
          <BsBrightnessHigh />
          {darkMode ? "Light" : "Dark"} Mode
        </Item>
      </Wrapper>
    </Container>
  );
};

export default SideMenu;
