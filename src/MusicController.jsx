import TrackDescription from "./TrackDescription"
import AudioPlayer from "./AudioPlayer"
import AudioManager from "./AudioManager"

export default function MusicController({currentTrack, shuffleOperation, trackJumpOperation, trackListAppearOperation}){
    return (
        <div className="music-controller">
            <TrackDescription currentTrack={currentTrack}/>
            <AudioPlayer shuffleOperation={shuffleOperation} trackJumpOperation={trackJumpOperation}/>
            <AudioManager trackListAppearOperation={trackListAppearOperation} />
        </div>);
}



