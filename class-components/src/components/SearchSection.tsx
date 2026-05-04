import { Component } from 'react';

interface Props {
  onSearch: (query: string) => void;
}

interface State {
  query: string;
}

export class SearchSection extends Component<Props, State> {
  state: State = { query: '' };

  componentDidMount() {
    const saved = localStorage.getItem('lastSearchQuery');
    if (saved !== null) {
      this.setState({ query: saved });
    }
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    this.setState({ query: value });
    localStorage.setItem('lastSearchQuery', value);
  };

  handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.onSearch(this.state.query);
  };

  render() {
    return (
      <form className="search-section" onSubmit={this.handleSubmit}>
        <h2>Search</h2>
        <input
          className="search-input"
          type="text"
          value={this.state.query}
          onChange={this.handleChange}
          placeholder="Введите запрос..."
        />
        <button type="submit" className="search-btn">
          Find
        </button>
      </form>
    );
  }
}
