import { cookies } from "next/headers";
import RatingDialogClient from "./rating-dialog-client";

export default function RatingDialog() {
  const cookieStore = cookies();
  const ratingDialogCookie = cookieStore.get("show_rating_dialog");

  if (!ratingDialogCookie) {
    return null;
  }

  let sessionId = null;
  try {
    const parsedCookie = JSON.parse(ratingDialogCookie.value);
    sessionId = parsedCookie.sessionId;
  } catch (error) {
    console.error("Error parsing rating dialog cookie:", error);
    return null;
  }

  return <RatingDialogClient sessionId={sessionId} />;
}
