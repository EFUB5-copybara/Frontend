import { create } from 'zustand';
import { getTodayQuestion } from '../api/homepage';

const useTodayQuestionStore = create((set) => ({
  todayQuestion: '',
  todayQuestionError: null,
  isLoading: false,

  async fetchTodayQuestion() {
    set({ isLoading: true });

    try {
      const res = await getTodayQuestion();
      set({
        todayQuestion: res.content, // API 응답에 따라 조정
        todayQuestionError: null,
        isLoading: false,
      });
    } catch (e) {
      set({
        todayQuestion: '',
        todayQuestionError: '오늘 질문을 불러올 수 없습니다.',
        isLoading: false,
      });
    }
  },
}));

export default useTodayQuestionStore;
