import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/container";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: "HomePage" });

  return {
    title: t("title"),
    description: t("about"),
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  // Once the request locale is set, you
  // can call hooks from `next-intl`
  const t = await getTranslations({ locale, namespace: "HomePage" });

  const baseClasses =
    "px-8 py-3 text-white font-medium transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg";
  const baseStyle = {
    borderRadius: "360px",
    background:
      "linear-gradient(316deg, #FF2FC1 -11.37%, #744DF1 63.98%, #005 113.46%)",
  };

  return (
    <div>
      <h1 className="text-3xl font-bold font-[family-name:var(--font-inter)]">
        {t("title")}
      </h1>
      <ModeToggle />
      <Link href="/about">{t("about")}</Link>
      <Button className={baseClasses} style={baseStyle}>
        Button
      </Button>

      <Container>
        <div className="bg-blue-500 p-4 rounded">
          <h2 className="text-xl font-bold">XL Container</h2>
          <p>Container với max-width xl</p>
        </div>
      </Container>
    </div>
  );
}
