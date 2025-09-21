const handleHomeRequest = (req, res) => {
  const { userName, email } = req.body;
  console.log(userName, email);
  return res.status(200).json({ message: `Hello!, ${userName}` });
};
module.exports = handleHomeRequest;
