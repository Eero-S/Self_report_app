import { executeQuery } from "../../database/database.js";
import {
  validate,
  required,
  isNumber,
  maxNumber,
  minNumber,
} from "../../deps.js";

const morningValidationRules = {
  dateInput: [required],
  sleep: [required, isNumber, minNumber(0), maxNumber(24)],
  quality: [required, isNumber, minNumber(1), maxNumber(5)],
  mood: [required, isNumber, minNumber(1), maxNumber(5)],
};

const reportMorning = async ({ request, response, session }) => {
  const user = await session.get("user");
  const body = request.body();
  const params = await body.value;

  const dateInput = params.get("dateInput");
  const sleep = params.get("sleep");
  const quality = params.get("quality");
  const mood = params.get("mood");

  const [passes, errors] = await validate(
    { dateInput, sleep, quality, mood },
    morningValidationRules
  );

  if (!passes) {
    await session.set("errors", errors);
    render("reportMorning.ejs", { ...data });
  }

  await executeQuery(
    "INSERT INTO morningReports (data, sleep, quality, mood, user_id) VALUES ($1, $2, $3, $4);",
    email,
    hash
  );

  response.redirect("/behavior/reporting");
};

export { reportMorning };
