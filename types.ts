
export interface SpiritualGift {
  id: string;
  name: string;
  nameZh: string;
  description: string;
}

export interface Ministry {
  id: string;
  name: string;
  nameZh: string;
  icon: string;
  primaryGifts: string[]; // List of Gift IDs
  secondaryGifts: string[]; // List of Gift IDs
  description: string;
}

export interface UserProfile {
  name: string;
  contact: string;
  strengths: string;
  selectedGifts: string[]; // List of Gift IDs
}

export interface MatchResult {
  ministry: Ministry;
  percentage: number;
}
