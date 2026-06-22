export const stopEvent = (e: React.SyntheticEvent): void => {
  e.preventDefault();
  e.stopPropagation();
};
