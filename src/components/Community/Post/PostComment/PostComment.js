import axiosInstance from 'api/customAxios';
import axios from 'axios';
import WriteComment from 'components/Community/Writes/WriteComment/WriteComment';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './PostComment.scss';

const PostComment = (props) => {
  const user = useSelector((state) => state.auth.user);
  const {
    postDetails,
    setPostDetails,
    comment,
    setLoaded,
    setComments,
    commentUpdate,
  } = props;
  const [newComment, setNewComment] = useState({
    writerId: comment.writer.id,
    newContent: comment.content,
    commentId: comment.commentId,
  });

  const handleDelete = () => {
    axiosInstance
      .delete(`/post/${postDetails.postId}/comment/${comment.commentId}`)
      .then((res) => {
        axios
          .all([
            axiosInstance.get(`/post/${postDetails.postId}`),
            axiosInstance.get(`/post/${postDetails.postId}/comment`),
          ])
          .then(
            axios.spread((postDetailsRes, commentsRes) => {
              setPostDetails(postDetailsRes.data);
              setComments(commentsRes.data);
              setLoaded(true);
            })
          );
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='postcomment'>
      <div className='postcomment-writer-info'>
        <img
          src={`${comment.writer.userImage}`}
          className='postcomment-userimg'
          alt='profile'
        />
        <h5 className='postcomment-writer-name'>{comment.writer.userName}</h5>
      </div>
      {commentUpdate === false ? (
        <div className='postcomment-content'>{comment.content}</div>
      ) : (
        <div className='postcomment-content-update'>
          <WriteComment newComment={newComment} />
        </div>
      )}
      {user.id === comment.writer.id ? (
        <div className='postcomment-btn'>
          {/* {commentUpdate === false ? (
            <button className='postcomment-update-btn' onClick={handleUpdate}>
              수정
            </button>
          ) : null} */}
          <button className='postcomment-delete-btn' onClick={handleDelete}>
            삭제
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default PostComment;
