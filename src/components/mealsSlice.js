// mealsSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const mealsSlice = createSlice({
  name: 'meals',
  initialState: [
   { name: 'Breakfast', cost: 300, selected: false },
    { name: 'High Tea', cost: 120, selected: false },
    { name: 'Lunch', cost: 700, selected: false },
    { name: 'Dinner', cost: 800, selected: false },
  ],
  reducers: {
    toggleMealSelection: (state, action) => {
      state[action.payload].selected = !state[action.payload].selected;
    },
  },
});

export const { toggleMealSelection } = mealsSlice.actions;

export default mealsSlice.reducer;
