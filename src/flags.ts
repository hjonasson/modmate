import { FlagDetection, Flags } from "./flag-detection/schema";
import { commercialInterestTemplate } from "./templates/commericalInterest";
import { inconsiderateOrDisrespectfulTemplate } from "./templates/disrespectful";
import { meetupTemplate } from "./templates/meetup";
import { piiTemplate } from "./templates/piiTemplate";

export const flags: Flags[] = [
  "CommercialInterest",
  "Disrespectful",
  "MeetupSuggestion",
  "PersonallyIdentifyingInformation",
  "Spam",
] as const;

export const flagTemplateMap = new Map<Flags, string>([
  ["CommercialInterest", commercialInterestTemplate],
  ["Disrespectful", inconsiderateOrDisrespectfulTemplate],
  ["MeetupSuggestion", meetupTemplate],
  ["PersonallyIdentifyingInformation", piiTemplate],
  ["Spam", ""],
]);
