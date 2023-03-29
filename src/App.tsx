import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { IEmoji, IWatchlist } from './Interfaces';
import { Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import Header from './components/Header';
import { getAllEmojis } from './utils/emoji';




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
        </Routes>


        <div style={{position:'absolute', pointerEvents:'none', opacity:0}}>
          {preloadEmojis()}
        </div>


      </div>
    </QueryClientProvider>
  );
}

export default App;
