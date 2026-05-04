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
    const savedQuery = localStorage.getItem('lasrSearchQuery') || undefined;
    this.loadData(savedQuery);
  }

  loadData = async (query?: string) => {
    const data = await fetchItems(query);
    this.setState({ results: data });
  };

  handleSearch = (query: string) => {
    this.loadData(query || undefined);
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
