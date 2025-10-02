const generateNumber = participants => {
  const x = participants[0];
  const y = participants[1];
  return (1 / 2) * (x + y) * (x + y + 1) + y;
};

export default generateNumber;
