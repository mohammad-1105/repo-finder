"use client";
import ReposContainer from "./ReposContainer";
import SearchBox from "./SearchBox";
import { useState } from "react";

export default function SearchDisplayWrapper() {
  const [repos, setRepos] = useState([]);
  console.log(repos);
  return (
    <div className="my-6">
      <div className="mb-4">
        <SearchBox setRepos={setRepos} />
      </div>

      <div>
        <ReposContainer repos={repos} />
      </div>
    </div>
  );
}
