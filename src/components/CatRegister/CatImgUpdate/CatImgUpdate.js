import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';

const CatImgUpdate = (props) => {
  const {
    catImg,
    setCatImg,
    deleteImgURl,
    setDeleteImgUrl,
    addImg,
    setAddImg,
  } = props;

  const [imgList, setImgList] = useState([]);
  const [imgUrlList, setImgUrlList] = useState([]);

  const imgInput = useRef();

  const handleClick = () => {
    imgInput.current.click(); // imgInput이라는 ref가 걸린 대상(= input type='file')이 클릭되도록 한다
  };

  // input 태그에 변화가 생기면(이미지가 업로드되면) imgList 배열에 업로드된 파일들 추가
  const handleChange = (e) => {
    setImgList([...imgList, ...e.target.files]);
    // 부모컴포넌트 이미지배열에도 값 넣어준다
    setAddImg([...imgList, ...e.target.files]);
  };

  // 업로드한 이미지 삭제
  const deleteImg = (e) => {
    let index = e.target.parentNode.id;
    if (index <= catImg.length - 1) {
      setDeleteImgUrl([...deleteImgURl, ...catImg.splice(index, 1)]);
      imgUrlList.splice(index, 1);
      setCatImg([...catImg]);
      setImgUrlList([...imgUrlList]);
    } else {
      imgList.splice(index - catImg.length, 1);
      imgUrlList.splice(index, 1);
      setImgList([...imgList]);
      setImgUrlList([...imgUrlList]);
    }
  };

  // 화면에 그릴 이미지 주소값(imgUrlList) 생성 : useEffect로 imgList 배열이 변경됐을때마다 실행
  useEffect(() => {
    let pastUrls = [];
    // 회원이 기존에 등록한 고양이 이미지가 있다면 실행
    if (catImg) {
      for (let i = 0; i < catImg.length; i++) {
        let nowImgUrl = catImg[i];
        pastUrls.push({ id: i, url: nowImgUrl });
        setImgUrlList(pastUrls);
      }
    }

    if (imgList.length === 0) {
      // useEffect에서 실행되기 때문에 렌더링직후 사용자가 이미지 업로드 하기 전에 바로 오류 뜨는거 방지
      return false;
    } else if (imgList.length > 10) {
      alert('최대 10개까지만 선택할 수 있습니다.');
      setImgList([...imgList.slice(undefined, 10)]); // 10개까지만 자르고 넣는다
      setImgUrlList([...imgUrlList.slice(undefined, 10)]);
    } else {
      let urls = [];
      for (let i = 0; i < imgList.length; i++) {
        let nowImgUrl = URL.createObjectURL(imgList[i]); // 사용자가 등록한 이미지들 for문돌면서 url 생성
        urls.push({ id: catImg.length + i, url: nowImgUrl });
      }
      setImgUrlList([...pastUrls, ...urls]);
    }
  }, [imgList, catImg]);
  console.log(deleteImgURl);

  return (
    <div className='cat-img-upload'>
      <div className='cat-img-upload-box'>
        <input
          ref={imgInput}
          className='catImg'
          type='file'
          multiple
          accept='image/*'
          name='file'
          style={{ display: 'none' }}
          onChange={handleChange}
        />

        <button className='img-upload-button' onClick={handleClick}>
          <FontAwesomeIcon icon={faCamera} />
          <br />
          {imgUrlList.length} / 10
        </button>
        {imgUrlList.map((v) => (
          <span
            id={v.id}
            className='img-preview'
            style={{ backgroundImage: `url(${v.url})` }}
          >
            <button className='img-delete-button' onClick={deleteImg}>
              X
            </button>
          </span>
        ))}

        <br />
      </div>
    </div>
  );
};

export default CatImgUpdate;
