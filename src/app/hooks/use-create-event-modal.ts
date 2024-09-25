import { create } from "zustand";

type EventModalStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useEventModal = create<EventModalStore>((set) => ({
  id: undefined,
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
