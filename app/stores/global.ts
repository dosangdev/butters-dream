import { create } from "zustand";

// for global state management

type GlobalState = {
  token: `0x${string}`[];
  collapsed: boolean;
  tvl: Map<string, number>;
  showRoyaltyPopup: boolean;
};

// Zustand 스토어 생성
export const useGlobalStore = create<GlobalState>((set) => ({
  token: [],
  collapsed: true,
  tvl: new Map(),
  showRoyaltyPopup: false,
}));
