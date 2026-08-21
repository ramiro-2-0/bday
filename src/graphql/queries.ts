import { gql } from '@apollo/client/core';

export const GET_WISHES = gql`
  query GetWishes {
    wishes {
      id
      message
      emoji
      color
    }
  }
`;

export const GET_MEMORIES = gql`
  query GetMemories {
    memories {
      id
      title
      description
      date
      imageUrl
      tags
    }
  }
`;

export const GET_LOVE_LETTER = gql`
  query GetLoveLetter {
    loveLetter {
      id
      greeting
      body
      closing
      signature
    }
  }
`;
