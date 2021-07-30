import React from 'react';
import './App.css';
import { StoreNews } from './hooks/store';
import NewsItem from './components/NewsItem';
import Prealoader from './components/common/Preloader/Preloader';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
    const {orderedNews, setNewPage} = StoreNews();

    return (
        <div>
            {!orderedNews.length ? <Prealoader/>
                :
                (
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
                )}
        </div>
    );
}

export default App;
