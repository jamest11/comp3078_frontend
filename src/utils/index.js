const formatTime = (seconds) => {
  return `${Math.floor(seconds / 60)}:` + `${seconds % 60}`.padStart(2, '0');
};

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
};

const emailValidatorRx = /(?!.*[-_.]{2}.*)^[a-zA-Z\d][a-zA-Z\d._-]+[a-zA-Z\d]@([a-zA-Z\d][a-zA-Z\d-]*[a-zA-Z\d]\.){1,}[a-z]{2,}$/;

export { formatTime, formatDate, emailValidatorRx };