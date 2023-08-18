import React, { useState } from 'react';
import ImageGalleryItem from '../ImageGalleryItem';
import Button from '../Button';
import Modal from '../Modal';
import s from './ImageGallery.module.css';
import Loaders from '../Loader';
import PropTypes from 'prop-types';

function ImageGallery({
  page,
  imageName,
  response,
  loaderAreShow,
  loadMoreBtn,
  increasePage,
}) {
  const [modalUrl, setModalUrl] = useState('');
  const [isShowModal, setIsShowModal] = useState(false);

  // //MODAL

  const toggleModal = () => {
    setIsShowModal(!isShowModal);
  };

  const openModal = e => {
    if (e.target.nodeName === 'IMG') {
      toggleModal();
      setModalUrl(e.target.dataset.big_image);
    }
  };

  return (
    <>
      <div>
        <ul className={s.imageGallery}>
          <ImageGalleryItem
            openModal={openModal}
            response={response}
            imageName={imageName}
            page={page}
            modalUrl={modalUrl}
          />
        </ul>
        {isShowModal && <Modal url={modalUrl} closeModal={toggleModal}></Modal>}
        {loaderAreShow && <Loaders />}
      </div>

      {loadMoreBtn && <Button onClick={increasePage} />}
    </>
  );
}

export default ImageGallery;

ImageGallery.propTypes = {
  increasePage: PropTypes.func,
  page: PropTypes.number,
  imageName: PropTypes.string.isRequired,
};
