import { eventSchema } from "@/lib/EventSchema";
import { z } from "zod";

export type EventFormTypes = z.infer<typeof eventSchema>;
