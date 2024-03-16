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
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { useUploadThing } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";
import { CreateEvent } from "@/lib/actions/events.actions";

interface IProps {
  userId: string;
}

const EventForm = ({ userId }: IProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
  });
  const router = useRouter();
  const { startUpload } = useUploadThing("imageUploader");

  const handleCreateEvent = async (values: z.infer<typeof eventSchema>) => {
    let imageUploadedUrl = values.imageUrl;
    if (files.length > 0) {
      const uploadedImage = await startUpload(files);
      if (!uploadedImage) return;
      imageUploadedUrl = uploadedImage[0].url;
    }
    try {
      const newEvent = await CreateEvent({
        event: { ...values, imageUrl: imageUploadedUrl },
        userId,
        path: "/profile",
      });
      if (newEvent) {
        form.reset();
        router.replace(`/events/${newEvent._id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
                  wrapperClassName="datePicker"
                />
              </div>
            )}
          />
          <ControlledField
            name="endDateTime"
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
                  End Date:
                </p>
                <DatePicker
                  selected={field.value as Date}
                  onChange={(date: Date) => field.onChange(date)}
                  showTimeSelect
                  timeInputLabel="Time:"
                  dateFormat="MM/dd/yyyy h:mm aa"
                  wrapperClassName="datePicker"
                />
              </div>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <ControlledField
            name="price"
            control={form.control}
            renderComponent={(field) => (
              <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                <Image
                  src="/assets/icons/dollar.svg"
                  alt="Dollar sign"
                  width={24}
                  height={24}
                  className="filter-grey"
                />
                <Input
                  type="number"
                  {...field}
                  value={field.value as string}
                  placeholder="Price"
                  className="p-regular-16 border-0 bg-grey-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <ControlledField
                  name="isFree"
                  control={form.control}
                  renderComponent={(field) => (
                    <div className="flex items-center justify-end">
                      <label
                        htmlFor="isFree"
                        className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Free Ticket
                      </label>
                      <Checkbox
                        id="isFree"
                        className="mr-2 h-5 w-5 border-2 border-primary-500"
                        onCheckedChange={field.onChange}
                        checked={field.value as boolean}
                      />
                    </div>
                  )}
                />
              </div>
            )}
          />
          <ControlledField
            name="url"
            control={form.control}
            renderComponent={(field) => (
              <div className="flex items-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                <Image
                  src="/assets/icons/link.svg"
                  alt="link sign"
                  width={24}
                  height={24}
                />
                <Input
                  placeholder="URL"
                  className="input-field"
                  {...field}
                  value={field.value as string}
                />
              </div>
            )}
          />
        </div>
        <Button size="lg" className="w-full rounded-full" type="submit">
          Create Event
        </Button>
      </form>
    </Form>
  );
};

export default EventForm;
