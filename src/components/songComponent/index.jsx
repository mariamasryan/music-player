import styles from "./styles.module.scss";
import { useRef } from "react";
import { useState } from "react";
import singleSong from "../../assets/icons8-music-80.png";
import backwardIcon from "../../assets/icons8-skip-to-start-30.png";
import playIcon from "../../assets/icons8-play-30.png";
import pauseIcon from "../../assets/icons8-pause-30.png"
import forwardIcon from "../../assets/icons8-end-30.png";
import backIcon from "../../assets/icons8-back-30.png"

export const SongComponent = ({ song, onBack, setSongIndex, songIndex, displaySongs, setPlayingSong }) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const durationRef = useRef(null);


    const handlePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleSongDuration = () => {
        const audioDuration = audioRef.current.duration
        const minutes = Math.floor(audioDuration / 60);
        const seconds = Math.floor(audioDuration % 60);
        setDuration({ minutes, seconds });
    };

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
    };

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
        return formattedTime;
    };

    const handleInputChange = (value) => {
        setCurrentTime(value);
        audioRef.current.currentTime = value;
    };

    const handleLoadedMetadata = () => {
        handleSongDuration()
        handleTimeUpdate()
    }

    const playAll = () => {
        const nextIndex = songIndex + 1;
        setSongIndex(nextIndex);
        if (nextIndex < displaySongs.length) {
            const nextSong = displaySongs[nextIndex];
            audioRef.current.src = require(`../../songs/${nextSong.url1}`);
            setIsPlaying(true);
            audioRef.current.play();
            setPlayingSong(displaySongs[nextIndex])

        } else {
            setIsPlaying(false);
        }
    };

    const playNextSong = () => {
        const nextIndex = songIndex + 1;
        setSongIndex(nextIndex);
        if (nextIndex < displaySongs.length) {
            const nextSong = displaySongs[nextIndex];
            audioRef.current.src = require(`../../songs/${nextSong.url1}`);
            setIsPlaying(true);
            audioRef.current.play();
            setPlayingSong(displaySongs[nextIndex])

        } else {
            setIsPlaying(false);
        }
    }

    const playPreviousSong = () => {
        const nextIndex = songIndex - 1;
        setSongIndex(nextIndex);
        if (nextIndex >= 0) {
            const nextSong = displaySongs[nextIndex];
            audioRef.current.src = require(`../../songs/${nextSong.url1}`);
            setIsPlaying(true);
            audioRef.current.play();
            setPlayingSong(displaySongs[nextIndex])

        } else {
            setIsPlaying(false);
        }
    }


    return (
        <div className={`${styles.container} ${styles.generalStyles}`}  >
            {/* song row title */}
            <div className={styles.songTitleParent}>
                <div onClick={onBack}>
                    <img src={backIcon} alt="back" />
                </div>
                <div className={styles.name}>
                    <h2 className={styles.songName}> {song.name}</h2>
                    <span className={styles.artist}>{song.artist}</span>
                </div>
            </div>
            {/* song row title end */}
            <form onSubmit={(e) => {
                e.preventDefault();
            }}
                className={styles.songParent}
            >
                {/* song icon start */}
                <div className={styles.songIcon}>
                    <div className={styles.songIconParent}>
                        <img src={singleSong} alt="" />
                    </div>
                </div>
                {/* song icon end */}
                {/* player start */}
                <div className={styles.player}>
                    <audio
                        ref={audioRef}
                        onTimeUpdate={handleTimeUpdate}
                        onEnded={playAll}
                        onLoadedMetadata={handleLoadedMetadata}
                    >
                        <source src={require(`../../songs/${song.url1}`)} type="audio/mpeg" />
                        <source src={require(`../../songs/${song.url2}`)} type="audio/wav" />
                    </audio>
                    {/* song range start */}
                    <div className={styles.range}>
                        <input
                            type="range"
                            value={currentTime}
                            max={audioRef.current?.duration || "00:00"}
                            onChange={(e) => handleInputChange(e.target.value)}
                        />
                    </div>
                    {/* song range end */}
                    {/* song time start */}
                    <div className={styles.songTime}>
                        <span>{formatTime(currentTime)}</span>
                        <span ref={durationRef}>{formatTime(duration.minutes * 60 + duration.seconds)}</span>
                    </div>
                    {/* song time end */}
                    {/* song buttons start */}
                    <div className={styles.playingButtons}>
                        <div className={styles.buttonsContainer}>
                            <div className={styles.songButton}
                                onClick={playPreviousSong}
                            >
                                <img src={backwardIcon} alt="" />
                            </div>
                            <div className={`${styles.songButton} ${styles.playAndPause}`} onClick={handlePlayPause}>
                                {isPlaying ? <img src={pauseIcon} /> : <img src={playIcon} />}
                            </div>
                            <div className={styles.songButton}
                                onClick={playNextSong}
                            >
                                <img src={forwardIcon} alt="" />
                            </div>
                        </div>
                    </div>
                    {/* song buttons end */}
                </div>
                {/* player end */}
            </form>
        </div>
    )
}