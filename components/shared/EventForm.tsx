"use client";
import React from "react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { eventSchema } from "@/lib/EventSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import Dropdown from "./Dropdown";
import { Textarea } from "../ui/textarea";
import ControlledField from "./ControlledField";
import FileUploader from "./FileUploader";

const EventForm = () => {
  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
  });

  const handleCreateEvent = () => {};

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleCreateEvent)}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-5 md:flex-row">
          <ControlledField
            name="title"
            control={form.control}
            renderComponent={(field) => (
              <Input
                placeholder="Event title"
                className="input-field"
                {...field}
                value={field.value as string}
              />
            )}
          />
          <ControlledField
            name="categoryId"
            control={form.control}
            renderComponent={(field) => (
              <Dropdown
                onChangeHandler={field.onChange}
                value={field.value as string}
              />
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <ControlledField
            name="description"
            control={form.control}
            renderComponent={(field) => (
              <Textarea
                placeholder="Description"
                {...field}
                className="textarea rounded-2xl"
                value={field.value as string}
              />
            )}
          />
          <ControlledField
            name="imageUrl"
            control={form.control}
            renderComponent={(field) => <FileUploader />}
          />
        </div>
      </form>
    </Form>
  );
};

export default EventForm;
