import axiosInstance from 'api/customAxios';
import ImgUpload from 'components/Common/ImgUpload';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutAction } from 'reducer/auth';
import history from 'utils/history';
import useUpdateEffect from 'utils/useUpdateEffect';
import './ProfileEdit.scss';

const ProfileEdit = (props) => {
	const { user, setUser, setShowModal } = props;
	const [check, setCheck] = useState(false);

	const navigate = useNavigate();
	const { loginUser, logoutDone } = useSelector(({ auth }) => ({
		loginUser: auth.user,
		logoutDone: auth.logoutDone,
	}));
	const dispatch = useDispatch();

	// 캘린더 모달창 끄는 함수
	const closeModal = (e) => {
		e.target.className === 'modal-wrapper'
			? setShowModal(false)
			: setShowModal(true);
	};

	const [newUserImg, setNewUserImg] = useState([]);
	const [userInfo, setUserInfo] = useState({
		nickname: user.nickname,
	});

	useUpdateEffect(() => {
		navigate('/');
	}, [logoutDone]);

	// form 내의 값들이 변경되었을때 실행
	const handleChange = (e) => {
		setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
	};

	const userInfosubmit = async () => {
		if (userInfo.nickname.length === 0) {
			alert('닉네임을 입력해주세요.');
		} else if (userInfo.nickname === user.nickname || check === true) {
			const formData = new FormData();

			formData.append('profileImg', newUserImg[0]);

			formData.append(
				'userInfo',
				new Blob([JSON.stringify(userInfo)], { type: 'application/json' })
			);

			console.log(userInfo.nickname);
			console.log(newUserImg);

			// 콘솔에 찍어보기
			for (let pair of formData.entries()) {
				console.log(pair[0] + ', ' + pair[1]);
			}
			axiosInstance
				.post(`/user/${loginUser.id}`, formData, {
					headers: { 'Content-Type': 'multipart/form-data' },
				})
				.then((res) => {
					console.log(res.data);
					console.log(loginUser.id);
					if (res.data === loginUser.id) {
						window.location.replace('/mypage');
					} else {
						alert('오류가 발생하였습니다.');
					}
				})
				.catch((err) => {});
		} else {
			alert('닉네임 중복을 확인해주세요.');
		}
	};
	const nicknameCheck = () => {
		let nickname = {
			nickname: userInfo.nickname,
		};

		axiosInstance
			.post(`/user/check`, nickname, {
				headers: { 'Content-Type': 'application/json' },
			})
			.then((res) => {
				if (res.data === true) {
					setCheck(true);
					alert('사용가능한 닉네임입니다.');
				} else {
					setCheck(false);
					alert('이미 사용중인 닉네임입니다.');
				}
			})
			.catch((err) => {});
	};

	const withdrawalSubmit = () => {
		//탈퇴요청
		if (window.confirm('정말 탈퇴하시겠습니까?')) {
			axiosInstance
				.patch(`/user/${loginUser.id}/delete`)
				.then((res) => {
					// 로그아웃처리
					dispatch(logoutAction());
				})
				.catch((err) => {});
		} else {
			alert('취소합니다.');
		}
	};

	return (
		// <div className='editModal-background' onClick={closeModal}>
		// <div className='modal-wrapper'>
		<div className='MyProfileEdit'>
			<div className='edit-titleBox'>
				<h2 className='edit-title'>정보수정</h2>
			</div>
			<div className='Profile-form'>
				<div className='profile-label'>닉네임</div>
				<div className='nickname-box'>
					<input
						className='profile-input'
						type='text'
						name='nickname'
						placeholder={user.nickname}
						onChange={handleChange}
					/>
					<button className='checkButton' onClick={nicknameCheck}>
						중복확인
					</button>
				</div>
				<div className='profile-label'>프로필 사진</div>
				<div className='profile-img-box'>
					<div className='profile-img-preview'>
						<ImgUpload
							pastImg={user.image}
							img={newUserImg}
							setImg={setNewUserImg}
						/>
					</div>
				</div>
				<div className='profile-update-button-box'>
					<button className='profile-update' onClick={userInfosubmit}>
						정보수정
					</button>
					<br />
					<button className='submitButton' onClick={withdrawalSubmit}>
						회원탈퇴하기
					</button>
				</div>
			</div>
		</div>
		// </div>
		// </div>
	);
};

export default ProfileEdit;
