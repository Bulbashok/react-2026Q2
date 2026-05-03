import { Component } from 'react';
import './App.css';
import { ResultsSection } from './components/ResultsSection';
import { SearchSection } from './components/SearchSection';

class App extends Component {
  render() {
    return (
      <div id="center">
        <SearchSection />
        <ResultsSection />
      </div>
    );
  }
}

export default App;
