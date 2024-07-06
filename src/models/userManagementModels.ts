export interface UserModel {
  id: string;
  firstName: string;
  lastName: string;
  nationality: string;
  phoneNumber: string;
  lastMonthBill: string;
  address: string;
  servicesSubscribed: number;
  age: number;
}

export interface UserFormProps {
  user: UserModel | null;
  onSave: (user: UserModel) => void;
  onCancel: () => void;
}

export interface UserDetailsProps {
  user: UserModel;
  onClose: () => void;
}
