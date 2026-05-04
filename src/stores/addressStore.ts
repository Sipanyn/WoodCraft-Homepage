import { create } from "zustand";

export interface AddressData {
  id: string;
  street: string;
  city: string;
  highway: string;
  street1: string;
  street2: string;
  postalCode: string;
  receiverName: string;
  receiverPhone: string;
  isDefault: boolean;
}

interface AddressStore {
  addresses: AddressData[];
  addAddress: (address: Omit<AddressData, "id">) => void;
  updateAddress: (address: AddressData) => void;
  deleteAddress: (id: string) => void;
  setDefault: (id: string) => void;
}

export const useAddressStore = create<AddressStore>((set, get) => ({
  addresses: [
    {
      id: "1",
      country: "Iran",
      province: "Tehran",
      street: "Hashemi St.",
      city: "Tehran",
      highway: "Ayatollah Saeidi Highway",
      street1: "Ostad Moein St.",
      street2: "",
      postalCode: "0000000",
      receiverName: "Allen Rooney",
      receiverPhone: "090000000",
      isDefault: true,
    },
  ],

  addAddress: (address) =>
    set((state) => {
      const newAddress = {
        ...address,
        id: crypto.randomUUID(),
        isDefault: state.addresses.length === 0,
      };

      return {
        addresses: [...state.addresses, newAddress],
      };
    }),

  updateAddress: (address) =>
    set((state) => ({
      addresses: state.addresses.map((addr) =>
        addr.id === address.id ? address : addr,
      ),
    })),

  deleteAddress: (id) =>
    set((state) => {
      const filtered = state.addresses.filter((addr) => addr.id !== id);

      if (filtered.length > 0 && !filtered.some((a) => a.isDefault)) {
        filtered[0].isDefault = true;
      }

      return { addresses: filtered };
    }),

  setDefault: (id) =>
    set((state) => ({
      addresses: state.addresses.map((a) => ({
        ...a,
        isDefault: a.id === id,
      })),
    })),
}));
