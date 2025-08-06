import { create } from 'zustand';
import { getDailyQuestion } from '../api/homepage';

const useTodayQuestionStore = create((set, get) => ({
  todayQuestion: '',
  todayQuestionDate: '',
  todayQuestionError: null,
  isLoading: false,

  setTodayQuestion: (question) => set({ todayQuestion: question }),
  setTodayQuestionError: (error) => set({ todayQuestionError: error }),

  async fetchTodayQuestion(date) {
    const state = get();
    if (state.todayQuestionDate === date) return; // 이미 불러온 날짜면 skip

    set({ isLoading: true });

    try {
      const res = await getDailyQuestion(date);
      set({
        todayQuestion: res.content,
        todayQuestionDate: date,
        todayQuestionError: null,
        isLoading: false,
      });
    } catch (e) {
      set({
        todayQuestion: '',
        todayQuestionDate: date,
        todayQuestionError: '질문을 불러올 수 없습니다.',
        isLoading: false,
      });
    }
  },
}));

export default useTodayQuestionStore;
