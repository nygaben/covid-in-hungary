async function covid() {
  const response = await fetch(
    "https://covid.ourworldindata.org/data/owid-covid-data.json"
  );
  const infos = await response.json();
  const hun = infos.HUN.data;
  const lastUpdate = hun[hun.length - 1].date;
  const cases = [];
  const death = [];
  const daysOfCovid = hun.length;
  const vaccinated1 = hun[hun.length - 1].people_vaccinated;
  const vaccinated2 = hun[hun.length - 1].people_fully_vaccinated;
  const updatedFullyVaccinatedPercent = Math.floor(
    (hun[hun.length - 1].people_fully_vaccinated / 9769526) * 100
  );
  const notupdatedFullyVaccinatedPercent = Math.floor(
    (hun[hun.length - 2].people_fully_vaccinated / 9769526) * 100
  );

  const newDeaths = hun[hun.length - 1].new_deaths;

  const raw = hun[hun.length - 2].new_vaccinations;

  console.log(`daily vacc raw: ${raw}`);

  // if the number of the new vaccinations is not updated, use the data from the previous day

  if (
    typeof vaccinated1 === "undefined" ||
    typeof vaccinated2 === "undefined"
  ) {
    document.getElementById(
      "vaccinated"
    ).textContent = `People vaccinated (previous day): ${
      hun[hun.length - 2].people_vaccinated
    }`;
    document.getElementById(
      "total-vaccinated"
    ).textContent = `Fully vaccinated (previous day): ${
      hun[hun.length - 2].people_fully_vaccinated
    }`;
    document.getElementById("vaccination-difference").textContent = `+${raw}`;
    document.getElementById("vaccination-difference").style.color = "green";
  } else {
    document.getElementById(
      "vaccinated"
    ).textContent = `People vaccinated: ${vaccinated1}`;
    document.getElementById("vaccination-difference").textContent = `+${raw}`;
    document.getElementById(
      "total-vaccinated"
    ).textContent = `Fully vaccinated: ${vaccinated2}`;
    document.getElementById("vaccination-difference").style.color = "green";
  }

  // Filling up the cases array

  for (let i = 0; i < daysOfCovid; i++) {
    //console.log(hun[i].new_cases)
    cases.push(hun[i].new_cases);
  }

  // Filling up the deaths array

  for (let j = 0; j < daysOfCovid; j++) {
    // console.log(hun[j].new_deaths)
    death.push(hun[j].new_deaths);
  }

  //console.log(`number of deaths: ${death}`)

  // choose the number of the new deaths from the last 30 days:

  const lastDeath = death.slice(Math.max(death.length - 30, 1));

  // console.log(`last30Cases 30 death number: ${lastDeath}`)

  // choose the number of the new cases from the last 30 days:

  const last30Cases = cases.slice(Math.max(cases.length - 30, 1));

  const casesDifference =
    last30Cases[last30Cases.length - 1] - last30Cases[last30Cases.length - 2];

  if (casesDifference > 0) {
    document.getElementById(
      "cases-difference"
    ).textContent = `+${casesDifference}`;
    document.getElementById("cases-difference").style.color = "red";
  } else {
    document.getElementById(
      "cases-difference"
    ).textContent = `${casesDifference}`;
    document.getElementById("cases-difference").style.color = "green";
  }

  //write the difference of the deaths from the new and the previous day

  const deathDifference =
    lastDeath[lastDeath.length - 1] - lastDeath[lastDeath.length - 2];
  console.log(`difference of deaths is: ${deathDifference}`);

  // make it plus or minus

  if (deathDifference > 0) {
    document.getElementById(
      "death-difference"
    ).textContent = `+${deathDifference}`;
    document.getElementById("death-difference").style.color = "red";
  } else {
    document.getElementById(
      "death-difference"
    ).textContent = `${deathDifference}`;
  }

  //adding up the number of cases from the previous 30 days

  let total = 0;
  last30Cases.forEach(function (oneCase) {
    total += oneCase;
  });

  // average of the sum of the cases from the previous 30 days

  const newCases30Average = Math.floor(total / last30Cases.length);
  // console.log(newCases30Average)

  //adding up the number of deaths from the previous 30 days

  let total2 = 0;
  lastDeath.forEach(function (oneDeath) {
    total2 += oneDeath;
  });

  // average of the sum of the deaths from the previous 30 days

  const newDeath30Average = Math.floor(total2 / lastDeath.length);
  // console.log(`the 30 days average of new deaths is: ${newDeath30Average}`)

  //const newCases = infos.HUN.data.map(entry => entry.new_cases);

  console.log(cases);
  console.log(last30Cases);
  console.log(lastUpdate);
  console.log(casesDifference);
  console.log(vaccinated1);
  console.log(vaccinated2);

  console.log(`fully percent : ${updatedFullyVaccinatedPercent}`);
  console.log((hun[hun.length - 1].people_fully_vaccinated / 9769526) * 100);

  // compute and display the vaccinated % of the population based on number of the people living in Hungary

  if (typeof vaccinated2 === "undefined") {
    document.getElementById(
      "percent"
    ).textContent = `${notupdatedFullyVaccinatedPercent}%  of the population is fully vaccinated`;
  } else {
    document.getElementById(
      "percent"
    ).textContent = `${updatedFullyVaccinatedPercent} %  of the population is fully vaccinated`;
  }

  //adding the textcontent to the document

  document.getElementById(
    "update"
  ).textContent = `The last update was on: ${lastUpdate}`;
  document.getElementById("lastcase").textContent = `New cases: ${
    cases[cases.length - 1]
  }`;
  document.getElementById(
    "cases30Average"
  ).textContent = `Average of the last 30 days: ${newCases30Average}`;
  document.getElementById(
    "deathaverage"
  ).textContent = `Average of the last 30 days: ${newDeath30Average}`;
  document.getElementById(
    "newdeath"
  ).textContent = `Number of new deaths: ${newDeaths}`;

  // const {new_cases} = hun[daysOfCovid-1]
  // console.log(new_cases)

  //console.log(daysOfCovid)
}

// calling the function

covid();
