import { uiTokens } from "./uiTokens";

export type BadgeTone = "neutral" | "pink" | "purple" | "green" | "red";

/** Resolve a tone to its UI token color. */
export function getToneColor(tone: BadgeTone): string {
  if (tone === "pink") return uiTokens.accentPink;
  if (tone === "purple") return uiTokens.accentPurple;
  if (tone === "green") return uiTokens.accentGreen;
  if (tone === "red") return uiTokens.accentRed;
  return uiTokens.neutralDot;
}
