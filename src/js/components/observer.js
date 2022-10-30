const observer = (ref, callback) => {
  const cb = (elements) => {
    elements.forEach((element) => {
      if (element.isIntersecting) {
        callback();
      }
    });
  };

  const newObserver = new IntersectionObserver(cb);

  newObserver.observe(ref);
};

export default observer;
