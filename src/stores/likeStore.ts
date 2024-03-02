import { create } from "zustand";

import { persist } from "zustand/middleware";

type LikeStore = {
  likedCharacters: string[];
  toggleLikeCharacter: (characterId: string) => void;
  removeLikedCharacter: (characterId: string) => void;
};

const useLikeStore = create<LikeStore>(
  persist(
    (set) => ({
      likedCharacters: [], // Store the liked characters
      toggleLikeCharacter: (characterId: string) => {
        set((state: LikeStore) => {
          const updatedLikedCharacters = state.likedCharacters.includes(characterId)
            ? state.likedCharacters.filter((id) => id !== characterId)
            : [...state.likedCharacters, characterId];

          return { likedCharacters: updatedLikedCharacters };
        });
      },
      removeLikedCharacter: (characterId: string) => {
        set((state: LikeStore) => ({
          likedCharacters: state.likedCharacters.filter((id) => id !== characterId),
        }));
      },
    }),
    {
      name: "like-character", // name for the storage
    }
  ) as any
);

export default useLikeStore;