import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios"

const initialState = {
    magazines: [],
    publishers: [],
    themes: [],
    avgPrice: 0
}

export const getAllMagazines = createAsyncThunk(
    'magazine/getAllMagazines',
    async () => {
        const response = await axios.get('http://localhost:7070/api/magazine/')
        console.log(response)
        return response.data;
    }
)

export const getAllPublishers = createAsyncThunk(
    'magazine/getPublishers',
    async () => {
        const response = await axios.get('http://localhost:7070/api/magazine/publisher/')
        console.log(response)
        return response.data;
    }
)

export const getAllThemes = createAsyncThunk(
    'magazine/getThemes',
    async () => {
        const response = await axios.get('http://localhost:7070/api/magazine/themes')
        return response.data;
    }
);

export const createMagazine = createAsyncThunk(
    'magazine/create',
    async (data,thunkAPI)  => {
        await axios.post('http://localhost:7070/api/magazine/create', {...data})
        thunkAPI.dispatch(getAllMagazines())
    }
)

export const deleteMagazine = createAsyncThunk(
    'magazine/delete',
    async (id,thunkAPI)  => {
        await axios.delete(`http://localhost:7070/api/magazine/delete/${id}`, )
        thunkAPI.dispatch(getAllMagazines())
    }
)

export const updateMagazine = createAsyncThunk(
    'magazine/update',
    async (data,thunkAPI)  => {
        // console.log(data)
        console.log(data.editItem)
        console.log(data.finalData)
        await axios.put(`http://localhost:7070/api/magazine/update/${data.editItem}`, {...data.finalData})
        thunkAPI.dispatch(getAllMagazines())
    }
)

export const getAveragePrice = createAsyncThunk(
    'magazine/averagePrice',
    async (theme,thunkAPI)  => {
        console.log(theme)
        const response = await axios.get(`http://localhost:7070/api/magazine/average/theme?theme=${theme}`)
        console.log(response.data)
        return response.data
    }
)


export const magazineSlice = createSlice({
    name: 'magazine',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllMagazines.fulfilled, (state, action) => {
                state.magazines = action.payload
            })
            .addCase(getAllThemes.fulfilled, (state, action) => {
                state.themes = action.payload
            })
            .addCase(getAllPublishers.fulfilled, (state, action) => {
                state.publishers = action.payload
            })
            .addCase(getAveragePrice.fulfilled, (state, action) => {
                state.avgPrice = action.payload
            })
    },
})

// export const {} = magazineSlice.actions;

export default magazineSlice.reducer;