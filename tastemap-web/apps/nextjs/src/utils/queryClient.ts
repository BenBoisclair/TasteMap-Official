import { remember } from "@epic-web/remember";
import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";

export const queryClient = remember("ReactQuery", () => new QueryClient());
