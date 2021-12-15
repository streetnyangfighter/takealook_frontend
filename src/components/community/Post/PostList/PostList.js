import React from 'react';
import { Link } from 'react-router-dom';
import './PostList.scss';

const PostList = (props) => {
  const { id, title, content, writer, like, comment, created_at, board } =
    props.post;

  return (
    <div>
      <Link to={'/community/post/' + id} className='link'>
        <div class='card'>
          <div class='card-header'>
            <div class='card-header-is_closed'>
              <div class='card-header-text'> new! </div>
              {/* <div class='card-header-number'> 2 / 5 </div> */}
            </div>
            {/* <img src={post.img} alt='img' /> */}
            {/* <img class='headerimage' src={backgroundimgs} alt='img' /> */}
          </div>

          <div class='card-body'>
            <div class='card-body-header'>
              {/* <h3></h3> */}

              <p>
                <font size='2' color='#ffa800'>
                  <strong>{board}</strong>
                </font>
              </p>
              <h1 className='card-body-header-title'>{title}</h1>
              <p>{content}</p>
            </div>
            <p class='card-body-description'>{content}</p>

            <div class='card-body-footer'>
              <i class='card-body-nickname'>{writer}</i>
              <i class='icon icon-like_count'></i>
              <img
                class='image'
                src={require('images/heart.png').default}
                alt='like'
              />
              {like}
              <i class='icon icon-comments_count'></i>
              <img
                class='image'
                src={require('images/chat.png').default}
                alt='cmt'
              />
              {comment}
              <i class='reg_date'> {created_at} </i>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostList;