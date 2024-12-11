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
  workImage?:string;
  mapsLink?: string;  // Add the Google Maps Link property
  workDone?: string;
  skills?:string;// New field for skills
  experience?: number;
  works: Work[];  // Assuming works is an array of Work type
}
