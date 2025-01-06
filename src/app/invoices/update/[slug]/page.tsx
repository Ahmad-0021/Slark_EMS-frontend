import UpdateInvoice from "@/components/Slug";
import React from "react";


const InoviceSlug = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  return (
    <div>
      <UpdateInvoice slug={slug} />
    </div>
  );
};

export default InoviceSlug;