import './Global.styled';
import { Container } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import { Modal } from './Modal/Modal';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery.jsx';

export const App = () => {
  const [search, setSearch] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const onSeachInfo = data => {
    console.log(data);
  };

  const onSubmit = search => {
    setSearch(search);
  };

  const selectImage = imgUrl => {
    setSelectedImage(imgUrl);
  };

  return (
    <Container>
      <Searchbar onSubmit={onSubmit} />

      <ToastContainer autoClose={4000} />
      {selectedImage !== null && (
        <Modal isOpen={selectedImage} onClose={() => selectImage(null)} />
      )}
      <ImageGallery
        searchQuery={search}
        onChange={onSeachInfo}
        onSelect={selectImage}
      />
    </Container>
  );
};
