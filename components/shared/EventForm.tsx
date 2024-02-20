"use client";
import React from "react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { eventSchema } from "@/lib/EventSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import Dropdown from "./Dropdown";

const EventForm = () => {
  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
  });

  const handleCreateEvent = () => {};

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleCreateEvent)}
        className="flex flex-col gap-5 md:flex-row"
      >
        <FormField
          name="title"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem {...field}>
                <FormControl>
                  <Input
                    placeholder="Event title"
                    {...field}
                    className="input-field"
                  />
                </FormControl>
              </FormItem>
            );
          }}
        />
       <Dropdown />
      </form>
    </Form>
  );
};

export default EventForm;
