import { create } from "zustand";

// for global state management

type GlobalState = {
  account: `0x${string}` | null;
  userLoading: boolean;
  myPrice?: number;
  token: `0x${string}`[];
  collapsed: boolean;
  tvl: Map<string, number>;
  showRoyaltyPopup: boolean;
};

export const useGlobalStore = create<GlobalState>((set) => ({
  account: null,
  userLoading: true,
  token: [],
  collapsed: true,
  tvl: new Map(),
  showRoyaltyPopup: false,
}));
