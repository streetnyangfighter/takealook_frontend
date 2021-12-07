import React from 'react';
import './WritePostComment.scss';

const WritePostComment = () => {
  return (
    <div className='comment'>
      <input
        className='comment-input'
        type='text'
        placeholder='댓글을 작성하려면 TakeaLook! 에 로그인 해주세요.'
      />
      <input className='comment-btn' type='button' value='등록' />
    </div>
  );
};

export default WritePostComment;
