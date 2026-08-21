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

const memories: Memory[] = [
  {
    id: '1',
    title: 'The Day We Met',
    description: 'That magical moment when the universe decided we should cross paths. I knew you were special from the very first smile.',
    date: 'The Beginning',
    imageUrl: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&q=80',
    tags: ['first meeting', 'special', 'destiny'],
  },
  {
    id: '2',
    title: 'Our Adventures Together',
    description: 'Every road trip, every late-night walk, every spontaneous plan — with you, every moment becomes a beautiful memory.',
    date: 'Always',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
    tags: ['adventures', 'memories', 'together'],
  },
  {
    id: '3',
    title: 'Laughing Till We Cry',
    description: 'Nobody makes me laugh like you do. Your sense of humor is one of the million things I love about you.',
    date: 'Every Single Day',
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80',
    tags: ['laughter', 'joy', 'happiness'],
  },
  {
    id: '4',
    title: 'Quiet Moments',
    description: 'The best moments aren\'t always loud. Sometimes it\'s just us, in comfortable silence, and it\'s perfect.',
    date: 'Our Favorite Times',
    imageUrl: 'https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=600&q=80',
    tags: ['peace', 'love', 'together'],
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
