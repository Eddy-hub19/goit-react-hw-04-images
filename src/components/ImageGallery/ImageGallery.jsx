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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    async function fetchData() {
      if (searchQuery) {
        setIsLoading(true);
        try {
          const data = await getImages(searchQuery, page);
          if (data.totalHits === 0) {
            toast('Sorry, nothing was found for your search');
          }
          const totalPages = Math.round(data.total / 12);
          setData(data.hits);
          setPages(totalPages);
        } catch (error) {
          setError('App crashed, try restarting');
        } finally {
          setIsLoading(false);
        }
      }
    }
    fetchData();
  }, [page, searchQuery]);

  const loadMore = () => {
    setPage(page + 1);
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
