const covid19ImpactEstimator = (data) => {
  const impact = {};
  const severeImpact = {};

  if (data.periodType === 'weeks') {
    data.timeToElapse *= 7;
  } else if (data.periodType === 'months') {
    data.timeToElapse *= 30;
  }
  const days = data.timeToElapse;
  const factor = Math.trunc(days / 3);
  const availableBed = (0.35 * impact.totalHospitalBeds);

  impact.currentlyInfected = data.reportedCases * 10;
  impact.infectionsByRequestedTime = impact.currentlyInfected * (2 ** factor);
  impact.severeCasesByRequestedTime = (15 / 100) * impact.infectionsByRequestedTime;
  impact.hospitalBedsByRequestedTime = Math.ceil(availableBed - impact.severeCasesByRequestedTime);

  severeImpact.currentlyInfected = data.reportedCases * 50;
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * (2 ** factor);
  severeImpact.severeCasesByRequestedTime = (15 / 100) * severeImpact.infectionsByRequestedTime;
  const severeCases = severeImpact.severeCasesByRequestedTime;
  severeImpact.hospitalBedsByRequestedTime = Math.ceil(availableBed - severeCases);

  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
