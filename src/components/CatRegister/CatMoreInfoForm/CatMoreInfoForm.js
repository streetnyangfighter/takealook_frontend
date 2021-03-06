import axiosInstance from 'api/customAxios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './CatMoreInfoForm.scss';
import { useNavigate } from 'react-router';

const CatMoreInfoForm = (props) => {
  const { catInfo, setCatInfo, mainImg, catLoc } = props;
  const navigate = useNavigate();

  let previewUrl = URL.createObjectURL(mainImg[0]);

  const handleChange = (e) => {
    setCatInfo({ ...catInfo, [e.target.name]: e.target.value });
  };

  return (
    <div className='content-container'>
      <div className='content-inner'>
        <div className='input-info'>
          <img className='img-preview' src={previewUrl} alt='img'></img>
          <div>
            {catInfo.gender === '0'
              ? '♂'
              : catInfo.gender === '1'
              ? '♀'
              : '성별 모름'}
            &nbsp;·&nbsp;
            {catInfo.pattern === '0'
              ? '고등어태비'
              : catInfo.pattern === '1'
              ? '치즈태비'
              : catInfo.pattern === '2'
              ? '실버태비'
              : catInfo.pattern === '3'
              ? '삼색이'
              : catInfo.pattern === '4'
              ? '카오스'
              : catInfo.pattern === '5'
              ? '턱시도'
              : catInfo.pattern === '6'
              ? '젖소'
              : catInfo.pattern === '7'
              ? '블랙'
              : catInfo.pattern === '8'
              ? '화이트'
              : '기타 생김새'}{' '}
            &nbsp;·&nbsp;중성화{' '}
            {catInfo.neutered === '0'
              ? '미완료'
              : catInfo.neutered === '1'
              ? '완료'
              : '모름'}
          </div>
        </div>
        <div className='more-info'>
          <div className='input-label'>이름</div>
          <input
            className='input-text'
            type='text'
            name='name'
            onBlur={handleChange}
          />
          <br />
          <div className='input-label'>상태</div>
          <label className='input-radio'>
            <input
              type='radio'
              name='status'
              value='0'
              onChange={handleChange}
              required
            />
            <span className='status'>건강함</span>
          </label>
          <label className='input-radio'>
            <input
              type='radio'
              name='status'
              value='1'
              onChange={handleChange}
            />
            <span className='status'>치료 필요</span>
          </label>
        </div>
        <div className='message-highlight'>
          한번 고양이를 등록한 후에는 이 고양이를 돌보는 이웃을 찾을 수 없어요!
        </div>
        <div className='message'>
          이웃들과 고양이 도감을 공유하면 돌봄이력과 사진들을 공유할 수 있어요.
          <br />
          혹시 누군가 이미 돌보고 있는 고양이가 아닌지 꼭 확인해주세요.
        </div>
      </div>
    </div>
  );
};

export default CatMoreInfoForm;
