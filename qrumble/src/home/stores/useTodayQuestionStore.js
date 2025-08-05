import { create } from 'zustand';

const useTodayQuestionStore = create((set) => ({
  todayQuestion: '',
  todayQuestionError: null,
  setTodayQuestion: (question) => set({ todayQuestion: question }),
  setTodayQuestionError: (error) => set({ todayQuestionError: error }),
}));

export default useTodayQuestionStore;
