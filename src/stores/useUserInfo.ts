import { create } from "zustand";

type UserInfoState = {
  name: string;
  phone: string;
  avatar: string;
  editing: boolean;

  nameError: string;
  phoneError: string;

  setName: (name: string) => void;
  setPhone: (phone: string) => void;
  setEditing: (editing: boolean) => void;

  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSave: (t: (key: string) => string) => boolean;
};

export const useUserInfo = create<UserInfoState>((set, get) => ({
  name: "John Doe",
  phone: "09123456789",
  avatar: "/images/user.png",
  editing: false,

  nameError: "",
  phoneError: "",

  setName: (name) =>
    set({
      name,
      nameError: "",
    }),

  setPhone: (phone) => {
    // Allow only digits, spaces, and +
    const allowed = /^[\d+\s]*$/;
    if (!allowed.test(phone)) return; // ignore invalid characters

    set({
      phone,
      phoneError: "",
    });
  },

  setEditing: (editing) => set({ editing }),

  handleImageChange: (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    set({
      avatar: imageUrl,
    });
  },

  handleSave: (t) => {
    const { name, phone } = get();
    let valid = true;

    // --- Name validation ---
    if (!name.trim()) {
      set({ nameError: t("nameRequired") });
      valid = false;
    } else {
      set({ nameError: "" });
    }

    // --- Phone validation ---
    const cleaned = phone.replace(/\s/g, ""); // remove mask spaces
    const digitsOnly = cleaned.replace(/[^\d+]/g, ""); // keep digits and optional +

    if (!cleaned) {
      set({ phoneError: t("phoneRequired") });
      valid = false;
    } else if (!/^[+]?\d{8,15}$/.test(digitsOnly)) {
      // must be all digits, optionally starting with +
      set({ phoneError: t("invalidPhone") });
      valid = false;
    } else {
      set({ phoneError: "" });
    }

    if (!valid) return false;

    set({
      editing: false,
    });

    return true;
  },
}));
