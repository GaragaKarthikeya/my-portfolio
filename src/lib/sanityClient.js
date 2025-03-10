import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // e.g., "79clk5rx"
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-03-25", // Use the current ISO date for the API version
  useCdn: process.env.NODE_ENV === "production",
});
