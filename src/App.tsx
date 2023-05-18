import { useEffect, useState } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { IEmoji, IWatchlist } from './Interfaces';
import { Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import Header from './components/Header';
import { getAllEmojis } from './utils/emoji';
import MoviePage from './components/MoviePage';
import { getRandomHue } from './utils/hues';
import MainProvider from './components/MainProvider';
import { getWatchlistsFromLocal } from './fetch';
import WatchlistPage from './components/WatchlistPage';




const queryClient = new QueryClient()

function App() {


  const [watchlists, setWatchlists] = useState<IWatchlist[]>(getWatchlistsFromLocal())
  const [allEmojis, setAllEmojis] = useState<IEmoji[]>(getAllEmojis())
  const [hue, setHue] = useState(getRandomHue())


  useEffect(()=> {
    // localStorage.clear()
    console.log(localStorage.getItem('watchlists'))
    JSON.parse(localStorage.getItem('watchlists') || '[]').forEach((watchlist:IWatchlist) => {
      console.log(watchlist)
    })

    getWatchlistsFromLocal().forEach((watchlist:IWatchlist) => {
      console.log(watchlist)
    })
  },[])

  function preloadEmojis() {
    return (
      allEmojis.map((emojiObject) => {
        return <img key={emojiObject.name} src={require(`./${emojiObject.path}`)} />
      })
    )
  }


  return (
    <QueryClientProvider client={queryClient}>
      <MainProvider>

        <div className="App">
          <Header/>
          <Routes>
            <Route path="/" element={<Homepage watchlists={watchlists} setWatchlists={setWatchlists}/>}/>
            <Route path="/movie/:movieId" element={<MoviePage />}/>
            <Route path="/watchlist/:watchlistId" element={<WatchlistPage/>}/>
          </Routes>


          <div style={{position:'absolute', pointerEvents:'none', opacity:0}}>
            {preloadEmojis()}
          </div>


        </div>
      </MainProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
