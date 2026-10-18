const users = {
  valid: {
    username: "standard_user",
    password: "secret_sauce",
  },
  lockedOut: {
    username: "locked_out_user",
    password: "secret_sauce",
  },
};

const invalidUsers = [
  {
    username: "invalid_user",
    password: "wrong_password",
  },
  {
    username: "standard_user",
    password: "wrong_password",
  },
];

module.exports = {
  users,
  invalidUsers,
};
