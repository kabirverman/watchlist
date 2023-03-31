import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { IEmoji, IWatchlist } from './Interfaces';
import { Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import Header from './components/Header';
import { getAllEmojis } from './utils/emoji';
import MoviePage from './components/MoviePage';




const queryClient = new QueryClient()

function App() {


  const [watchlists, setWatchlists] = useState<IWatchlist[]>([])
  const [allEmojis, setAllEmojis] = useState<IEmoji[]>(getAllEmojis())


  function preloadEmojis() {
    return (
      allEmojis.map((emojiObject) => {
        return <img key={emojiObject.name} src={require(`./${emojiObject.path}`)} />
      })
    )
  }


  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="/movie/:movieId" element={<MoviePage />}/>
        </Routes>


        <div style={{position:'absolute', pointerEvents:'none', opacity:0}}>
          {preloadEmojis()}
        </div>


      </div>
    </QueryClientProvider>
  );
}

export default App;
