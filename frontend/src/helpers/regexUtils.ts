const patternDeleted = /_DELETE[D]?_[a-zA-Z0-9]{3}/;

export const containsDeleteSequence = (text: string): boolean => {
  return patternDeleted.test(text);
};

export const removeDeleteSequence = (text: string): string => {
  return text.replace(patternDeleted, '');
}
