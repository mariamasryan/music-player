import styles from "./styles.module.scss"
import { Playlist } from "../playlist"

export const MusicPlayer = () => {
    return (
        <div className={styles.container}>
            <Playlist />
        </div>
    )
}