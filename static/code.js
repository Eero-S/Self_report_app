function getNumberOfWeek() {
  const today = new Date();
  const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
  const pastDaysOfYear = (today - firstDayOfYear) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

const setDataHelper = (data, id, isWeek = false) => {
  // Clear old data
  document.querySelectorAll(`#${id} > *`).forEach((item) => item.remove());

  // Set data (averages)
  if (data && Object.values(data).filter((item) => item !== null).length > 0) {
    for (var key in data) {
      const currentValue = data[key];
      const element = document.createElement("li");

      element.appendChild(
        document.createTextNode(
          `${key}: ${currentValue ? currentValue : "No data available"}`
        )
      );
      document.querySelector(`#${id}`).appendChild(element);
    }
  } else {
    const element = document.createElement("li");
    element.appendChild(
      document.createTextNode(
        `Data for this ${isWeek ? "week" : "month"} does not exist.`
      )
    );
    document.querySelector(`#${id}`).appendChild(element);
  }
};

const setDefaultValues = async () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const week = getNumberOfWeek();

  const resMonth = await fetch(`/data/reports?year=${year}&month=${month - 1}`);
  const resJsonMonth = await resMonth.json();

  setDataHelper(resJsonMonth, "monthlyAverages");
  document.querySelector("#monthInput").value = `${year}-${month - 1}`;

  const resWeek = await fetch(`/data/reports?year=${year}&week=${week - 1}`);
  const resJsonWeek = await resWeek.json();

  setDataHelper(resJsonWeek, "weeklyAverages", true);
  document.querySelector("#weekInput").value = `${year}-W${week - 1}`;
};

const setWeek = async () => {
  const value = document.querySelector("#weekInput").value;
  const [year, week] = value.split("-W");

  const response = await fetch(`/data/reports?year=${year}&week=${week}`);
  const resJson = await response.json();

  setDataHelper(resJson, "weeklyAverages", true);
};

const setMonth = async () => {
  const value = document.querySelector("#monthInput").value;
  const [year, month] = value.split("-");

  const response = await fetch(`/data/reports?year=${year}&month=${month}`);
  const resJson = await response.json();

  setDataHelper(resJson, "monthlyAverages");
};

if (window.location.pathname == "/behavior/reporting") {
  window.onload = () => {
    setDefaultValues();
  };
}
