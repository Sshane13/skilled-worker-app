// worker.model.ts
export interface Work {
  title: string;
  description?: string;
}

export interface Worker {
  name: string;
  location: string;
  availability?: string;
  phone?: string;
  email?: string;
  profileImage?: string;
  mapsLink?: string;  // Add the Google Maps Link property
  works: Work[];  // Assuming works is an array of Work type
}
