import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  listSV: [],
  svEdit: {},
  filter: ''
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    addSV: (state, { payload }) => {
      state.listSV = [
        ...state.listSV,
        { ...payload, key: new Date().getTime() },
      ];
    },
    deleteSV: (state, { payload }) => {
      state.listSV = state.listSV.filter((sv) => sv.idSV !== payload.idSV);
    },
    editSV: (state, { payload }) => {
      state.listSV = state.listSV.map((sv) => {
        if(sv.idSV !== payload.idSV) return sv
        return payload
      });

      state.svEdit = {}
    },
    changeSVEdit: (state, { payload }) => {
      state.svEdit = payload;
    },
    changeFilter: (state, { payload }) => {
      state.filter = payload;
    },
  },
});

export const {
  increment,
  decrement,
  incrementByAmount,
  addSV,
  deleteSV,
  changeSVEdit,
  editSV,
  changeFilter
} = counterSlice.actions;

export default counterSlice.reducer;
