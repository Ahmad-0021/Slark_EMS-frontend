import UpdateInvoice from "@/components/Slug";
import React from "react";

const InoviceSlug = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  console.log(slug);
  return (
    <div>
      <UpdateInvoice slug={slug} />
    </div>
  );
};

export default InoviceSlug;
