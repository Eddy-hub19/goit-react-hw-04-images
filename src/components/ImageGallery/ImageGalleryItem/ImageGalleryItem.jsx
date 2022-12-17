// Описание компонента <ImageGalleryItem>
// Компонент элемента списка с изображением. Создает DOM-элемент следующей структуры.

import { GalleryItem, GalleryItemImg } from './GalleryItem.styled';

export const ImageGalleryItem = ({ smallImg, bigImg, onSelect }) => {
  return (
    <GalleryItem>
      <GalleryItemImg
        src={smallImg}
        alt="serchedImage"
        onClick={() => onSelect(bigImg)}
      />
    </GalleryItem>
  );
};
