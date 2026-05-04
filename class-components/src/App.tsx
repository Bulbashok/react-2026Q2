import { Component } from 'react';
import './App.css';
import { ResultsSection } from './components/ResultsSection';
import { SearchSection } from './components/SearchSection';
import type { SearchResult } from './types/types';

interface AppState {
  results: SearchResult[];
}

type Props = Record<string, never>;

class App extends Component<Props, AppState> {
  state: AppState = { results: [] };

  handleSearch = (query: string) => {
    const mock: SearchResult[] = query
      ? [
          {
            id: 1,
            name: `Item "${query}" #1`,
            description: 'First item description.',
          },
          {
            id: 2,
            name: `Item "${query}" #2`,
            description: 'Second item description.',
          },
          {
            id: 3,
            name: `Item "${query}" #3`,
            description: 'Third item description.',
          },
        ]
      : [];
    this.setState({ results: mock });
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
