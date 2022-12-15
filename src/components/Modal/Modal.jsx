import { Component } from 'react';
import { Overlay, ModalImg } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.onEsc);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onEsc);
  }

  onEsc = e => {
    if (e.key === 'Escape') {
      this.props.onClose();
    }
  };

  clickHandler = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };
  render() {
    const { isOpen } = this.props;
    return (
      <Overlay onClick={this.clickHandler} onKeyDown={this.onEsc}>
        <ModalImg>
          <img src={isOpen} alt="" />
        </ModalImg>
      </Overlay>
    );
  }
}
