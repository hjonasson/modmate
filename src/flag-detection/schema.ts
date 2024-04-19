export type FlagDetection = {
  flag: Flags[];
};

export type Flags =
  | "CommercialInterest"
  | "Disrespectful"
  | "MeetupSuggestion"
  | "PersonallyIdentifyingInformation"
  | "Spam";
