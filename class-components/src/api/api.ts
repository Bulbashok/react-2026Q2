import type { SearchResult } from '../types/types';

const ALL_ITEMS: SearchResult[] = [
  {
    id: 1,
    name: 'React Hooks Guide',
    description: 'Comprehensive guide to modern React state management.',
  },
  {
    id: 2,
    name: 'TypeScript Basics',
    description: 'Learn types, interfaces, and generics from scratch.',
  },
  {
    id: 3,
    name: 'CSS Flexbox',
    description: 'Master layout design with flexbox properties.',
  },
  {
    id: 4,
    name: 'Node.js REST API',
    description: 'Building scalable backend services with Express.',
  },
  {
    id: 5,
    name: 'Git Workflow',
    description: 'Branching strategies and pull request best practices.',
  },
];

export function fetchItems(query?: string): Promise<SearchResult[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!query) return resolve(ALL_ITEMS);

      const lower = query.toLowerCase();
      resolve(
        ALL_ITEMS.filter(
          (i) =>
            i.name.toLowerCase().includes(lower) ||
            i.description.toLowerCase().includes(lower)
        )
      );
    }, 400);
  });
}
