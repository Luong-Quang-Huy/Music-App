import { useState } from "react";
import { HeartFilled } from "@ant-design/icons";

export default function TrackDescription({currentTrack}) {
  const [liked, setLiked] = useState(false);
  const {photo, name, artist} = currentTrack ?? {photo: "../public/hinh-vu-dep-2.jpg",name: "Track name",artist: "Artist name"};

  const toggleLike = () => {
    setLiked(!liked);
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
        onClick={toggleLike}
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
