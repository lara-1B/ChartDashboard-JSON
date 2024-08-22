import { createSlice } from '@reduxjs/toolkit';
import dashboardData from '../data/dashboardData.json';

const initialState = {
  categories: JSON.parse(localStorage.getItem('dashboardCategories')) || dashboardData.categories,
  selectedCategory: dashboardData.selectedCategory
};

const saveToLocalStorage = (categories) => {
  localStorage.setItem('dashboardCategories', JSON.stringify(categories));
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addWidget: (state, action) => {
      const { categoryId, widget } = action.payload;
      const category = state.categories.find((cat) => cat.id === categoryId);
      if (category) {
        category.widgets.push({ ...widget, visible: true });
        saveToLocalStorage(state.categories);
      }
    },
    removeWidget: (state, action) => {
      const { categoryId, widgetId } = action.payload;
      const category = state.categories.find((cat) => cat.id === categoryId);
      if (category) {
        category.widgets = category.widgets.filter((widget) => widget.id !== widgetId);
        saveToLocalStorage(state.categories);
      }
    },
    toggleWidgetVisibility: (state, action) => {
      const { categoryId, widgetId } = action.payload;
      const category = state.categories.find((cat) => cat.id === categoryId);
      if (category) {
        const widget = category.widgets.find((widget) => widget.id === widgetId);
        if (widget) {
          widget.visible = !widget.visible;
          saveToLocalStorage(state.categories);
        }
      }
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    }
  },
});

export const { addWidget, removeWidget, toggleWidgetVisibility, setSelectedCategory } = categorySlice.actions;

export default categorySlice.reducer;
