// server/epaData.js
// Source: EPA ENERGY STAR Portfolio Manager — 2023 median EUI values


const EPA_BENCHMARKS = {
  'Restaurant / Food service':    { medianEUI: 395, unit: 'kBtu/sqft/yr' },
  'Retail store':                 { medianEUI: 69,  unit: 'kBtu/sqft/yr' },
  'Office / Professional':        { medianEUI: 72,  unit: 'kBtu/sqft/yr' },
  'Grocery / Convenience store':  { medianEUI: 235, unit: 'kBtu/sqft/yr' },
  'Hotel / Lodging':              { medianEUI: 112, unit: 'kBtu/sqft/yr' },
  'Healthcare / Clinic':          { medianEUI: 188, unit: 'kBtu/sqft/yr' },
  'Warehouse / Storage':          { medianEUI: 38,  unit: 'kBtu/sqft/yr' },
  'Salon / Spa':                  { medianEUI: 85,  unit: 'kBtu/sqft/yr' },
  'Gym / Fitness':                { medianEUI: 143, unit: 'kBtu/sqft/yr' },
  'Other':                        { medianEUI: 90,  unit: 'kBtu/sqft/yr' },
};


module.exports = { EPA_BENCHMARKS };
