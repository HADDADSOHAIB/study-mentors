const formatter = minutes => {
  if (minutes / 10 >= 1) {
    return minutes;
  }
  return `0${minutes}`;
};

export default formatter;
