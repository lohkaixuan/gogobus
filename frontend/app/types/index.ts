export interface Route {
  id: string;
  name: string;
  type: 'health' | 'fast' | 'standard';
  duration: number;
  aqi: number;
  crowdLevel: 'Low' | 'Medium' | 'High';
  distance: number;
  walkingSegments: WalkingSegment[];
  transportModes: string[];
  co2Saved?: number;
  caloriesBurned?: number;
  exposureLevel: number[];
  scenicWaypoints: Waypoint[];
  destinationCoords?: { lat: number; lng: number };
  pathCoordinates?: { lat: number; lng: number }[];
}

export interface WalkingSegment {
  distance: number;
  duration: number;
  startPoint: string;
  endPoint: string;
  isLastMile: boolean;
}

export interface Waypoint {
  type: 'camera' | 'tree' | 'water' | 'shade';
  name: string;
  position: { lat: number; lng: number };
  description: string;
}

export interface HealthMetrics {
  breathabilityScore: number;
  pollutantsAvoided: number;
  zenPoints: number;
  dailySteps: number;
  dailyStepsGoal: number;
}

export interface RerouteOption {
  id: string;
  type: 'health' | 'standard';
  name: string;
  description: string;
  icon: string;
  delay: number;
  crowdLevel: 'Low' | 'Medium' | 'High';
  stressLevel: number;
  details: string;
}
