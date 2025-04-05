import type { OurFileRouter } from "@/app/api/uploadthing/config";
import { generateReactHelpers } from "@uploadthing/react";

export const { useUploadThing, uploadFiles } = generateReactHelpers<OurFileRouter>(); 