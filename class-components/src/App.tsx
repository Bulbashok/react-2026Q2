import { Component } from 'react';
import './App.css';
import { ResultsSection } from './components/ResultsSection';
import { SearchSection } from './components/SearchSection';
import type { SearchResult } from './types/types';
import { fetchItems } from './api/api';

interface AppState {
  results: SearchResult[];
  lastSearchedQuery: string | null;
}

type Props = Record<string, never>;

class App extends Component<Props, AppState> {
  state: AppState = { results: [], lastSearchedQuery: null };

  componentDidMount(): void {
    const saved = localStorage.getItem('lastSearchQuery') ?? '';
    this.loadData(saved);
  }

  loadData = async (rawQuery: string) => {
    const query = rawQuery.trim();

    if (query === this.state.lastSearchedQuery) {
      return;
    }

    const data = await fetchItems(query || undefined);
    this.setState({ results: data, lastSearchedQuery: query });
  };

  handleSearch = (rawQuery: string) => {
    this.loadData(rawQuery);
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
