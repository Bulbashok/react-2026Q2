import { Component } from 'react';
import type { SearchResult } from '../types/types';

interface Props {
  results: SearchResult[];
  isLoading: boolean;
}

export class ResultsSection extends Component<Props> {
  render() {
    const { results, isLoading } = this.props;

    if (isLoading) {
      return (
        <section className="results-section">
          <h2>Results</h2>
          <div className="spinner" />
        </section>
      );
    }

    return (
      <section className="results-section">
        <h2>Results</h2>
        {results.length === 0 ? (
          <p className="empty-state">Results not found</p>
        ) : (
          <ul className="results-list">
            {results.map((item) => (
              <li key={item.id} className="result-item">
                <h3 className="result-name">{item.name}</h3>
                <p className="result-desc">{item.description}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    );
  }
}
