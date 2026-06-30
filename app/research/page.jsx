"use client";

import { useEffect, useState } from "react";
import { searchPosts } from "@/lib/wordpress";
import SearchResults from "@/components/ResearchPage/SearchResults";
import {
  RESEARCH_ORGANIZATIONS,
  getResearchState,
  setResearchState
} from "@/lib/research";
import Tooltip from "@/components/Tooltip";
import Dropdown from "@/components/Dropdown";
import Icon from "@/components/Icon";

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
        console.log(organization, posts);
        results.push(...posts.map((post) => ({
          ...post,
          organization
        })));
      } catch (error) {
        console.error(`Failed to search ${organization}`, error);
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
    <div className="space-y-6 p-8">
      <section>
        <div className="flex gap-3">
          <Tooltip
            text="Search for potential words appearing in post titles and content"
            className="flex-1"
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
              onChange={(event) => setYear(event.target.value)}
              className="w-40 rounded-xl border border-edge bg-panel px-4 py-2 text-ink outline-none"
            />
          </Tooltip>
          <Tooltip text="Select organizations to search from">
            <Dropdown
              value={organizations}
              onChange={(event) =>
                setOrganizations(
                  Array.from(event.target.selectedOptions)
                    .map((option) => option.value)
                )
              }
              options={RESEARCH_ORGANIZATIONS}
              multiple
              size={1}
              className="w-50 rounded-xl"
              style={{
                borderRadius: "0.75rem",
                backgroundColor: "var(--panel)"
              }}
            />
          </Tooltip>
          <Tooltip text="Run the search">
            <button
              type="button"
              className="flex items-center justify-center rounded-xl border border-edge bg-panel-raised px-4 transition-all hover:bg-panel"
              onClick={handleSearch}
            >
              <Icon name="search" />
            </button>
          </Tooltip>
        </div>
        <label className="mt-3 flex items-center gap-2 text-sm text-faint cursor-pointer">
          <input
            type="checkbox"
            checked={!filterTopTen}
            onChange={(event) => setFilterTopTen(!event.target.checked)}
            className="h-4 w-4 accent-accent cursor-pointer"
          />
          <span className="text-sm text-faint">
            Search among Top Ten posts
          </span>
        </label>
      </section>

      <section
        className={
          status === "done"
            ? ""
            : "flex min-h-[24rem] flex-col items-center justify-center text-center"
        }
      >
        {status === "idle" && (
          <>
            <Icon
              name="researchHero"
              className="h-24 w-24 text-faint opacity-40"
            />
            <p className="mt-6 text-faint">
              To begin your research, search for something above!
            </p>
          </>
        )}
        {status === "loading" && (
          <>
            <Icon
              name="researchLoading"
              className="h-24 w-24 text-faint opacity-40 animate-pulse [animation-duration:500ms]"
            />
            <p className="mt-6 text-faint">
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
