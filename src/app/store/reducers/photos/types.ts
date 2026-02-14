import { Photo } from "../../types";

export interface PhotosState {
  items: Photo[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}