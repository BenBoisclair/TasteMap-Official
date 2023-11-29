import type { Vendor } from "~/types/types";

const fetchVendor = async ({
  vendorId,
}: {
  vendorId: string;
}): Promise<Vendor> => {
  const response = await fetch(`/api/vendors/${vendorId}`);
  if (!response.ok) {
    throw new Error(`Error fetching vendor: ${vendorId}`);
  }
  return response.json() as Promise<Vendor>;
};

export default fetchVendor;
