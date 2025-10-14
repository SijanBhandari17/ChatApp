import { create } from 'zustand';

const filterStore = create(set => ({
  filteredUser: [],
  setFilteredUser: filteredUser => set({ filteredUser }),
}));

const useFilterStore = () => {
  const { filteredUser, setFilteredUser } = filterStore();
  return { filteredUser, setFilteredUser };
};
export default useFilterStore;
