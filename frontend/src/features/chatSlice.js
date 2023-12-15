import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const CONVERSATION_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/conversation`;
const MESSAGE_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/message`;

const initialState = {
    status: "",
    error: "",
    conversations: [],
    activeConversation: {},
    messages: [],
    notifications: [],
    files: [],
};

export const getConversations = createAsyncThunk(
    "conervsation/all",
    async (token, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(CONVERSATION_ENDPOINT, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.error.message);
        }
    }
);

export const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setActiveConversation: (state, action) => {
            state.activeConversation = action.payload;
        },
        updateMessagesAndConversations: (state, action) => {
            //update messages
            let convo = state.activeConversation;
            if (convo._id === action.payload.conversation._id) {
                state.messages = [...state.messages, action.payload];
            }
            //update conversations
            let conversation = {
                ...action.payload.conversation,
                latestMessage: action.payload,
            };
            let newConvos = [...state.conversations].filter(
                (c) => c._id !== conversation._id
            );
            newConvos.unshift(conversation);
            state.conversations = newConvos;
        },
        addFiles: (state, action) => {
            state.files = [...state.files, action.payload];
        },
        clearFiles: (state, action) => {
            state.files = [];
        },
        removeFileFromFiles: (state, action) => {
            let index = action.payload;
            let files = [...state.files];
            let fileToRemove = [files[index]];
            state.files = files.filter((file) => !fileToRemove.includes(file));
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getConversations.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(getConversations.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.conversations = action.payload;
            })
            .addCase(getConversations.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
    },
});
export const {
    setActiveConversation,
    updateMessagesAndConversations,
    addFiles,
    clearFiles,
    removeFileFromFiles,
} = chatSlice.actions;

export default chatSlice.reducer;