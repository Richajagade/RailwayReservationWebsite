const searchForm = document.getElementById("searchForm");
const results = document.getElementById("results");
const trainList = document.getElementById("trainList");
const searchSummary = document.getElementById("searchSummary");
const journeyDate = document.getElementById("date");

// Set the date input to today as a convenient starting point.
const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
  .toISOString().slice(0, 10);
journeyDate.min = localToday;
journeyDate.value = localToday;

const sampleTrains = [
  { name: "Deccan Express", number: "11007", departure: "07:00", arrival: "10:25", fare: 185 },
  { name: "Intercity Express", number: "12127", departure: "11:05", arrival: "14:20", fare: 240 },
  { name: "Evening Superfast", number: "22105", departure: "18:15", arrival: "21:30", fare: 320 }
];

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const from = document.getElementById("from").value.trim();
  const to = document.getElementById("to").value.trim();
  const date = journeyDate.value;
  const passengers = Number(document.getElementById("passengers").value);

  if (from.toLowerCase() === to.toLowerCase()) {
    alert("Please choose different source and destination stations.");
    return;
  }

  searchSummary.textContent = `${from} → ${to} · ${date} · ${passengers} passenger(s)`;
  trainList.replaceChildren();

  sampleTrains.forEach((train) => {
    const card = document.createElement("article");
    card.className = "train-card";

    const details = document.createElement("div");
    const heading = document.createElement("h3");
    heading.textContent = `${train.name} · ${train.number}`;
    const route = document.createElement("p");
    route.className = "route";
    route.textContent = `${train.departure} `;
    const arrow = document.createElement("span");
    arrow.textContent = "→";
    route.appendChild(arrow);
    route.append(` ${train.arrival}`);
    const meta = document.createElement("p");
    meta.className = "train-meta";
    meta.textContent = `${from} to ${to} · Sample timings only`;
    details.append(heading, route, meta);

    const actions = document.createElement("div");
    const fare = document.createElement("div");
    fare.className = "fare";
    fare.textContent = `₹${train.fare * passengers}`;
    const button = document.createElement("button");
    button.className = "book-button";
    button.type = "button";
    button.textContent = "Book demo ticket";
    button.addEventListener("click", () => {
      alert(`Demo booking confirmed!\\nTrain: ${train.name} (${train.number})\\nRoute: ${from} to ${to}\\nDate: ${date}\\nPassengers: ${passengers}\\nEstimated sample fare: ₹${train.fare * passengers}\\n\\nThis is not a real railway reservation.`);
    });
    actions.append(fare, button);
    card.append(details, actions);
    trainList.appendChild(card);
  });

  results.hidden = false;
  results.scrollIntoView({ behavior: "smooth", block: "start" });
});
