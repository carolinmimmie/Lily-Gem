import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId, // Det är id:t för ditt Sanity-projekt (som du fick när du skapade det i Sanity).
  dataset, // I Sanity kan du ha flera dataset (som olika databaser), standard heter produktion
  apiVersion, // Sanity släpper nya versioner av sitt API ibland.
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
});
