import data from "../data.json";
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export const getData = createAsyncThunk("songs/getData", async () => {
    return data;
});

const initialState = {
    songsData: [],
    loading: false,
    errors: null
}

export const songSlice = createSlice({
    name: "songs",
    initialState,
    reducers: {
        addNewSong: (state, action) => {
            const { name } = action.payload;
            const parts = name.split(' - '); // Splitting the URL by ' - '
            const fullName = (parts[0].split(".")[0])
            const type = (parts[0].split(".")[1])
            return {
                ...state,
                songsData: state.songsData.concat({
                    id: uuidv4(),
                    name: fullName,
                    artist: fullName,
                    url: name,
                    type: type
                }),
            }
        }
    },

    extraReducers(builder) {
        //GET SONGS

        builder.addCase(getData.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getData.fulfilled, (state, action) => {
            state.loading = false;
            state.songsData = action.payload;
        });
        builder.addCase(getData.rejected, (state, action) => {
            state.loading = false;
            state.errors = action.error.message;
        });
    }
})
export const { addNewSong, addtoFavorites} = songSlice.actions;
export const songsData = (state) => state.songs.songsData;
export default songSlice.reducer;