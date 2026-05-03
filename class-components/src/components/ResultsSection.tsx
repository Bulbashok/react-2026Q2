import { Component } from 'react';

type Props = Record<string, never>;

export class ResultsSection extends Component<Props> {
  render() {
    return (
      <section className="results-section">
        <h2>Results</h2>
      </section>
    );
  }
}
