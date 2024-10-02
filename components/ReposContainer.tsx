import RepoCard, { RepoProps } from "./RepoCard";
import { TypographyH1 } from "./TypographyH1";

export default function ReposContainer({ repos }: { repos: RepoProps[] }) {
  return (
    <>
      {repos.length === 0 && (
        <p className="text-center font-extrabold tracking-tight text-xl">
          No repositories found
        </p>
      )}
      <div className="grid gap-6 md:grid-cols-2">
        {repos.length > 0 &&
          repos.map((repo, index) => (
            <RepoCard key={repo.forks + index} {...repo} />
          ))}
      </div>
    </>
  );
}
