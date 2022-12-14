// Описание компонента <Button>
// При нажатии на кнопку Load more должна догружаться следующая порция изображений и рендериться вместе с предыдущими. Кнопка должна рендерится только тогда, когда есть какие-то загруженные изобаржения. Если массив изображений пуст, кнопка не рендерится.

import React from 'react';
import { LoadButton } from './Button.styled';

export const Button = ({ onClick }) => {
  return (
    <LoadButton type="button" onClick={onClick}>
      Load more
    </LoadButton>
  );
};
