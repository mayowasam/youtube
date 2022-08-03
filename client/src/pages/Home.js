import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";


const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  // justify-content: space-between;
  gap: 2rem;
  border: 2px solid red;


`;

const Home = ({type}) => {
  const [videos, setVideos] = useState([])
  // console.log(type);
  // console.log({videos});

  useEffect(() => {
    //fetch the videos
    const fetchVideos = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/video/${type}`)
        setVideos(data.data)
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchVideos()

    return () => {
    }
  }, [type])


 

  return (
    <Container>
        {videos.map((video) => (
          <Card key={video._id} video={video} />

        ))}
    </Container>
  );
};

export default Home;
