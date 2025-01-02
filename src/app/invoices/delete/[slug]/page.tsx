import Slug from "@/components/Slug";

const InvoiceSlug = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  return (
    <div>
      <Slug slug={slug} />
    </div>
  );
};

export default InvoiceSlug;
