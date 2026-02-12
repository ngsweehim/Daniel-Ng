
import { Ministry, MatchResult } from '../types';

/**
 * Compares user's selected gifts against a list of ministries and returns ranked matches.
 * 
 * Logic:
 * - Primary Gift Match: 2 points
 * - Secondary Gift Match: 1 point
 * - Match % = (Total Points Achieved) / (Total Possible Points for Ministry)
 */
export const suggestMinistryFits = (userGifts: string[], ministries: Ministry[]): MatchResult[] => {
  const results: MatchResult[] = ministries.map(ministry => {
    let score = 0;
    
    // Weighting: Primary gifts are worth more
    ministry.primaryGifts.forEach(giftId => {
      if (userGifts.includes(giftId)) {
        score += 2;
      }
    });

    // Secondary gifts add to the match but with lower weight
    ministry.secondaryGifts.forEach(giftId => {
      if (userGifts.includes(giftId)) {
        score += 1;
      }
    });

    // Calculate maximum possible score for this ministry
    const maxPossibleScore = (ministry.primaryGifts.length * 2) + ministry.secondaryGifts.length;
    
    // Calculate percentage
    const percentage = maxPossibleScore > 0 ? Math.round((score / maxPossibleScore) * 100) : 0;

    return {
      ministry,
      percentage
    };
  });

  // Sort by percentage descending
  return results.sort((a, b) => b.percentage - a.percentage);
};
