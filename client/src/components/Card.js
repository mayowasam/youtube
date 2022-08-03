import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { format } from "timeago.js";
import avatar from '../assets/user.png'


const Container = styled.div`
// width: ${(props) => props.type !== "sm" && "360px"};
width: 360px;
// margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "45px")};
  cursor: pointer;
  // display: ${(props) => props.type === "sm" && "flex"};
  gap: 10px;
  // border: 2px solid yellow;
`;

const Image = styled.img`
  width: 100%;
  // height: ${(props) => (props.type === "sm" ? "120px" : "202px")};
  height: 202px;
  background-color: #999;
  flex: 1;
`;

const Details = styled.div`
  display: flex;
  align-items:center;
  // margin-top: ${(props) => props.type !== "sm" && "16px"};
  // margin-top:16px;
  gap: 1rem;
  flex: 1;
  // border: 2px solid red;
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  // display: ${(props) => props.type === "sm" && "none"};
  // display: ${(props) => props.type === "sm" && "none"};
`;

const Texts = styled.div`
display: flex;
flex-direction:column;
gap:.2rem;

`;

const Title = styled.h1`
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
  font-size: .7rem;
  color: ${({ theme }) => theme.textSoft};
`;

const Info = styled.div`
  font-size: .7rem;
  color: ${({ theme }) => theme.textSoft};
`;

const Card = ({ type, video }) => {
  const [videoOwner, setVideoOwner] = useState({});

  useEffect(() => {
    if(video){
    //get the owner of a video
    const fetchVideoDetails = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/user/${video.userId}`)
        console.log(data.data);
        setVideoOwner(data.data);

      } catch (error) {
        console.log(error);
      }

    };

      fetchVideoDetails();
      
    }

  }, [video]);
  

  return (
    <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
      <Container type={type}>
        <Image
          type={type}
          src={video.imgUrl}
        />
        <Details type={type}>
          <ChannelImage
            type={type}
            src={videoOwner.img ? videoOwner.img : avatar}
          />
          <Texts>
            <Title>{video.title}</Title>
            <ChannelName>{videoOwner.name}</ChannelName>
            <Info>{video.views} views • {format(video.createdAt)}</Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;
