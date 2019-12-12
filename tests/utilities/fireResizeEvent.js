// simulate window resize
const fireResizeEvent = width => {
  window.innerWidth = width;
  window.dispatchEvent(new Event('resize'));
};

export default fireResizeEvent;
