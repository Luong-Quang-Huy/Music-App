import { useEffect, useState } from "react";
import { SwapOutlined, StepForwardFilled, StepBackwardFilled, PauseCircleFilled, PlayCircleFilled, RetweetOutlined} from "@ant-design/icons";
import Seeker from "./Seeker";
import { useAudioDispatch } from "./AppContext";
import { useAudioContext } from "./AppContext";
import { secondsToMiniutes } from "./utilities";
import { musicPlayer } from "./musicPlayer";

export default function AudioPlayer({ shuffleOperation, trackJumpOperation}) {

  const { isPlaying, loop} = useAudioContext();
  const [currentTime, setCurrentTime] = useState(musicPlayer.currentTime);
  const isShuffle = shuffleOperation.isShuffle;
  const duration = musicPlayer.duration;
  const trackDuration = secondsToMiniutes(duration);
  const trackCurrentTime = secondsToMiniutes(currentTime);
  const dispatch = useAudioDispatch();

  useEffect(() => {
    const updateCurrentTime = () => {
      setCurrentTime(musicPlayer.currentTime);
    };

    const timeOutId = setInterval(updateCurrentTime, 500);

    return () => {
      clearInterval(timeOutId);
    };
  }, [musicPlayer.currentTime]);

  const play = () => {
    dispatch({
      type: "play",
    });
  };

  const pause = () => {
    dispatch({
      type: "pause",
    });
  };

  const handleShuffle = () => {
    shuffleOperation.handleShuffle();
  }

  const resetShuffle = () => {
    shuffleOperation.resetShuffle();
  }

  const handlePrevious = () => {
    trackJumpOperation.handlePrevious();
  }

  const handleNext = () => {
    trackJumpOperation.handleNext();
  }

  const handleLoop = () => {
    dispatch({
      type: "loop",
      loop: true,
    });
  };

  const cancleLoop = () => {
    dispatch({
      type: "loop",
      loop: false,
    });
  };

  const currentTimeChange = (newValue) => {
    setCurrentTime(newValue);
    dispatch({
      type: "seek to",
      seekValue: newValue,
    });
  };

  return (
    <div className="audio-player-wrapper">
      <div className="audio-player__button-wrapper">
        {isShuffle ? <button className="btn btn--shuffle--in-shuffle btn-controller" onClick={resetShuffle}>
          <SwapOutlined />
        </button>:
        <button className="btn btn--shuffle" onClick={handleShuffle}>
          <SwapOutlined />
        </button>
        }
        <button className="btn btn--previous" onClick={handlePrevious}>
          <StepBackwardFilled />
        </button>
        {isPlaying ? (
          <button onClick={pause} className="btn play-pause-btn btn--pause">
            <PauseCircleFilled />
          </button>
        ) : (
          <button onClick={play} className="btn play-pause-btn btn--play">
            <PlayCircleFilled />
          </button>
        )}
        <button className="btn btn--next" onClick={handleNext}>
          <StepForwardFilled />
        </button>
        {loop ? (
          <button className="btn btn--loop--in-loop btn-controller" onClick={cancleLoop}>
            <RetweetOutlined />
          </button>
        ) : (
          <button className="btn btn--loop" onClick={handleLoop}>
            <RetweetOutlined />
          </button>
        )}
      </div>
      <div className="audio-player__seeking-wrapper">
        <span className="audio-time-label audio-time-label--current">
          {trackCurrentTime}
        </span>
        <div className="audio-player__seeker">
          <Seeker
            onValueChange={currentTimeChange}
            min={0}
            max={duration}
            value={currentTime}
          />
        </div>
        <span className="audio-time-label audio-time-label--end">
          {trackDuration}
        </span>
      </div>
    </div>
  );
}
