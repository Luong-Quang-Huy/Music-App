import { HeartOutlined } from "@ant-design/icons";
import { useState } from "react";
import { PlayCircleFilled, PauseCircleFilled} from "@ant-design/icons";
import { useAudioDispatch, useAudioContext, useFavoriteTrackContext, useFavoriteTrackDispatch } from "./AppContext";


export default function TrackList({trackList, currentId, handleCurrentIdChange}){

    const trackElementsList = trackList.map((track,index) => <li key={track.id}>
            <Track
                key={track.id} 
                currentId={currentId} 
                track={track} 
                onPlaying={currentId == track.id} 
                index={index + 1} 
                handleCurrentIdChange={handleCurrentIdChange}
            />
        </li>);
    return<ul className="track-list">{trackElementsList}</ul>;
}

const Track = ({track , index, onPlaying, handleCurrentIdChange}) => {
    const {isPlaying} = useAudioContext();
    const {id, photo, name, artist} = track; 
    const dispath = useAudioDispatch();
    const [onHover, setOnHover] = useState(false);
    const trackName = name;
    const liked = (() => {
      const favoriteIds = useFavoriteTrackContext();
      return favoriteIds.includes(id);
    })();
    const favoriteTrackDispatch = useFavoriteTrackDispatch();

    const handleLike = () => {
      favoriteTrackDispatch({
        type: "like",
        taskId: id,
      });
    };

    const handleDislike = () => {
      favoriteTrackDispatch({
        type: "dislike",
        taskId: id,
      });
    };

    const handlePlay = () => {
        dispath({
            type: 'play',
        })
    }

    const handlePause = () => {
        dispath({
            type: 'pause',
        })
    }

    if(onPlaying){
        return (
          <div
            className="track-element-wrapper"
            onMouseEnter={() => setOnHover(true)}
            onMouseLeave={() => setOnHover(false)}
          >
            <div className="track-element__info-wrapper">
              {onHover ? (
                isPlaying ? <button onClick={handlePause} className="btn btn-track-element">
                  <PauseCircleFilled /></button> : <button onClick={handlePlay} className="btn btn-track-element">
                  <PlayCircleFilled />
                </button>
              ) : (
                <div className="btn-track-element track-element__now-playing">
                  <iframe
                    src="https://giphy.com/embed/nqDzOolZaPUgHAStiV"
                    width="100%"
                    height="100%"
                    className="giphy-embed"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
              <div className="track-element__photo-wrapper">
                <img src={photo} alt="photo" />
              </div>
              <div className="track-element__info">
                <p
                  className={
                    onPlaying
                      ? "track-element-name track-element-name--onplaying"
                      : "track-element-name"
                  }
                >
                  {trackName}
                </p>
                <p className="track-element-artist">{artist}</p>
              </div>
            </div>
            {onHover && (
              <button
                onClick={liked ? handleDislike : handleLike}
                className={
                  liked
                    ? "btn btn-controller btn-controller--acitve"
                    : "btn btn-controller"
                }
              >
                <HeartOutlined />
              </button>
            )}
          </div>
        );

    }else{
        return (
          <div
            className="track-element-wrapper"
            onMouseEnter={() => {
              setOnHover(true);
            }}
            onMouseLeave={() => {
              setOnHover(false);
            }}
          >
            <div className="track-element__info-wrapper"
                onClick={() => {handleCurrentIdChange(id)}}
            >
              {onHover ? (
                <button className="btn btn-track-element">
                  <PlayCircleFilled />
                </button>
              ) : (
                <p className="track-index">{index}</p>
              )}
              <div className="track-element__photo-wrapper">
                <img src={photo} alt="photo" />
              </div>
              <div className="track-element__info">
                <p
                  className={
                    onPlaying
                      ? "track-element-name track-element-name--onplaying"
                      : "track-element-name"
                  }
                >
                  {trackName}
                </p>
                <p className="track-element-artist">{artist}</p>
              </div>
            </div>
            {onHover && (
              <button
                onClick={liked ? handleDislike : handleLike}
                className={
                  liked
                    ? "btn btn-controller btn-controller--acitve"
                    : "btn btn-controller"
                }
              >
                <HeartOutlined />
              </button>
            )}
          </div>
        );
    }
}