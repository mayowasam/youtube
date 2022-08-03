import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Card from "../components/Card";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  .response{
    // border: 2px solid red;
    width: 100%;
    align-self: center;
    text-align: center;
    font-size: 2rem;
    color: ${({ theme }) => theme.text};


  }
`;

const Search = () => {
  const [videos, setVideos] = useState([]);
  const query = useLocation().search;
  console.log({ query });

  useEffect(() => {
    const fetchVideos = async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/video/search${query}`);
      setVideos(data.data);
    };
    fetchVideos();
  }, [query]);

  return <Container>
    {
      videos.length > 0 ? (
        <>
          {videos.map(video => (
            <Card key={video._id} video={video} />
          ))}
        </>
      ) : (
        <div className="response">
          <p>video not found</p>
        </div>
      )
    }
  </Container>;
};

export default Search;
