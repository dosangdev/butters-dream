import { create } from "zustand";

// for global state management

type GlobalState = {
  account: `0x${string}` | null;
  setAccount: (address: `0x${string}` | null) => void;
  userLoading: boolean;
  token: `0x${string}`[];
  collapsed: boolean;
  tvl: Map<string, number>;
  showRoyaltyPopup: boolean;
};

// Zustand 스토어 생성
export const useGlobalStore = create<GlobalState>((set) => ({
  account: null,
  setAccount: (address) => set({ account: address }),
  userLoading: true,
  token: [],
  collapsed: true,
  tvl: new Map(),
  showRoyaltyPopup: false,
}));
