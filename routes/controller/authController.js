const showLogin = async ({ render, session }) => {
  const errors = await session.get("errors");
  render("login.ejs", { errors: errors });
};

const showRegister = async ({ render, session }) => {
  const errors = await session.get("errors");
  const email = await session.get("RegistrationEmailInput");
  render("register.ejs", { errors: errors, email: email });
};

export { showLogin, showRegister };
