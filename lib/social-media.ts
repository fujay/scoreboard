"use server";

import { fetchSocialMedia } from "./data";
import type { SocialMediaData } from "./definitions";

export async function getSocialMediaData(): Promise<SocialMediaData[]> {
  const socialMediaData = await fetchSocialMedia();

  if (!socialMediaData) {
    throw new Error("Failed to fetch social media data");
  }
  return socialMediaData;
}
