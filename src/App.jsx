import "./App.css";
import MusicController from "./MusicController";
import TrackList from "./TrackList";
import { AudioProvider } from "./AppContext";
import { trackData } from "./AppContext";
import { useCallback, useEffect, useState, useRef} from "react";
import { shuffleArray } from "./utilities";
import { musicPlayer } from "./musicPlayer";

function App() {
  const [listIsOpen, setListIsOpen] = useState(true);
  const [isShuffle, setIsShuffle] = useState(false);
  const [trackList, setTrackList] = useState([...trackData]);
  const [currentId, setCurrentId] = useState(null);
  const currentTrack = trackList.find((track) => track.id === currentId);
  const currentIndex = trackList.indexOf(currentTrack);

  const toggleListAppear = () => {
    setListIsOpen(!listIsOpen);
  };

  const handleCurrentIdChange = (newId) => {
    setCurrentId(newId);
  };

  const handleShuffle = () => {
    setIsShuffle(true);
    if (trackList.length > 1) {
      const suffledTrackList = shuffleArray([...trackList]);
      setTrackList(suffledTrackList);
    }
  };

  const resetShuffle = useCallback(() => {
    setIsShuffle(false);
    setTrackList([...trackData]);
  }, []);

  const handlePrevious = useCallback(() => {
    if (currentIndex == 0 && currentId !== null) {
      setCurrentId(trackList[trackList.length - 1].id);
    } else {
      setCurrentId(trackList[currentIndex - 1].id);
    }
  }, [currentIndex, trackList]);

  const handleNext = useCallback(() => {
    if (currentIndex == trackList.length - 1 && currentId !== null) {
      setCurrentId(trackList[0].id);
    } else if(currentId !== null){
      setCurrentId(trackList[currentIndex + 1].id);
    }
  }, [currentIndex, trackList]);

  useEffect(() => {
    musicPlayer.addEventListener('ended', handleNext);
    return () => {
      musicPlayer.removeEventListener('ended', handleNext);
    }
  }, [handleNext]);

  return (
    <div className="app">
      <AudioProvider
        musicPlayer={musicPlayer}
        src={currentTrack? currentTrack.src : ''}
        key={currentId}
      >
        {listIsOpen && <TrackList
          trackList={trackList}
          currentId={currentId}
          handleCurrentIdChange={handleCurrentIdChange}
        />}
        <MusicController
          shuffleOperation={{ handleShuffle, resetShuffle, isShuffle }}
          trackJumpOperation={{ handlePrevious, handleNext }}
          currentTrack={currentTrack}
          trackListAppearOperation={{ listIsOpen, toggleListAppear }}
        />
      </AudioProvider>
    </div>
  );
}

export default App;
