import { useEffect, useState } from 'react';
import { getImages } from '../services/api';
import { Button } from '../Button/Button';
import { toast } from 'react-toastify';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem.jsx';
import { Gallery } from './ImageGallery.styled';
import Loader from '../Loader/Loader';

export const ImageGalleryHooks = ({ searchQuery, onSelect }) => {
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(
    prevProps => {
      if (prevProps.searchQuery !== searchQuery) {
        setPage(1);
        setData([]);
      }

      if (prevProps.searchQuery !== searchQuery) {
        setIsLoading(true);
        try {
          const data = getImages(searchQuery, page);
          if (data.totalHits === 0) {
            toast('Sorry, nothing was found for your search');
          }
          const totalPages = Math.round(data.total / 12);
          this.setState(prevState => ({
            data: [...prevState.data, ...data.hits],
            pages: totalPages,
          }));
        } catch (error) {
          setError('App crashed, try restarting');
        } finally {
          setIsLoading(false);
        }
      }
    },
    [page, searchQuery]
  );

  const loadMore = () => {
    setPages(prevState => ({
      [prevState]: page + 1,
    }));
  };

  return (
    <>
      <Gallery>
        {data.map(({ webformatURL, largeImageURL, id }) => {
          return (
            <ImageGalleryItem
              key={id}
              smallImg={webformatURL}
              bigImg={largeImageURL}
              onSelect={onSelect}
            />
          );
        })}
        {error && <p>{error}</p>}
      </Gallery>
      {page < pages && <Button onClick={loadMore}></Button>}
      {isLoading && <Loader />}
    </>
  );
};
