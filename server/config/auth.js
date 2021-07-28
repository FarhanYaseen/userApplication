const secret = process.env.SECRET || "1a20a716-1679-47e3-84d2-3540042b5f70";
const expiresIn = process.env.EXPIRY || 86400; // 24 hours
module.exports = {
  secret,
  expiresIn
};
