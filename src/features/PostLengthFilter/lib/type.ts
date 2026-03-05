export interface PostLengthFilterProps {
    onSort : (  order : "asc" | "desc" | null) => void;
    currentOrder : "asc" | "desc" | null;
}