import { Component } from 'react';
import './App.css';
import { ResultsSection } from './components/ResultsSection';
import { SearchSection } from './components/SearchSection';
import type { SearchResult } from './types/types';
import { fetchItems } from './api/api';

interface AppState {
  results: SearchResult[];
  isLoading: boolean;
}

type Props = Record<string, never>;

class App extends Component<Props, AppState> {
  state: AppState = { results: [], isLoading: false };

  componentDidMount(): void {
    const saved = localStorage.getItem('lastSearchQuery') ?? '';
    this.fetchResults(saved);
  }

  fetchResults = async (query: string) => {
    this.setState({ isLoading: true });
    const data = await fetchItems(query || undefined);
    this.setState({ results: data, isLoading: false });
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
        <ResultsSection
          results={this.state.results}
          isLoading={this.state.isLoading}
        />
      </div>
    );
  }
}

export default App;
