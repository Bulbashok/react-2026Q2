import { Component } from 'react';
import './App.css';
import { ResultsSection } from './components/ResultsSection';
import { SearchSection } from './components/SearchSection';
import type { SearchResult } from './types/types';
import { fetchItems } from './api/api';

interface AppState {
  results: SearchResult[];
  isLoading: boolean;
  error: string | null;
}

type Props = Record<string, never>;

class App extends Component<Props, AppState> {
  state: AppState = { results: [], isLoading: false, error: null };

  componentDidMount(): void {
    const saved = localStorage.getItem('lastSearchQuery') ?? '';
    this.fetchResults(saved);
  }

  fetchResults = async (query: string) => {
    this.setState({ isLoading: true });
    try {
      const data = await fetchItems(query || undefined);
      this.setState({ results: data, isLoading: false });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to load data.';
      this.setState({ results: [], isLoading: false, error: message });
    }
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
          error={this.state.error}
        />
      </div>
    );
  }
}

export default App;
