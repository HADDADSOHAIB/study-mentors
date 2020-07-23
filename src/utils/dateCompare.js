export const lessThen = (date1, date2) => {
  const [hour1, min1] = date1.split(':');
  const [hour2, min2] = date2.split(':');
  if (parseInt(hour1, 10) <= parseInt(hour2, 10)) {
    return true;
  }
  if (parseInt(hour1, 10) === parseInt(hour2, 10) && parseInt(min1, 10) <= parseInt(min2, 10)) {
    return true;
  }

  return false;
};

export const biggerThen = (date1, date2) => {
  const [hour1, min1] = date1.split(':');
  const [hour2, min2] = date2.split(':');
  if (parseInt(hour1, 10) >= parseInt(hour2, 10)) {
    return true;
  }
  if (parseInt(hour1, 10) === parseInt(hour2, 10) && parseInt(min1, 10) >= parseInt(min2, 10)) {
    return true;
  }

  return false;
};
