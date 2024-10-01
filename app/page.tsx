import { BlurContainer } from "@/components/BlurContainer";
import SearchDisplayWrapper from "@/components/SearchDisplayWrapper";
import { TypographyBlockquote } from "@/components/TypographyBlockquote";
import { TypographyH1 } from "@/components/TypographyH1";

export default function HomePage() {
  return (
    <BlurContainer className="conatiner max-w-6xl mx-auto px-8 py-8">
      <main className="">
        {/* header */}
        <header className="flex flex-col items-center">
          <TypographyH1>Repo Finder</TypographyH1>
          <TypographyBlockquote className="border-r-2 pr-6">
            Find any random GitHub repositories
          </TypographyBlockquote>
        </header>
        {/* container for search box and search results */}
        <section>
        <SearchDisplayWrapper />
        </section>
      </main>
    </BlurContainer>
  );
}
