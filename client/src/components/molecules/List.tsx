import ListItem from "@/components/atoms/ListItem";
import { ReactNode } from "react";

interface ListProps {
  items: Array<{ id: string | number; content: ReactNode }>;
}

const List = ({ items }: ListProps) => (
  <div className="bg-white shadow-md rounded my-6 max-h-96 overflow-y-auto">
    {items.map((item) => (
      <ListItem key={item.id}>{item.content}</ListItem>
    ))}
  </div>
);

export default List;
