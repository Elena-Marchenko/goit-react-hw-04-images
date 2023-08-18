import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import css from './App.module.css';
import apiIMG from '../imgAPI';
import PropTypes from 'prop-types';

function App() {
  const [imageName, setImageName] = useState('');
  const [response, setResponse] = useState([]);
  const [page, setPage] = useState(1);
  const [loaderAreShow, setLoaderAreShow] = useState(false);
  const [loadMoreBtn, setLoadMoreBtn] = useState(false);

  const handleSearchFormSubmit = imageName => {
    setImageName(imageName);
    setResponse([]);
    setPage(1);
  };

  useEffect(() => {
    if (imageName === '') {
      return;
    }

    function fetchImagesByName() {
      const errorMessage = `Not found '${imageName}' `;
      showLoader();
      apiIMG
        .fetchImg(imageName, page)
        .then(res => {
          if (res.hits.length === 0) {
            return Promise.reject(new Error(toast.error(errorMessage)));
          }

          setResponse(prevResponse => [...prevResponse, ...res.hits]);
          setLoadMoreBtn(page < Math.ceil(res.totalHits / 12));
        })
        .catch(error => error, setLoadMoreBtn(false))
        .finally(() => {
          hideLoader();
        });
    }

    fetchImagesByName();
  }, [imageName, page]);

  //LOADER

  const showLoader = () => {
    setLoaderAreShow(true);
  };

  const hideLoader = () => {
    setLoaderAreShow(false);
  };

  //PAGE

  const increasePage = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className={css.app}>
      <Toaster />
      <Searchbar onSubmit={handleSearchFormSubmit} />
      {imageName && (
        <ImageGallery
          loaderAreShow={loaderAreShow}
          response={response}
          imageName={imageName}
          page={page}
          increasePage={increasePage}
          loadMoreBtn={loadMoreBtn}
        />
      )}
    </div>
  );
}

export default App;

App.propTypes = {
  increasePage: PropTypes.func,
  page: PropTypes.number,
  imageName: PropTypes.string,
};
