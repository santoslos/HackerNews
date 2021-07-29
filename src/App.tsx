import React from 'react';
import './App.css';
import { StoreNews } from './hooks/store';
import NewsItem from './components/NewsItem';

function App() {
  const { orderedNews, setNewPage } = StoreNews();

  return (
    <div className="App">
      <button
        onClick={() => {
          setNewPage(2);
        }}
      >
        click
      </button>
      <ul>
        {orderedNews.map((newsItem) => (
          <NewsItem
            key={newsItem.id}
            title={newsItem.title}
            points={newsItem.points}
            user={newsItem.user}
            timeAgo={newsItem.time_ago}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
