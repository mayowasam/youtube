import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Comment from "./Comment";
import avatar from '../assets/user.png'

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  form{
    width: 100%;
  }
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;

  @media(max-width: 700px){
    width: 30px;
   height: 30px;
  }
`;


const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

const Comments = ({ videoId }) => {

  const { currentUser } = useSelector((state) => state.user);

  const [comments, setComments] = useState([]);

  const [newComment, setNewComment] = useState("")

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/comment/${videoId}`);
        setComments(data.data);
      } catch (err) { }
    };
    fetchComments();
  }, [videoId]);



  //TODO: ADD NEW COMMENT FUNCTIONALITY

  const AddComment = async (e) => {
    e.preventDefault()
    // console.log({ newComment });

    try {
      const {data} = await axios.post(`${process.env.REACT_APP_SERVER_URL}/comment`,{
        videoId,
        desc:newComment
      })
      // console.log(data.data);

      if(data.success){
        setNewComment("")
        setComments(data.data)
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <NewComment>
        <Avatar src={currentUser.img ? currentUser.img : avatar} />

        <form onSubmit={AddComment}>
          <Input placeholder="Add a comment..." value={newComment} onChange={e => setNewComment(e.target.value)} />

        </form>
      </NewComment>
      {comments.map(comment => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </Container>
  );
};

export default Comments;
