import { FC } from "react";
import { Button } from "@/shared";
import { PostLengthFilterProps } from "../lib";
import style from "./PostLengthFilter.module.css";

const PostLengthFilter: FC<PostLengthFilterProps> = ({ onSort, currentOrder }) => {
  return (
    <div className={style.container}>
      <Button
        variant={currentOrder === "asc" ? "primary" : "secondary"}
        size="md"
        onClick={() => onSort(currentOrder === "asc" ? null : "asc")}
        className={style.button}
      >
        {currentOrder === "asc" ? "✓ Короткие" : "Короткие"}
      </Button>
      <Button
        variant={currentOrder === "desc" ? "primary" : "secondary"}
        size="md"
        onClick={() => onSort(currentOrder === "desc" ? null : "desc")}
        className={style.button}
      >
        {currentOrder === "desc" ? "✓ Длинные" : "Длинные"}
      </Button>
    </div>
  );
};

export default PostLengthFilter;