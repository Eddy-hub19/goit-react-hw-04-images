import { Component } from 'react';
import { getImages } from '../../services/api';
import { Button } from '../Button/Button';
import { toast } from 'react-toastify';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';
import Loader from '../Loader/Loader';

export class ImageGallery extends Component {
  state = {
    page: 1,
    pages: 0,
    data: [],
    isLoading: false,
    error: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchQuery } = this.props;
    const { page } = this.state;

    if (prevProps.searchQuery !== searchQuery) {
      this.setState({ page: 1, data: [] });
    }
    if (prevProps.searchQuery !== searchQuery || prevState.page !== page) {
      this.setState({ isLoading: true });
      try {
        const data = await getImages(searchQuery, page);
        if (data.totalHits === 0) {
          toast('Sorry, nothing was found for your search');
        }
        const totalPages = Math.round(data.total / 12);
        this.setState(prevState => ({
          data: [...prevState.data, ...data.hits],
          pages: totalPages 
        }));
      } catch (error) {
        this.setState({ error: 'App crashed, try restarting' });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { data, error, isLoading, page, pages } = this.state;
    const { onSelect } = this.props;
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
        {page < pages && <Button onClick={this.loadMore}></Button>}
        {isLoading && <Loader />}
      </>
    );
  }
}
