import { remember } from "@epic-web/remember";
import { QueryClient } from "@tanstack/react-query";

const queryClient = remember("ReactQuery", () => new QueryClient());
export default queryClient;
