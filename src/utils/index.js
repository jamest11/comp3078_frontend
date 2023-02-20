const formatTime = (seconds) => {
  return `${Math.floor(seconds / 60)}:` + `${seconds % 60}`.padStart(2, '0');
};

export { formatTime };