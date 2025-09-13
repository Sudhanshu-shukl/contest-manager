const STORAGE_KEY = 'coding-contest-tracker';

export const loadContests = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading contests from localStorage:', error);
    return [];
  }
};

export const saveContests = (contests) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contests));
  } catch (error) {
    console.error('Error saving contests to localStorage:', error);
  }
};

export const clearContests = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing contests from localStorage:', error);
  }
};