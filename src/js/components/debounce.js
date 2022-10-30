const debounce = (callback) => {
  let timeout;
  return (argument) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => callback(argument), 500);
  };
};

export default debounce;
