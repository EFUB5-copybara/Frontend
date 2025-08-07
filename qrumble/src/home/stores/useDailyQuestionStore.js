import { create } from 'zustand';
import { getDailyQuestion } from '../api/homepage';

const useDailyQuestionStore = create((set) => ({
  question: '',
  error: null,
  isLoading: false,
  targetDate: '',

  async fetchQuestionByDate(dateStr) {
    set({ isLoading: true, error: null, targetDate: dateStr });

    try {
      const res = await getDailyQuestion(dateStr);
      set({ question: res.content, isLoading: false });
    } catch (e) {
      set({
        question: '',
        error: '해당 날짜의 질문을 불러오지 못했습니다.',
        isLoading: false,
      });
    }
  },
}));

export default useDailyQuestionStore;
