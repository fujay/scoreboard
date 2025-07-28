"use server";

import { fetchMessage } from "./data";
import { MessageData } from "./definitions";

export async function getMessageData(): Promise<MessageData[]> {
  const messageData = await fetchMessage();

  if (!messageData) {
    throw new Error("Failed to fetch message data");
  }
  return messageData;
}
