import { Component } from 'react';
import './App.css';
import { ResultsSection } from './components/ResultsSection';
import { SearchSection } from './components/SearchSection';
import type { SearchResult } from './types/types';
import { fetchItems } from './api/api';

interface AppState {
  results: SearchResult[];
}

type Props = Record<string, never>;

class App extends Component<Props, AppState> {
  state: AppState = { results: [] };

  componentDidMount(): void {
    const saved = localStorage.getItem('lastSearchQuery') ?? '';
    this.fetchResults(saved);
  }

  fetchResults = async (query: string) => {
    const data = await fetchItems(query || undefined);
    this.setState({ results: data });
  };

  handleSearch = (rawQuery: string) => {
    const query = rawQuery.trim();
    const saved = localStorage.getItem('lastSearchQuery') ?? '';

    if (query === saved) return;

    localStorage.setItem('lastSearchQuery', query);

    this.fetchResults(query);
  };

  render() {
    return (
      <div id="center">
        <SearchSection onSearch={this.handleSearch} />
        <ResultsSection results={this.state.results} />
      </div>
    );
  }
}

export default App;
