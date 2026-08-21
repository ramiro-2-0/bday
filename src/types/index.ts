export interface BirthdayWish {
  id: string;
  message: string;
  emoji: string;
  color: string;
}

export interface Memory {
  id: string;
  title: string;
  description: string;
  date: string;
  imageUrl: string;
  tags: string[];
}

export interface LoveLetter {
  id: string;
  greeting: string;
  body: string;
  closing: string;
  signature: string;
}
