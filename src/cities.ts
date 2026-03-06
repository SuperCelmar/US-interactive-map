export interface City {
  name: string;
  coordinates: [number, number];
  stateId: string;
  population?: number;
}

export const cities: City[] = [
  // California
  { name: "Los Angeles", coordinates: [-118.2437, 34.0522], stateId: "06", population: 3898747 },
  { name: "San Francisco", coordinates: [-122.4194, 37.7749], stateId: "06", population: 873965 },
  { name: "San Diego", coordinates: [-117.1611, 32.7157], stateId: "06", population: 1386932 },
  { name: "Sacramento", coordinates: [-121.4944, 38.5816], stateId: "06", population: 524943 },
  // New York
  { name: "New York City", coordinates: [-74.0060, 40.7128], stateId: "36", population: 8336817 },
  { name: "Buffalo", coordinates: [-78.8784, 42.8864], stateId: "36", population: 278349 },
  { name: "Albany", coordinates: [-73.7562, 42.6526], stateId: "36", population: 99224 },
  // Texas
  { name: "Houston", coordinates: [-95.3698, 29.7604], stateId: "48", population: 2320268 },
  { name: "Austin", coordinates: [-97.7431, 30.2672], stateId: "48", population: 961855 },
  { name: "Dallas", coordinates: [-96.7970, 32.7767], stateId: "48", population: 1304379 },
  // Florida
  { name: "Miami", coordinates: [-80.1918, 25.7617], stateId: "12", population: 442241 },
  { name: "Orlando", coordinates: [-81.3792, 28.5383], stateId: "12", population: 307573 },
  { name: "Tampa", coordinates: [-82.4572, 27.9506], stateId: "12", population: 384959 },
  // Illinois
  { name: "Chicago", coordinates: [-87.6298, 41.8781], stateId: "17", population: 2746388 },
  { name: "Springfield", coordinates: [-89.6501, 39.7817], stateId: "17", population: 114394 },
  // Washington
  { name: "Seattle", coordinates: [-122.3321, 47.6062], stateId: "53", population: 737015 },
  { name: "Spokane", coordinates: [-117.4260, 47.6588], stateId: "53", population: 228989 },
  // Colorado
  { name: "Denver", coordinates: [-104.9903, 39.7392], stateId: "08", population: 715522 },
  { name: "Colorado Springs", coordinates: [-104.8214, 38.8339], stateId: "08", population: 478961 },
  // Georgia
  { name: "Atlanta", coordinates: [-84.3880, 33.7490], stateId: "13", population: 498715 },
  { name: "Savannah", coordinates: [-81.0912, 32.0809], stateId: "13", population: 147780 },
  // Pennsylvania
  { name: "Philadelphia", coordinates: [-75.1652, 39.9526], stateId: "42", population: 1603797 },
  { name: "Pittsburgh", coordinates: [-79.9959, 40.4406], stateId: "42", population: 302971 },
  // Massachusetts
  { name: "Boston", coordinates: [-71.0589, 42.3601], stateId: "25", population: 675647 },
  { name: "Worcester", coordinates: [-71.8023, 42.2626], stateId: "25", population: 206518 },
  // Ohio
  { name: "Columbus", coordinates: [-82.9988, 39.9612], stateId: "39", population: 905748 },
  { name: "Cleveland", coordinates: [-81.6944, 41.4993], stateId: "39", population: 372624 },
  // Michigan
  { name: "Detroit", coordinates: [-83.0458, 42.3314], stateId: "26", population: 639111 },
  { name: "Grand Rapids", coordinates: [-85.6681, 42.9634], stateId: "26", population: 198917 },
  // North Carolina
  { name: "Charlotte", coordinates: [-80.8431, 35.2271], stateId: "37", population: 874579 },
  { name: "Raleigh", coordinates: [-78.6382, 35.7796], stateId: "37", population: 467665 },
  // Virginia
  { name: "Virginia Beach", coordinates: [-75.9780, 36.8529], stateId: "51", population: 459470 },
  { name: "Richmond", coordinates: [-77.4360, 37.5407], stateId: "51", population: 226610 },
  // Arizona
  { name: "Phoenix", coordinates: [-112.0740, 33.4484], stateId: "04", population: 1608139 },
  { name: "Tucson", coordinates: [-110.9265, 32.2226], stateId: "04", population: 542629 },
  // Nevada
  { name: "Las Vegas", coordinates: [-115.1398, 36.1699], stateId: "32", population: 641903 },
  { name: "Reno", coordinates: [-119.8138, 39.5296], stateId: "32", population: 264165 },
  // Oregon
  { name: "Portland", coordinates: [-122.6765, 45.5231], stateId: "41", population: 652503 },
  { name: "Eugene", coordinates: [-123.0868, 44.0521], stateId: "41", population: 176654 },
  // Utah
  { name: "Salt Lake City", coordinates: [-111.8910, 40.7608], stateId: "49", population: 199723 },
  { name: "Provo", coordinates: [-111.6585, 40.2338], stateId: "49", population: 115162 },
];
