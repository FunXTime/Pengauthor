"use client";

import { useEffect, useState } from "react";
import { searchPosts } from "@/lib/wordpress";
import SearchResults from "./SearchResults";
import {
  RESEARCH_ORGANIZATIONS,
  getResearchState,
  setResearchState
} from "@/lib/research";
import Tooltip from "@/components/Tooltip";
import Dropdown from "@/components/Dropdown";
import Icon from "@/components/Icon";
import Infobox from "@/components/Infobox";

export default function ResearchPage() {
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("2006");
  const [organizations, setOrganizations] = useState(RESEARCH_ORGANIZATIONS
    .map((organization) => organization.value)
  );
  const [filterTopTen, setFilterTopTen] = useState(false);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    const saved = getResearchState();
    setQuery(saved.query ?? "");
    setYear(saved.year ?? "2006");
    if (saved.organizations?.length) setOrganizations(saved.organizations);
    setFilterTopTen(saved.filterTopTen ?? false)
  }, []);

  useEffect(() => {
    setResearchState({
      query,
      year,
      organizations,
      filterTopTen,
      results: getResearchState().results ?? []
    });
  }, [
    query,
    year,
    organizations,
    filterTopTen
  ]);

  useEffect(() => {
    const saved = getResearchState();
    setQuery(saved.query ?? "");
    setYear(saved.year ?? "2006");
    if (saved.organizations?.length) setOrganizations(saved.organizations);
    if (saved.results?.length) setStatus("done");
  }, []);

  async function handleSearch() {
    if (!query.trim()) return;
    setStatus("loading");
    const results = [];
    for (const organization of organizations) {
      try {
        let posts;
        if (organization == "cpa") posts = await searchPosts(organization, query, {
          per_page: 100,
          filterTopTen
        });
        else posts = await searchPosts(organization, query, {
          per_page: 50,
          filterTopTen
        });
        console.log(`Posts fetched for ${organization}:`, posts);
        results.push(...posts.map((post) => ({
          ...post,
          organization
        })));
      } catch (error) {
        console.error(`Unable to search ${organization}:`, error);
      }
    }
    const filtered = results.filter((result) =>
      new Date(result.timestamp).getFullYear() >= Number(year)
    );
    filtered.sort((a, b) => {
      const dateDiff = new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      if (dateDiff !== 0) return dateDiff;
      const organizationDiff = a.organization.localeCompare(b.organization);
      if (organizationDiff !== 0) return organizationDiff;
      return bScore - aScore;
    });
    setResearchState({
      query,
      year,
      organizations,
      results: filtered
    });
    window.dispatchEvent(new Event("researchUpdated"));
    setStatus("done");
  }

  return (
    <div className="space-y-6 overflow-x-hidden p-4 sm:p-6 lg:p-8">
      <h1>Research</h1>

      <Infobox type="INFO">
        The research utility will crawl websites and fetch good references for you, but not all of the results may be relevant. In other words, it is likely that it will show relevant results, but not all of these results are relevant. You should still try manual research if you need more information regarding a certain topic.
      </Infobox>

      <section>
        <div className="flex flex-col gap-3 md:flex-row">
          <Tooltip
            text="Search for potential words appearing in post titles and content"
            className="min-w-0 flex-1"
          >
            <input
              type="text"
              placeholder="Search posts…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="w-full rounded-xl border border-edge bg-panel px-4 py-2 text-ink outline-none"
            />
          </Tooltip>
          <Tooltip text="Search for posts in or after this year">
            <input
              type="number"
              value={year}
              min="2006"
              max={new Date().getFullYear()}
              placeholder="Lookback"
              onChange={(event) => setYear(event.target.value)}
              className="w-full rounded-xl border border-edge bg-panel px-4 py-2 text-ink outline-none md:w-40"
            />
          </Tooltip>
          <Tooltip text="Select organizations to search from">
            <Dropdown
              value={organizations}
              onChange={(event) =>
                setOrganizations(
                  Array.from(event.target.selectedOptions).map((option) => option.value)
                )
              }
              options={RESEARCH_ORGANIZATIONS}
              multiple
              size={1}
              className="w-full rounded-xl md:w-50"
              style={{
                borderRadius: "0.75rem",
                backgroundColor: "var(--panel)"
              }}
            />
          </Tooltip>
          <Tooltip text="Run the search">
            <button
              type="button"
              className="flex h-10 w-full shrink-0 items-center justify-center rounded-xl border border-edge bg-panel-raised px-4 transition-all hover:bg-panel md:h-auto md:w-auto"
              onClick={handleSearch}
            >
              <Icon name="search" />
            </button>
          </Tooltip>
        </div>

        <span className="mt-3 flex items-center gap-2 text-sm">
          <input
            id="filterTopTen"
            type="checkbox"
            checked={!filterTopTen}
            onChange={(event) => setFilterTopTen(!event.target.checked)}
            className="h-4 w-4 shrink-0 accent-accent"
          />
          <label htmlFor="filterTopTen" className="text-sm">
            Search among Top Ten posts
          </label>
        </span>
      </section>

      <section
        className={
          status !== "done"
            ? "flex min-h-[calc(100dvh-28rem)] flex-col items-center justify-center text-center unboxed sm:min-h-[calc(100vh-28rem)] lg:min-h-[calc(100vh-32rem)]"
            : ""
        }
      >
        {status === "idle" && (
          <>
            <Icon
              name="researchHero"
              className="h-20 w-20 opacity-40 sm:h-24 sm:w-24"
            />
            <p className="mt-6">
              To begin your research, search for something above!
            </p>
          </>
        )}
        {status === "loading" && (
          <>
            <Icon
              name="researchLoading"
              className="h-20 w-20 animate-pulse opacity-40 [animation-duration:500ms] sm:h-24 sm:w-24"
            />
            <p className="mt-6">
              Going through {organizations.length} website{organizations.length !== 1 ? "s" : ""} to find relevant posts…
            </p>
          </>
        )}
        {status === "done" && (
          <SearchResults />
        )}
      </section>
    </div>
  );
}
