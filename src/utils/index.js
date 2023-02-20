const formatTime = (seconds) => {
  return `${Math.floor(seconds / 60)}:` + `${seconds % 60}`.padStart(2, '0');
};

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
};

export { formatTime, formatDate };