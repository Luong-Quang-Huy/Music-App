import { useState } from "react";
import { HeartFilled } from "@ant-design/icons";
import { useFavoriteTrackContext, useFavoriteTrackDispatch } from "./AppContext";

export default function TrackDescription({currentTrack}){
  const {id, photo, name, artist} = currentTrack ?? {id: -1, photo: "hinh-vu-dep-2.jpg",name: "Track name",artist: "Artist name"};
   const liked = (() => {
    const favoriteIds = useFavoriteTrackContext();
    console.log(favoriteIds);
     return favoriteIds.includes(id);
   })();
   const favoriteTrackDispatch = useFavoriteTrackDispatch();

  const handleLike = () => {
    if(currentTrack){
      favoriteTrackDispatch({
        type: "like",
        taskId: id,
      });
    }
  }

  const handleDislike = () => {
    if(currentTrack){
      favoriteTrackDispatch({
        type: "dislike",
        taskId: id,
      });
    }
  };

  return (
    <div className="current-track__info-wrapper">
      <div className="current-track__photo-wrapper">
        <img className="current-track__photo" src={photo} alt={name} />
      </div>
      <div className="current-track__info">
        <p className="current-track__name">{name}</p>
        <p className="current-track__artist">{artist}</p>
      </div>
      <button
        onClick={liked ? handleDislike : handleLike}
        className={
          liked
            ? "btn btn-controller btn-controller--acitve"
            : "btn btn-controller"
        }
      >
        <HeartFilled />
      </button>
    </div>
  );
}
