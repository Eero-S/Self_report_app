const showHome = async ({ render, session }) => {
  const user = await session.get("user");
  render("home.ejs", { user: user });
};

const showReportMoning = async ({ render, session }) => {
  const user = await session.get("user");
  const today = new Date().toISOString().split("T")[0];
  render("reportMorning.ejs", { user: user, errors: {}, today: today });
};

export { showHome, showReportMoning };
