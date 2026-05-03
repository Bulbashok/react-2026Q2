import { Component } from 'react';

type Props = Record<string, never>;

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

  render() {
    return (
      <section className="search-section">
        <h2>Search</h2>
        <input
          className="search-input"
          type="text"
          value={this.state.query}
          onChange={this.handleChange}
          placeholder="Start typing..."
        />
      </section>
    );
  }
}
