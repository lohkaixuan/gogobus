// import { Route, HealthMetrics, RerouteOption } from '../types';

// export const mockRoutes: Route[] = [
//   {
//     id: '1',
//     name: 'Zen Route',
//     type: 'health',
//     duration: 25,
//     aqi: 35,
//     crowdLevel: 'Low',
//     distance: 4.2,
//     walkingSegments: [
//       {
//         distance: 0.8,
//         duration: 10,
//         startPoint: 'Transit Station',
//         endPoint: 'Destination',
//         isLastMile: true
//       }
//     ],
//     transportModes: ['Walk', 'Tram', 'Walk'],
//     co2Saved: 200,
//     caloriesBurned: 80,
//     exposureLevel: [20, 25, 30, 35, 30, 25, 20],
//     scenicWaypoints: [
//       {
//         type: 'tree',
//         name: 'City Park',
//         position: { lat: 40.7128, lng: -74.0060 },
//         description: 'High Oxygen Zone'
//       },
//       {
//         type: 'shade',
//         name: 'Tree Canopy',
//         position: { lat: 40.7138, lng: -74.0070 },
//         description: 'Shaded pathway'
//       },
//       {
//         type: 'water',
//         name: 'Riverside Path',
//         position: { lat: 40.7148, lng: -74.0080 },
//         description: 'Scenic waterfront'
//       }
//     ]
//   },
//   {
//     id: '2',
//     name: 'Fastest Route',
//     type: 'fast',
//     duration: 20,
//     aqi: 110,
//     crowdLevel: 'High',
//     distance: 3.8,
//     walkingSegments: [
//       {
//         distance: 0.3,
//         duration: 4,
//         startPoint: 'Transit Station',
//         endPoint: 'Destination',
//         isLastMile: true
//       }
//     ],
//     transportModes: ['Walk', 'Bus', 'Walk'],
//     exposureLevel: [80, 90, 110, 105, 95, 85, 80],
//     scenicWaypoints: []
//   },
//   {
//     id: '3',
//     name: 'Balanced Route',
//     type: 'standard',
//     duration: 23,
//     aqi: 65,
//     crowdLevel: 'Medium',
//     distance: 4.0,
//     walkingSegments: [
//       {
//         distance: 0.5,
//         duration: 7,
//         startPoint: 'Transit Station',
//         endPoint: 'Destination',
//         isLastMile: true
//       }
//     ],
//     transportModes: ['Walk', 'Metro', 'Walk'],
//     co2Saved: 120,
//     caloriesBurned: 50,
//     exposureLevel: [45, 55, 65, 70, 65, 55, 50],
//     scenicWaypoints: [
//       {
//         type: 'camera',
//         name: 'City Viewpoint',
//         position: { lat: 40.7133, lng: -74.0065 },
//         description: 'Great photo spot'
//       }
//     ]
//   }
// ];

// export const mockHealthMetrics: HealthMetrics = {
//   breathabilityScore: 8.5,
//   pollutantsAvoided: 0,
//   zenPoints: 1250,
//   dailySteps: 6500,
//   dailyStepsGoal: 7000
// };

// export const mockRerouteOptions: RerouteOption[] = [
//   {
//     id: 'r1',
//     type: 'health',
//     name: 'The Health Backup',
//     description: 'Grab a scooter (2 min walk). Scenic route through the waterfront.',
//     icon: 'scooter',
//     delay: 4,
//     crowdLevel: 'Low',
//     stressLevel: 2,
//     details: 'Bypass the crowd'
//   },
//   {
//     id: 'r2',
//     type: 'standard',
//     name: 'The Standard Backup',
//     description: 'Wait for next bus. Standing room only expected.',
//     icon: 'bus',
//     delay: 15,
//     crowdLevel: 'High',
//     stressLevel: 8,
//     details: 'High Crowd Warning'
//   }
// ];


// frontend/app/data/mockData.ts
import { Route, HealthMetrics, RerouteOption } from "../types";

