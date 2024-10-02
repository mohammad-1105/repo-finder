import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { StarIcon, GitForkIcon } from "lucide-react";

export type RepoProps = {
  id: number;
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
};

export default function RepoCard({
  name,
  description,
  language,
  stars,
  forks,
}: RepoProps) {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            {description.slice(0, 100)}
          </p>
          <div className="flex justify-between text-sm text-gray-500">
            <span>{language}</span>
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <StarIcon className="w-4 h-4 mr-1" />
                {stars}
              </span>
              <span className="flex items-center">
                <GitForkIcon className="w-4 h-4 mr-1" />
                {forks}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
