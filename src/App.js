import { Route, Routes } from 'react-router-dom';
import Header from './components/Common/Header/Header';
import HomePage from './pages/Home/HomePage';
import LoginPage from './pages/Login/LoginPage';
import MyCatPage from './pages/MyCatPage/MyCatPage';
import './App.css';
import MyPage from './pages/MyPage/MyPage/MyPage';
import CatDetailPage from './pages/CatDetail/CatDetailPage';
import CatRegisterPage from 'pages/CatRegisterPage/CatRegisterPage';
import PostDetailPage from 'pages/Community/PostDetail/PostDetailPage';
import PostWritePage from 'pages/Community/PostWrite/PostWritePage';
import PostUpdatePage from 'pages/Community/PostUpdate/PostUpdatePage';
import PostListPage from 'pages/Community/PostList/PostListPage';
import CatUpdatePage from 'pages/CatUpdatePage/CatUpdatePage';
import MyLikePage from 'pages/MyPage/MyLikePage/MyLikePage';
import MyPostPage from 'pages/MyPage/MyPostPage/MyPostPage';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserAction } from 'reducer/auth';
import CatFace from 'components/CatRegister/CatFace/CatFace';
import useUpdateEffect from 'utils/useUpdateEffect';
import Spinner from 'components/Common/Spinner';

function App() {
	const dispatch = useDispatch();
	const { logoutDone, loadUserRequest, user } = useSelector(({ auth }) => ({
		logoutDone: auth.logoutDone,
		loadUserRequest: auth.loadUserRequest,
		user: auth.user,
	}));

	// 자동 재로그인
	useEffect(() => {
		if (localStorage.getItem('jwt')) {
			console.log('자동재로그인');
			dispatch(loadUserAction());
		}
	}, []);
	// useUpdateEffect(() => {
	// 	dispatch(loadUserAction());
	// }, [logoutDone]);

	if (user) {
		return (
			<div>
				<Header />
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/login' element={<LoginPage />} />
					<Route path='/mycat/' element={<MyCatPage />} />
					<Route path='/mycat/:catId' element={<CatDetailPage />} />
					<Route path='/mycat/:catId/update' element={<CatUpdatePage />} />
					<Route path='/mycat/new' element={<CatRegisterPage />} />
					<Route path='/mypage' element={<MyPage />} />
					<Route path='/mypage/mylike' element={<MyLikePage />} />
					<Route path='/mypage/mypost' element={<MyPostPage />} />
					<Route path='/community' element={<PostListPage />} />
					<Route path='/community/write' element={<PostWritePage />} />
					<Route path='/community/post/:postId' element={<PostDetailPage />} />
					<Route
						path='/community/update/:postId'
						element={<PostUpdatePage />}
					/>
					<Route path='/catface' element={<CatFace />} />
				</Routes>
			</div>
		);
	} else {
		if (loadUserRequest) {
			return <Spinner />;
		} else {
			return (
				<div>
					<Header />
					<LoginPage />
				</div>
			);
		}
	}
}

export default App;
