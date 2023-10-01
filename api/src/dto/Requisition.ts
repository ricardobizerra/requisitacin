import { z } from "zod";

export const RequisitionDTO = z.object({
  title: z.string(),
  body: z.string(),
  studentId: z.string().uuid(),
  serviceId: z.string().uuid(),
  universitySectionId: z.string().uuid(),
});

export const RequisitionUpdateDTO = z.enum(["OPENED", "CONCLUDED"]);