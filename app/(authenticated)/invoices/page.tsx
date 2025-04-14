import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import React from "react";
import { InvoicesTable } from "./_components/invoices-table";
import { getInvoices } from "./_lib/queries";

export default async function Page() {
  const { data } = await getInvoices();

  return (
    <>
      {/* <DateRangePicker
        triggerSize="sm"
        triggerClassName="w-68"
        shallow={false}
      /> */}
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
        <InvoicesTable invoices={data || []} />
      </React.Suspense>
    </>
  );
}
