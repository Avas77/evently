"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { eventSchema } from "@/lib/EventSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import Dropdown from "./Dropdown";
import { Textarea } from "../ui/textarea";
import ControlledField from "./ControlledField";
import { FileUploader } from "./FileUploader";
import Image from "next/image";
import "react-datepicker/dist/react-datepicker.css";

const EventForm = () => {
  const [files, setFiles] = useState<File[]>([]);
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
                className="textarea rounded-2xl h-72 w-full"
                value={field.value as string}
              />
            )}
          />
          <ControlledField
            name="imageUrl"
            control={form.control}
            renderComponent={(field) => (
              <FileUploader
                imageUrl={field.value as string}
                onFieldChange={field.onChange}
                setFiles={setFiles}
              />
            )}
          />
        </div>
        <div className="flex">
          <ControlledField
            name="location"
            control={form.control}
            renderComponent={(field) => (
              <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                <Image
                  src="/assets/icons/location-grey.svg"
                  alt="location"
                  width={24}
                  height={24}
                />
                <Input
                  placeholder="Event Location or Online"
                  {...field}
                  value={field.value as string}
                  className="input-field"
                />
              </div>
            )}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-5">
          <ControlledField
            name="startDateTime"
            control={form.control}
            renderComponent={(field) => (
              <div className="flex items-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                <Image
                  src="/assets/icons/calendar.svg"
                  alt="calendar"
                  width={24}
                  height={24}
                  className="filter-grey"
                />
                <p className="ml-3 whitespace-nowrap text-grey-600">
                  Start Date:
                </p>
                <DatePicker
                  selected={field.value as Date}
                  onChange={(date: Date) => field.onChange(date)}
                  showTimeSelect
                  timeInputLabel="Time:"
                  dateFormat="MM/dd/yyyy h:mm aa"
                  wrapperClassName="datePiker"
                />
              </div>
            )}
          />
        </div>
      </form>
    </Form>
  );
};

export default EventForm;
