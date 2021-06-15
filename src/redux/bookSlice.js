import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios"

const initialState = {
    books: [],
    publishers: [],
    genres: [],
    authors: [],
    avgPrice: 0
}

export const getAllBooks = createAsyncThunk(
    'book/getAllBooks',
    async () => {
        const response = await axios.get('http://localhost:7070/api/book/')
        return response.data;
    }
)

export const getAllGenres = createAsyncThunk(
    'magazine/getGenres',
    async () => {
        const response = await axios.get('http://localhost:7070/api/book/genre')
        return response.data;
    }
);

export const getAllAuthors = createAsyncThunk(
    'magazine/getAuthors',
    async () => {
        const response = await axios.get('http://localhost:7070/api/book/author')
        return response.data;
    }
);

export const createBook = createAsyncThunk(
    'book/create',
    async (data,thunkAPI)  => {
        await axios.post('http://localhost:7070/api/book/create', {...data})
        thunkAPI.dispatch(getAllBooks())
    }
)

export const deleteBook = createAsyncThunk(
    'book/delete',
    async (id,thunkAPI)  => {
        await axios.delete(`http://localhost:7070/api/book/delete/${id}`, )
        thunkAPI.dispatch(getAllBooks())
    }
)

export const updateBook = createAsyncThunk(
    'book/update',
    async (data,thunkAPI)  => {
        await axios.put(`http://localhost:7070/api/book/update/${data.editItem}`, {...data.finalData})
        thunkAPI.dispatch(getAllBooks())
    }
)

export const getAveragePrice = createAsyncThunk(
    'book/averagePrice',
    async (genre,thunkAPI)  => {
        const response = await axios.get(`http://localhost:7070/api/book/average/genre?genre=${genre}`)
        console.log(response.data)
        return response.data
    }
)

export const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllBooks.fulfilled, (state, action) => {
                state.books = action.payload
            })
            .addCase(getAllGenres.fulfilled, (state, action) => {
                state.genres = action.payload
            })
            .addCase(getAllAuthors.fulfilled, (state, action) => {
                state.authors = action.payload
            })
            .addCase(getAveragePrice.fulfilled, (state, action) => {
                state.avgPrice = action.payload
            })
    },
})

export default bookSlice.reducer;