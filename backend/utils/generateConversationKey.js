const generateKey = participants => {
  return `conversation:${[...participants].sort().join(':')}`;
};

export default generateKey;
