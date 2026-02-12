
import { SpiritualGift, Ministry } from './types';

export const SPIRITUAL_GIFTS: SpiritualGift[] = [
  { id: 'admin', name: 'Administration', nameZh: '行政', description: 'Organizing and managing resources/people.' },
  { id: 'discern', name: 'Discernment', nameZh: '辨别', description: 'Distinguishing between truth and error.' },
  { id: 'evangel', name: 'Evangelism', nameZh: '传福音', description: 'Sharing the gospel with non-believers.' },
  { id: 'exhort', name: 'Exhortation', nameZh: '劝勉', description: 'Encouraging and motivating others.' },
  { id: 'faith', name: 'Faith', nameZh: '信心', description: 'Trusting God in impossible situations.' },
  { id: 'giving', name: 'Giving', nameZh: '奉献', description: 'Joyfully contributing resources to God\'s work.' },
  { id: 'hospitality', name: 'Hospitality', nameZh: '招待', description: 'Making people feel welcome and cared for.' },
  { id: 'lead', name: 'Leadership', nameZh: '领导', description: 'Setting vision and directing others.' },
  { id: 'mercy', name: 'Mercy', nameZh: '怜悯', description: 'Showing compassion to those in need.' },
  { id: 'service', name: 'Service', nameZh: '服侍', description: 'Helping with practical tasks and needs.' },
  { id: 'teach', name: 'Teaching', nameZh: '教学', description: 'Explaining biblical truths clearly.' },
  { id: 'wisdom', name: 'Wisdom', nameZh: '智慧', description: 'Applying biblical knowledge to life.' },
];

export const MINISTRIES: Ministry[] = [
  {
    id: 'youth-mentor',
    name: 'Youth Mentor',
    nameZh: '青少年导师',
    icon: 'supervisor_account',
    primaryGifts: ['teach', 'exhort'],
    secondaryGifts: ['wisdom', 'mercy'],
    description: 'Guiding the next generation through word and deed.'
  },
  {
    id: 'pa-system',
    name: 'PA System',
    nameZh: '音响系统',
    icon: 'speaker_group',
    primaryGifts: ['service', 'admin'],
    secondaryGifts: ['faith'],
    description: 'Supporting services through audio-visual technical excellence.'
  },
  {
    id: 'hospitality',
    name: 'Hospitality',
    nameZh: '招待',
    icon: 'concierge',
    primaryGifts: ['hospitality', 'service'],
    secondaryGifts: ['mercy', 'exhort'],
    description: 'Welcoming guests and creating a warm church environment.'
  },
  {
    id: 'outreach',
    name: 'Outreach Team',
    nameZh: '外展团队',
    icon: 'volunteer_activism',
    primaryGifts: ['evangel', 'mercy'],
    secondaryGifts: ['faith', 'service'],
    description: 'Reaching the community with the love of Christ.'
  },
  {
    id: 'small-group',
    name: 'Small Group Leader',
    nameZh: '小组长',
    icon: 'groups',
    primaryGifts: ['lead', 'teach'],
    secondaryGifts: ['wisdom', 'exhort'],
    description: 'Nurturing community and spiritual growth in a small setting.'
  },
  {
    id: 'worship',
    name: 'Worship Team',
    nameZh: '敬拜赞美团',
    icon: 'music_note',
    primaryGifts: ['exhort', 'service'],
    secondaryGifts: ['lead', 'faith'],
    description: 'Leading the congregation in musical worship.'
  }
];
