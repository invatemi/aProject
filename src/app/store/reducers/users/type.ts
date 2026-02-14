import { User } from "../../types"

export interface UsersState {
  items: User[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}