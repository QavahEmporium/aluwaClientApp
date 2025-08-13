export type User = {
  name: string;
  lastname: string;
  email: string;
  password: string;
  age: string;
};

export interface UserContextProps {
  propertyForm: User | null;
  updatePropertyForm: (property: Partial<User>) => void;
}
