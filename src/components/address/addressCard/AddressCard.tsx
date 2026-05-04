import React from "react";
import type { AddressData } from "../../types/types";
import EditableAddress from "../editableAddress/EditableAddress";

interface AddressCardProps {
  address: AddressData;
  editingAddress: string | null;
  onSave: (address: AddressData) => void;
  onDelete: (id: string) => void;
  onSetDefault: (id: string) => void;
  onEdit: () => void;
  onCancel: () => void; // 👈 پدر کنترلش می‌کنه
}

const AddressCard: React.FC<AddressCardProps> = ({
  address,
  editingAddress,
  onSave,
  onDelete,
  onSetDefault,
  onEdit,
  onCancel,
}) => {
  const mode = editingAddress === address.id ? "edit" : "view";

  return (
    <EditableAddress
      address={address}
      mode={mode}
      isDefault={address.isDefault}
      showEdit={mode === "view"}
      onEdit={onEdit}
      onSave={onSave}
      onDelete={() => onDelete(address.id)}
      onSetDefault={() => onSetDefault(address.id)}
      onCancel={onCancel} // 👈 اینجا درست است
    />
  );
};

export default AddressCard;
