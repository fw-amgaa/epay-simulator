import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import React from "react";
import { PaymentsTable } from "./_components/payment-table";
import { getPayments } from "./_lib/queries";

export default async function Page() {
  const { data } = await getPayments();

  return (
    <React.Suspense
      fallback={
        <DataTableSkeleton
          columnCount={6}
          searchableColumnCount={0}
          filterableColumnCount={2}
          cellWidths={["10rem", "40rem", "12rem", "12rem", "8rem", "8rem"]}
          shrinkZero
        />
      }
    >
      <PaymentsTable payments={data?.data || []} />
    </React.Suspense>
  );
}
