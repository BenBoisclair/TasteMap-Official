const convertBahtToDollars = (baht: number): number => {
  const calculated = (baht * 0.028).toFixed(2);
  return parseFloat(calculated);
};

export default convertBahtToDollars;
