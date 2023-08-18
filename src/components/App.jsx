import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import css from './App.module.css';
import apiIMG from '../imgAPI';
// import PropTypes from 'prop-types';

function App() {
  const [imageName, setImageName] = useState('');
  const [response, setResponse] = useState([]);
  const [page, setPage] = useState(1);
  const [loaderAreShow, setLoaderAreShow] = useState(false);
  const [loadMoreBtn, setLoadMoreBtn] = useState(false);

  ////////////////////////////////////////////
  // const isFirstRender = useRef(true);
  // if (isFirstRender.current) {
  //   isFirstRender.current = false;
  //   return;
  // }
  ///////////////////////////////////

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

// import React, { Component } from 'react';
// import toast, { Toaster } from 'react-hot-toast';
// import Searchbar from './Searchbar';
// import ImageGallery from './ImageGallery';
// import css from './App.module.css';
// import apiIMG from '../imgAPI';
// import PropTypes from 'prop-types';

// class App extends Component {
//   state = {
//     imageName: '',
//     response: [],
//     page: 1,
//     loaderAreShow: false,
//     error: null,
//     loadMoreBtn: false,
//   };

//   componentDidUpdate(_, prevState) {
//     const { imageName, page } = this.state;

//     if (prevState.imageName !== imageName) {
//       this.showLoader();
//       this.setState({
//         loadMoreBtn: false,
//         page: 1,
//         response: [],
//       });

//       this.fetchImagesByName();
//     }

//     if (prevState.page < page) {
//       this.showLoader();
//       this.fetchImagesByName();
//     }
//   }

//   fetchImagesByName = () => {
//     const { imageName, page } = this.state;

//     const errorMessage = `Not found '${imageName}' `;

//     apiIMG
//       .fetchImg(imageName, page)
//       .then(res => {
//         if (res.hits.length === 0) {
//           return Promise.reject(new Error(toast.error(errorMessage)));
//         }
//         return this.setState(prevState => ({
//           response: [...prevState.response, ...res.hits],
//           loadMoreBtn: page < Math.ceil(res.totalHits / 12),
//         }));
//       })
//       .catch(error => this.setState({ error, loadMoreBtn: false }))
//       .finally(() => {
//         this.hideLoader();
//       });
//   };

//   handleSearchFormSubmit = imageName => {
//     this.setState({ imageName });
//   };

//   //LOADER

//   showLoader = () => {
//     this.setState({
//       loaderAreShow: true,
//     });
//   };

//   hideLoader = () => {
//     this.setState({
//       loaderAreShow: false,
//     });
//   };

//   //PAGE

//   increasePage = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));
//   };

//   render() {
//     const { page, response, loaderAreShow, loadMoreBtn, imageName } =
//       this.state;

//     return (
//       <div className={css.app}>
//         <Toaster />
//         <Searchbar onSubmit={this.handleSearchFormSubmit} />
//         <ImageGallery
//           loaderAreShow={loaderAreShow}
//           response={response}
//           imageName={imageName}
//           page={page}
//           increasePage={this.increasePage}
//           loadMoreBtn={loadMoreBtn}
//         />
//       </div>
//     );
//   }
// }

// export default App;
// App.propTypes = {
//   increasePage: PropTypes.func,
//   page: PropTypes.number,
//   imageName: PropTypes.string,
// };
