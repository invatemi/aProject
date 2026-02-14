import { Album } from "../../types";

export interface AlbumsState {
  items: Album[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}