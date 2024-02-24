import React from "react";
import { FormControl, FormField, FormItem } from "../ui/form";
import { Control, ControllerRenderProps } from "react-hook-form";
import { EventFormTypes } from "@/types/EventType";

interface IProps {
  name: keyof EventFormTypes;
  control: Control<EventFormTypes>;
  renderComponent: (
    field: ControllerRenderProps<EventFormTypes>
  ) => JSX.Element;
}

const ControlledField = ({ name, control, renderComponent }: IProps) => {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <FormItem className="w-full">
            <FormControl>{renderComponent(field)}</FormControl>
          </FormItem>
        );
      }}
    />
  );
};

export default ControlledField;
