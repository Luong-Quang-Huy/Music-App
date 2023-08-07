import { useContext, createContext, useReducer, useEffect } from "react";

const AudioDispatchContext = createContext(null);
const AudioContext = createContext(null);

export const useAudioDispatch = () => {
  return useContext(AudioDispatchContext);
};

export const useAudioContext = () => {
  return useContext(AudioContext);
};

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
      throw Error(`unknow action ${action.type}`);
    }
  }
};

export function AudioProvider({ musicPlayer, src, children }) {
  const [audioState, dispatch] = useReducer(audioReducer, {
    isPlaying: false,
    seekTo: 0,
    volume: musicPlayer.volume,
    loop: false,
  });

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
      dispatch({
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
    <AudioContext.Provider value={{ ...audioState }}>
      <AudioDispatchContext.Provider value={dispatch}>
        {children}
      </AudioDispatchContext.Provider>
    </AudioContext.Provider>
  );
}

export const trackData = [
  {
    id: 0,
    src: "../public/YOASOBI-yoru-ni-kaeru.mp3",
    photo: "../public/yoru-ni-kaeru-background.jpg",
    name: "Yoru ni kakeru (Tiến vào màn đêm) | Official Music",
    artist: "YOASOBI",
  },
  {
    id: 1,
    src: "../public/DƯỚI TÒA SEN VÀNG HOT TIKTOK REMIX CỰC CHÁY.mp3",
    photo: "../public/duoi-toa-sen-vang-background.jpg",
    name: "DƯỚI TÒA SEN VÀNG HOT TIKTOK REMIX CỰC CHÁY",
    artist: "RubiEDM",
  },
  {
    id: 2,
    src: "../public/One Piece  Luffy  Ace  Suốt đời là anh em.mp3",
    photo: "../public/luffy.jpg",
    name: "NONSTOP VIỆT MIX 2021 - Suốt Đời Là Anh Em",
    artist: "Luffy",
  },
  {
    id: 3,
    src: "../public/Fall Out Boy - THE PHOENIX (Kinetic Typography Lyrics) (128 kbps).mp3",
    photo: "../public/the-phoenix-background.jpg",
    name: "Fall Out Boy - THE PHOENIX (Kinetic Typography Lyrics)",
    artist: "fallout boy",
  },
  {
    id: 4,
    src: "../public/Yêu Từ Đâu Mà Ra Remix TikTok.mp3",
    photo: "../public/yeu-tu-dau-ma-ra-background.jpg",
    name: "Yêu Từ Đâu Mà Ra Remix TikTok",
    artist: "TRÀ CHANH REMIX",
  },
];
