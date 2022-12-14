import { Component } from 'react';
import './Global.styled';
import { Container } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ToastContainer } from 'react-toastify';
import { Modal } from './Modal/Modal';
import 'react-toastify/dist/ReactToastify.css';

export default class App extends Component {
  state = {
    search: '',
    selectedImage: null,
  };

  onSeachInfo = data => {
    console.log(data);
  };

  onFormSubmit = search => {
    this.setState({ search: search });
  };

  selectImage = imgUrl => {
    this.setState({ selectedImage: imgUrl });
  };

  render() {
    const { search, selectedImage } = this.state;
    return (
      <Container>
        <Searchbar onSubmit={this.onFormSubmit} />
        <ImageGallery
          searchQuery={search}
          onChange={this.onSeachInfo}
          onSelect={this.selectImage}
        />
        <ToastContainer autoClose={4000} />
        {selectedImage !== null && (
          <Modal
            isOpen={selectedImage}
            onClose={() => this.selectImage(null)}
          />
        )}
      </Container>
    );
  }
}
