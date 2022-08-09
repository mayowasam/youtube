import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "./Card";

const Container = styled.div`
  flex: 2;
  height: 100vh;
  position: sticky;
  top: 0;
  // overflow-y scroll;

  @media (max-width: 992px){

    display: flex;
    flex-direction: column;
    align-items: center;
    a{

     margin: 1rem 0;

    }

  }

`;

const Recommendation = ({ tags }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/video/tags?tags=${tags}`);
      // console.log(data.data);
      setVideos(data.data);
    };
    fetchVideos();
  }, [tags]);

  return (
    <Container>
      {videos.map((video) => (
        <Card type="sm" key={video._id} video={video} />
      ))}
    </Container>
  );
};

export default Recommendation;
