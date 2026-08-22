import { graphql, HttpResponse } from 'msw';
import type { BirthdayWish, Memory, LoveLetter } from '../types';

const wishes: BirthdayWish[] = [
  { id: '1', message: "Happy Birthday, Namrata! You light up every room you walk into 🌟", emoji: '🌸', color: '#FFB7C5' },
  { id: '2', message: "To the girl who makes my heart skip a beat every single day — I love you endlessly!", emoji: '💖', color: '#FF6B9D' },
  { id: '3', message: "Another year of you being the most amazing person in my life. Here's to many more! 🥂", emoji: '✨', color: '#C77DFF' },
  { id: '4', message: "You deserve all the happiness in the world, because you give so much of yours to me 🌺", emoji: '🌺', color: '#FFB347' },
  { id: '5', message: "On your special day, I want you to know: you are my favorite adventure 🦋", emoji: '🦋', color: '#A8E6CF' },
  { id: '6', message: "Happy Birthday to the one who stole my heart and never gave it back — and I'm so glad 💝", emoji: '💝', color: '#FF8DA1' },
];

import facemaskImg from '../assets/moments/facemask.png';
import backhugImg from '../assets/moments/backhug.png';
import sunsetImg from '../assets/moments/sunset_picnic.png';
import legHugImg from '../assets/moments/leg_hug.png';

const memories: Memory[] = [
  {
    id: '1',
    title: 'Our Goofy Skincare Nights 💆‍♀️✨',
    description: 'Black charcoal masks, messy hair buns, bathroom mirror selfies, and laughing at how silly we look together.',
    date: 'Cozy Evenings',
    imageUrl: facemaskImg,
    tags: ['skincare nights', 'goofy', 'mirror selfie', 'cuties'],
  },
  {
    id: '2',
    title: 'Warmest Hugs in Oversized Tees 🤍',
    description: 'Sneaking up behind you for a cozy backhug while you take a mirror selfie. You wearing my oversized tee is my favorite sight.',
    date: 'Always & Forever',
    imageUrl: backhugImg,
    tags: ['backhug', 'comfort', 'cozy love', 'my safe place'],
  },
  {
    id: '3',
    title: 'Sunset Picnics & Warm Coffee 🌅☕',
    description: 'Sitting side by side on our checkered blanket, sharing hot coffee, and watching the golden sunset with you.',
    date: 'Golden Hour',
    imageUrl: sunsetImg,
    tags: ['sunset date', 'warm tea', 'peaceful', 'magic moments'],
  },
  {
    id: '4',
    title: 'Never Letting You Go! 🧸💖',
    description: 'Wrapping my arms around your leg so you can never leave! Being silly, goofy, and endlessly in love with you.',
    date: 'Every Single Day',
    imageUrl: legHugImg,
    tags: ['clingy love', 'pure joy', 'best laughs', 'forever'],
  },
];

const loveLetter: LoveLetter = {
  id: '1',
  greeting: 'My Dearest Namrata,',
  body: `Today is your day — a day as beautiful, bright, and extraordinary as you are.

I've been trying to find the perfect words to describe what you mean to me, but the truth is, no language has yet invented words grand enough.

You are the reason I smile at random moments during the day. You are the thought that makes everything better. You are the home I never knew I was looking for.

On this birthday, I don't just want to celebrate the day you were born — I want to celebrate every quirk, every laugh, every dream, every stubborn argument, every soft moment, every piece of you that makes you *you*.

You make the world a better, warmer, and more beautiful place just by being in it. And I am the luckiest person alive because I get to be by your side.

Here's to you, Namrata. Here's to all your dreams coming true, all your wishes being granted, and all the happiness you so deeply deserve finding its way to you.`,
  closing: 'With all my heart, forever and always,',
  signature: 'Yours 💕',
};

export const handlers = [
  graphql.query('GetWishes', () => {
    return HttpResponse.json({ data: { wishes } });
  }),

  graphql.query('GetMemories', () => {
    return HttpResponse.json({ data: { memories } });
  }),

  graphql.query('GetLoveLetter', () => {
    return HttpResponse.json({ data: { loveLetter } });
  }),
];
