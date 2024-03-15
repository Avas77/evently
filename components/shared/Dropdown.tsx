import React, { startTransition, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Input } from "../ui/input";
import { ICategory } from "@/lib/database/models/category.model";
import { AlertDialogAction } from "@radix-ui/react-alert-dialog";
import { Button } from "../ui/button";
import { createCategory } from "@/lib/actions/category.actions";

interface IProps {
  onChangeHandler: () => void;
  value: string;
}

const Dropdown = ({ onChangeHandler, value }: IProps) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [newCategory, setNewCategory] = useState("");

  const handleAddNewCatgory = () => {
    createCategory({
      categoryName: newCategory.trim(),
    }).then((category) => setCategories((prev) => [...prev, category]));
  };

  return (
    <Select defaultValue={value} onValueChange={onChangeHandler}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        {categories?.map((category) => (
          <SelectItem
            key={category._id}
            value={category._id}
            className="select-item p-regular-4"
          >
            {category.name}
          </SelectItem>
        ))}
        <AlertDialog>
          <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">
            Add new category
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>New Catgory</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  placeholder="Catgory Name"
                  type="text"
                  className="input-field mt-3"
                  onChange={(e) => setNewCategory(e.target.value)}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex flex-col sm:flex-row">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => startTransition(handleAddNewCatgory)}
              >
                <Button>Add</Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  );
};

export default Dropdown;
