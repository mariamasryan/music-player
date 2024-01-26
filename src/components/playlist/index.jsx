import styles from "./styles.module.scss"
import songIcon from "../../assets/icons8-music-80.png";
import { useDispatch, useSelector } from "react-redux";
import { useMemo, useState } from "react";
import { getData, songsData } from "../../features/songSlice";
import { SongComponent } from "../songComponent";
import { UploadForm } from "../uploadForm";
import { useEffect } from "react";
import searchIcon from "../../assets/icons8-search-30.png"

export const Playlist = () => {
    const dispatch = useDispatch();
    const [playingSong, setPlayingSong] = useState(null);
    const songs = useSelector(songsData)
    const [showPlaylist, setShowPlaylist] = useState(true);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [songIndex, setSongIndex] = useState(null)
    const [isPopUpOpen, setisPopUpOpen] = useState(false)
    const [song, setSong] = useState([]);
    const [searchedSong, setSearchedSong] = useState("");

    useMemo(() => {
        dispatch(getData());
    }, []);

    useEffect(() => {
        setSong(() => {
            const filteredData = songs.filter((item) =>
                item.name.toLowerCase().includes(searchedSong.toLowerCase())
            );
            return [...filteredData];
        });
    }, [searchedSong]);

    const displaySongs = searchedSong && searchedSong.length ? song : songs;

    const handlePlayingSong = (id) => {
        const customSong = songs.find(song => song.id === id)
        setPlayingSong(customSong);
        setShowPlaylist(false);
    };

    const handlePlayAll = () => {
        if (displaySongs.length >= 0) {
            setPlayingSong(displaySongs[currentSongIndex]);
            setShowPlaylist(false);
        }
    };

    const handleBackToPlaylist = () => {
        setShowPlaylist(true);
        setPlayingSong(null);
        setCurrentSongIndex(0);
    };


    return (
        <>
            {/* Playlist component start */}
            {
                showPlaylist && (
                    <>
                        <div className={styles.home}>
                            {/* Search component start */}
                            <div className={styles.generalStyles}>
                                <div className={styles.searchComponent}>
                                    <input
                                        type="text"
                                        className={styles.searchInput}
                                        value={searchedSong}
                                        onChange={(e) => setSearchedSong(e.target.value)}
                                        placeholder="Search"
                                    />
                                    <img src={searchIcon} alt="search" className={styles.searchIcon} />
                                </div>
                            </div>
                            {/* Search component end */}

                            {/* playlist start */}
                            <div className={`${styles.container} ${styles.generalStyles}`}>
                                {/* title start */}
                                <div className={styles.title}>
                                    <h3 className={styles.playlistTitle}>Playlist</h3>
                                    <div className={styles.buttons}>
                                        <span
                                            className={styles.addButton}
                                            onClick={() => setisPopUpOpen(true)}
                                        >Add</span>

                                        <div className={styles.playAllContainer}>
                                            <span className={styles.playAllButton}
                                                onClick={handlePlayAll}
                                            >Play all</span>
                                        </div>
                                    </div>
                                </div>
                                {/* title end */}
                                <div className={styles.playlist}>
                                    {/* Song item  start */}
                                    {displaySongs.length > 0 ?
                                        displaySongs.map((song, index) => (
                                            <div
                                                key={song.id}
                                                className={styles.songItemContainer}
                                                onClick={() => {
                                                    handlePlayingSong(song.id)
                                                    setSongIndex(index)
                                                }}
                                            >
                                                <div className={styles.songItem}>
                                                    <img src={songIcon} alt="" className={styles.songIcon} />
                                                    <div className={styles.songInfo}>
                                                        <span className={styles.songTitle}>{song.name}</span>
                                                        <p className={styles.songArtistInfo}>{song.artist}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )) : (
                                            <div className={styles.noFoundSong}>
                                                There is no result for searched song
                                            </div>
                                        )}
                                </div>
                                {isPopUpOpen && <UploadForm onClose={setisPopUpOpen} />}
                            </div>
                            {/* playlist end */}
                        </div>
                    </>
                )}
            {/* Playlist component end */}
            {playingSong && (
                <SongComponent
                    song={playingSong}
                    onBack={handleBackToPlaylist}
                    currentSongIndex={currentSongIndex}
                    displaySongs={displaySongs}
                    setPlayingSong={setPlayingSong}
                    setCurrentSongIndex={setCurrentSongIndex}
                    songIndex={songIndex}
                    setSongIndex={setSongIndex}
                />
            )}
        </>
    )
}
