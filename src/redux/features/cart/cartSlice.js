import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    values: [],
    count: 0,
  },
  reducers: {
    add: (state, action) => {
      state.values.push(action.payload);

      state.count = state.values.reduce((acc, product) => {
        product = JSON.parse(JSON.stringify(product));

        return acc + product.quantity;
      }, 0);
    },

    remove: (state, action) => {
      switch (action.payload) {
        case 0:
          state.values = [...state.values.splice(1)];
          break;
        case state.values.length - 1:
          state.values.pop();
          state.values = [...state.values];
          break;
        default:
          state.values = state.values.splice(action.payload, 1);
      }

      state.count = state.values.reduce((acc, product) => {
        product = JSON.parse(JSON.stringify(product));

        return acc + product.quantity;
      }, 0);
    },

    update: (state, action) => {
      state.values[action.payload.index] = action.payload.item;

      state.count = state.values.reduce((acc, product) => {
        product = JSON.parse(JSON.stringify(product));

        return acc + product.quantity;
      }, 0);
    },
  },
});

// Action creators are generated for each case reducer function
export const { add, remove, update } = cartSlice.actions;

export default cartSlice.reducer;
