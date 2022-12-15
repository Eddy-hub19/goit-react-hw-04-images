import {
  Search,
  SearchForm,
  SearchFormBtn,
  SearchFormBtnlabel,
  SearchForminput,
} from './Searchbar.styled';

import { Component } from 'react';
import { toast } from 'react-toastify';

export class Searchbar extends Component {
  state = {
    querySearch: '',
  };

  onInputChange = e => {
    const { value } = e.target;
    this.setState({ querySearch: value.toLowerCase() });
  };

  onSubmit = e => {
    const { querySearch } = this.state;
    e.preventDefault();

    if (querySearch.trim() === '') {
      toast.error('Empty request');
      return;
    }

    this.props.onSubmit(querySearch);

    this.setState({ querySearch: '' });
  };

  render() {
    const { querySearch } = this.state;
    return (
      <Search>
        <SearchForm onSubmit={this.onSubmit}>
          <SearchFormBtn type="submit">
            <SearchFormBtnlabel>Search</SearchFormBtnlabel>
          </SearchFormBtn>

          <SearchForminput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.onInputChange}
            value={querySearch}
          />
        </SearchForm>
      </Search>
    );
  }
}
