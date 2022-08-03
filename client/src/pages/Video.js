import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AiFillFolderAdd } from 'react-icons/ai'
import { BsHandThumbsUp, BsHandThumbsDown, BsHandIndexThumbFill, BsFillHandThumbsDownFill, BsReply } from "react-icons/bs";
import Comments from "../components/Comments";
import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { dislike, fetchSuccess, like, fetchStart } from "../redux/videoSlice";
import { subscription } from "../redux/userSlice";
import Recommendation from "../components/Recommendation";
import { format } from "timeago.js";
import avatar from '../assets/user.png'

const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
`;
const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`;

const Video = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo, loading } = useSelector((state) => state.video);
  const dispatch = useDispatch();

  const { id } = useParams()


  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(fetchStart())
        //get the video by the id
        const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/video/find/${id}`);
        // console.log({data});
        //get the uploader of the video
        const { data: channelRes } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/user/${data.data.userId}`);
        console.log({ channelRes });
        //set the uploader
        setChannel(channelRes.data);
        //dispatch the video
        dispatch(fetchSuccess(data.data));

      } catch (err) { }
    };
    fetchData();
  }, [id, dispatch]);

  const handleLike = async () => {
    const { data } = await axios.put(`${process.env.REACT_APP_SERVER_URL}/user/like/${currentVideo._id}`);
    if (data.success) {
      dispatch(like(currentUser._id));

    }
  };
  const handleDislike = async () => {
    const { data } = await axios.put(`${process.env.REACT_APP_SERVER_URL}/user/dislike/${currentVideo._id}`);
    if (data.success) {
      dispatch(dislike(currentUser._id));

    }
  };

  // console.log(channel._id);
  // console.log(currentUser.subscribedUsers.includes(channel._id));
  const handleSub = async () => {
    //check if the user has already subscribed to this channel
    const { data } = currentUser.subscribedUsers.includes(channel._id)
      ? await axios.put(`${process.env.REACT_APP_SERVER_URL}/user/unsub/${channel._id}`)
      : await axios.put(`${process.env.REACT_APP_SERVER_URL}/user/sub/${channel._id}`);
    // console.log({data});
    if (data.success) {
      dispatch(subscription(channel._id));

    }
  };

  //TODO: DELETE VIDEO FUNCTIONALITY

  return (
    <>
      {!loading ?
        <Container>
          <Content>
            <VideoWrapper>
              <VideoFrame src={currentVideo.videoUrl} controls />
            </VideoWrapper>
            <Title>{currentVideo.title}</Title>
            <Details>
              <Info>
                {currentVideo.views} views • {format(currentVideo.createdAt)}
              </Info>

              {currentUser &&

                <Buttons>
                  <Button onClick={handleLike}>
                    {currentVideo.likes?.includes(currentUser?._id) ? (
                      < BsHandIndexThumbFill />
                    ) : (
                      <BsHandThumbsUp />
                    )}{" "}
                    {currentVideo.likes?.length}
                  </Button>
                  <Button onClick={handleDislike}>
                    {currentVideo.dislikes?.includes(currentUser?._id) ? (
                      <BsFillHandThumbsDownFill />
                    ) : (
                      <BsHandThumbsDown />
                    )}{" "}
                    Dislike
                  </Button>
                  <Button>
                    <BsReply /> Share
                  </Button>
                  <Button>
                    <AiFillFolderAdd /> Save
                  </Button>
                </Buttons>
              }

            </Details>
            <Hr />
            <Channel>
              <ChannelInfo>
                <Image src={channel.img ? channel.img : avatar} />
                <ChannelDetail>
                  <ChannelName>{channel.name}</ChannelName>
                  <ChannelCounter>{channel.subscribers} subscribers</ChannelCounter>
                  <Description>{currentVideo.description}</Description>
                </ChannelDetail>
              </ChannelInfo>
              {currentUser &&      
              <Subscribe onClick={handleSub}>
                {currentUser.subscribedUsers?.includes(channel._id)
                  ? "SUBSCRIBED"
                  : "SUBSCRIBE"}
              </Subscribe>
}
            </Channel>
            <Hr />
            {currentUser && <Comments videoId={currentVideo._id} /> }
          </Content>
          <Recommendation tags={currentVideo.tags} />
        </Container>

        :
        <p>loading</p>
      }
    </>
  );
};

export default Video;
