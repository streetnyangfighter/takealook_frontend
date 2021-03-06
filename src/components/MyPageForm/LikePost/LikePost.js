import React from 'react';
import { Link } from 'react-router-dom';

const LikePost = (props) => {
	const { likePosts, setLikePosts } = props;
	const timeDiff = (date) => {
		return date.substring(0, 10);
	};

	let postLen = likePosts.length;

	return postLen > 0 ? (
		<div class='article'>
			<div class='block-title'>
				<h2>좋아한 게시글</h2>
				<Link to='/mypage/mylike'>
					<button onclick='/'>더보기</button>
				</Link>
			</div>
			{likePosts &&
				likePosts.map((post, index) =>
					index < 5 ? (
						<Link to={`/community/post/${post.postId}`} className='link'>
							{/* <div class='PostList'>
                <ul class='Board'>
                  <li class='active'>
                    <div class='list-title'>
                      <p>
                        [<span>{post.board.name}</span>]
                      </p>
                    </div>
                    <div class='postList2'>
                      <p class='title'>{post.title}</p>
                      <div class='modified_at'>{timeDiff(post.modifiedAt)}</div>
                    </div>
                    <div class='profile'>
                      <p>{post.writer.userName}</p>
                    </div>
                  </li>
                </ul>
              </div> */}
							<div className='my-post-list'>
								<div className='my-post-list-left'>
									<span className='post-list-board'>[{post.board.name}]</span>
									<span className='post-list-title'>{post.title}</span>
								</div>
								<div className='my-post-list-right'>
									<span className='post-modified-at'>
										{timeDiff(post.modifiedAt)}
									</span>
									<span className='post-username'>{post.writer.userName}</span>
								</div>
							</div>
						</Link>
					) : null
				)}
		</div>
	) : (
		<div class='article'>
			<div class='block-title'>
				<h2>좋아한 게시글</h2>
				<Link to='/mypage/mylike'>
					<button onclick='/'>더보기</button>
				</Link>
			</div>
			<div className='mypage-msg'>
				<div className='content'>좋아한 게시글이 없습니다.</div>
			</div>
		</div>
	);
};

export default LikePost;
