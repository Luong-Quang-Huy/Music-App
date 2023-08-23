import { useContext, createContext, useReducer, useEffect } from "react";

const AudioDispatchContext = createContext(null);
const AudioContext = createContext(null);
const FavoriteTrackContext = createContext([]);
const FavoriteTrackDispatchContext = createContext(null);

export const useAudioDispatch = () => {
  return useContext(AudioDispatchContext);
};

export const useAudioContext = () => {
  return useContext(AudioContext);
};

export const useFavoriteTrackContext = () => {
  return useContext(FavoriteTrackContext);
}

export const useFavoriteTrackDispatch = () => {
  return useContext(FavoriteTrackDispatchContext);
}

const audioReducer = (state, action) => {
  switch (action.type) {
    case "play": {
      return {
        ...state,
        isPlaying: true,
      };
    }
    case "pause": {
      return {
        ...state,
        isPlaying: false,
      };
    }
    case "seek to": {
      return {
        ...state,
        seekTo: action.seekValue,
      };
    }

    case "volume change": {
      return {
        ...state,
        volume: action.volumeValue,
      };
    }
    case "loop": {
      return {
        ...state,
        loop: action.loop,
      };
    }
    default: {
      throw Error(`unknow audio action ${action.type}`);
    }
  }
};

const favoriteTrackReducer = (idList, action) => {
  switch(action.type){
    case 'like': {
      if(!idList.includes(action.taskId)){
        return [...idList, action.taskId];
      }
      return idList;
    }
    case 'dislike': {
      if(idList.includes(action.taskId)){
        return idList.filter(id => id !== action.taskId);
      }
      return idList; 
    }
    default: {
      throw Error(`unknown favorite action type: ${action.type}`);
    }
  }
}

export function AudioProvider({ musicPlayer, src, children }) {
  const [audioState, dispatchAudio] = useReducer(audioReducer, {
    isPlaying: false,
    seekTo: 0,
    volume: musicPlayer.volume,
    loop: false,
  });
  const [favoriteTrack, dispatchFavoriteTrack] = useReducer(favoriteTrackReducer, []);
  const isPlaying = audioState.isPlaying;
  const seekTo = audioState.seekTo;
  const volume = audioState.volume;
  const loop = audioState.loop;

  useEffect(() => {
    musicPlayer.currentTime = seekTo;
  }, [seekTo]);

  useEffect(() => {
    musicPlayer.volume = volume;
  }, [volume]);

  useEffect(() => {
    musicPlayer.loop = loop;
  }, [loop]);

  useEffect(() => {
    if (isPlaying) {
      musicPlayer.play();
    } else {
      musicPlayer.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    function autoPlay() {
      dispatchAudio({
        type: "play",
      });
    }
    musicPlayer.src = src;
    musicPlayer.addEventListener("canplaythrough", autoPlay);
    return () => {
      function reset() {
        musicPlayer.removeEventListener("canplaythrough", autoPlay);
        musicPlayer.pause();
      }
      reset();
    };
  }, [src]);

  return (
    <FavoriteTrackContext.Provider value={favoriteTrack}>
      <FavoriteTrackDispatchContext.Provider value={dispatchFavoriteTrack}>
        <AudioContext.Provider value={{ ...audioState }}>
          <AudioDispatchContext.Provider value={dispatchAudio}>
            {children}
          </AudioDispatchContext.Provider>
        </AudioContext.Provider>
      </FavoriteTrackDispatchContext.Provider>
    </FavoriteTrackContext.Provider>
  );
}

export const trackData = [
  {
    id: 1,
    src: "YOASOBI-yoru-ni-kaeru.mp3",
    photo: "yoru-ni-kaeru-background.jpg",
    name: "Yoru ni kakeru (Tiến vào màn đêm) | Official Music",
    artist: "YOASOBI",
  },
  {
    id: 2,
    src: "DƯỚI TÒA SEN VÀNG HOT TIKTOK REMIX CỰC CHÁY.mp3",
    photo: "duoi-toa-sen-vang-background.jpg",
    name: "DƯỚI TÒA SEN VÀNG HOT TIKTOK REMIX CỰC CHÁY",
    artist: "RubiEDM",
  },
  {
    id: 3,
    src: "y2mate.com - Brook Xiao  Fire Lyrics ft Rachel Horter.mp3",
    photo: "fire.jpg",
    name: "Brook Xiao - Fire (Lyrics) ft. Rachel Horter",
    artist: "Brook Xiao",
  },
  {
    id: 4,
    src: "y2mate.com - DONT CÔI.mp3",
    photo: "dont-coi.jpg",
    name: "DON'T CÔI",
    artist: "RPT ORIJINN",
  },
  {
    id: 5,
    src: "Yêu Từ Đâu Mà Ra Remix TikTok.mp3",
    photo: "yeu-tu-dau-ma-ra-background.jpg",
    name: "Yêu Từ Đâu Mà Ra Remix TikTok",
    artist: "TRÀ CHANH REMIX",
  },
  {
    id: 6,
    src: "Craig David  Insomnia Official Video.mp3",
    photo: "insomnia.jpg",
    name: "Craig David  Insomnia Official",
    artist: "Craig David",
  },
  {
    id: 7,
    src: "y2mate.com - Như Một Người Dưng  Nguyễn Thạc Bảo Ngọc x RyanLo  Fi Ver by 1 9 6 7 Audio Lyrics.mp3",
    photo: "ntbn.jpg",
    name: "Như Một Người Dưng  Fi Ver by 1 9 6 7",
    artist: "Nguyễn Thạc Bảo Ngọc x RyanLo",
  },
  {
    id: 8,
    src: "y2mate.com - Barren Gates  MIME  Enslaved NCS Release.mp3",
    photo: "ncs.jpg",
    name: "Barren Gates & M.I.M.E - Enslaved [NCS Release]",
    artist: "Barren Gates & MIME",
  },
];