export const mockRoutes: Route[] = [
  {
    id: "1",
    name: "Zen MRT Walk Route",
    type: "health",
    duration: 28,
    aqi: 35,
    crowdLevel: "Low",
    distance: 4.5,
    walkingSegments: [
      {
        distance: 1.0,
        duration: 12,
        startPoint: "Home (Cheras)",
        endPoint: "MRT Station",
        isLastMile: false,
      },
      {
        distance: 0.7,
        duration: 10,
        startPoint: "KLCC Station",
        endPoint: "Destination",
        isLastMile: true,
      },
    ],
    transportModes: ["Walk", "MRT", "Walk"],
    co2Saved: 220,
    caloriesBurned: 110,
    exposureLevel: [20, 25, 30, 32, 28, 24, 20],

    // 🧭 目的地：KLCC 一带
    destinationCoords: { lat: 3.1579, lng: 101.7123 },

    // 🗺️ 路线坐标：大概从 Cheras → Taman Connaught → Cochrane → KLCC
    pathCoordinates: [
      { lat: 3.0805, lng: 101.742 },  // Cheras 住宅区
      { lat: 3.089, lng: 101.739 },   // Taman Connaught
      { lat: 3.1185, lng: 101.727 },  // Cochrane / MyTown 一带
      { lat: 3.144, lng: 101.713 },   // Bukit Bintang
      { lat: 3.1579, lng: 101.7123 }, // KLCC
    ],

    scenicWaypoints: [
      {
        type: "tree",
        name: "Neighbourhood Park",
        position: { lat: 3.085, lng: 101.741 },
        description: "Shaded morning walk",
      },
      {
        type: "shade",
        name: "Covered Walkway",
        position: { lat: 3.1505, lng: 101.7135 },
        description: "Pedestrian walkway with shade",
      },
    ],
  },
  {
    id: "2",
    name: "Fast Direct Bus",
    type: "fast",
    duration: 20,
    aqi: 110,
    crowdLevel: "High",
    distance: 3.8,
    walkingSegments: [
      {
        distance: 0.3,
        duration: 4,
        startPoint: "Bus Stop",
        endPoint: "Destination",
        isLastMile: true,
      },
    ],
    transportModes: ["Walk", "Bus", "Walk"],
    exposureLevel: [80, 90, 110, 105, 95, 85, 80],

    destinationCoords: { lat: 3.1579, lng: 101.7123 },
    pathCoordinates: [
      { lat: 3.09, lng: 101.742 },
      { lat: 3.11, lng: 101.73 },
      { lat: 3.135, lng: 101.72 },
      { lat: 3.1579, lng: 101.7123 },
    ],

    scenicWaypoints: [],
  },
  {
    id: "3",
    name: "Balanced Park Route",
    type: "standard",
    duration: 24,
    aqi: 65,
    crowdLevel: "Medium",
    distance: 4.1,
    walkingSegments: [
      {
        distance: 0.5,
        duration: 7,
        startPoint: "Transit Station",
        endPoint: "KLCC Park",
        isLastMile: true,
      },
    ],
    transportModes: ["Walk", "Bus", "Walk"],
    co2Saved: 140,
    caloriesBurned: 70,
    exposureLevel: [45, 55, 65, 70, 65, 55, 50],

    destinationCoords: { lat: 3.1555, lng: 101.714 },
    pathCoordinates: [
      { lat: 3.085, lng: 101.741 },
      { lat: 3.102, lng: 101.732 },
      { lat: 3.132, lng: 101.722 },
      { lat: 3.1555, lng: 101.714 },  // KLCC Park 边
    ],

    scenicWaypoints: [
      {
        type: "camera",
        name: "KLCC Park View",
        position: { lat: 3.155, lng: 101.7145 },
        description: "Good viewpoint for skyline",
      },
    ],
  },
];

export const mockHealthMetrics: HealthMetrics = {
  breathabilityScore: 8.5,
  pollutantsAvoided: 0,
  zenPoints: 1250,
  dailySteps: 6500,
  dailyStepsGoal: 7000,
};

export const mockRerouteOptions: RerouteOption[] = [
  {
    id: "r1",
    type: "health",
    name: "Scooter + Park Walk",
    description: "Take shared scooter then walk through KLCC park.",
    icon: "scooter",
    delay: 4,
    crowdLevel: "Low",
    stressLevel: 2,
    details: "Bypass congestion via park",
  },
  {
    id: "r2",
    type: "standard",
    name: "Wait Next Bus",
    description: "Stay on main road, accept higher crowd.",
    icon: "bus",
    delay: 12,
    crowdLevel: "High",
    stressLevel: 7,
    details: "Higher PM2.5 exposure",
  },
];
