"use client";

import { useState } from "react";
import { getContestData } from "@/lib/contest-data";

export default async function ContestDetailsPage({ params }: { params: { id: string } }) {
  const { id } = params;

  // Fetch all contests
  const contests = await getContestData();

  // Find the specific contest by ID
  const contest = contests.find((contest) => contest.id === id);

  if (!contest) {
    return <div className="text-center py-12">Contest not found.</div>;
  }

  const [activeTab, setActiveTab] = useState("Design Entries");
  const [entries, setEntries] = useState(contest.designEntries);
  const [comments, setComments] = useState(contest.comments);
  const [filter, setFilter] = useState({ sortBy: "most recent", showDeclined: true });

  // Handle rating an entry
  const handleRateEntry = (entryId: string, rating: number) => {
    setEntries((prevEntries) =>
      prevEntries.map((entry) =>
        entry.id === entryId ? { ...entry, rating } : entry
      )
    );
  };

  // Handle deleting an entry
  const handleDeleteEntry = (entryId: string) => {
    setEntries((prevEntries) => prevEntries.filter((entry) => entry.id !== entryId));
  };

  // Handle adding a comment
  const handleAddComment = (text: string) => {
    const newComment = {
      id: String(comments.length + 1),
      author: "Customer",
      text,
    };
    setComments((prevComments) => [...prevComments, newComment]);
  };

  // Filter and sort entries
  const filteredEntries = entries
    .filter((entry) => (filter.showDeclined ? true : !entry.declined))
    .sort((a, b) => {
      if (filter.sortBy === "most recent") {
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      } else if (filter.sortBy === "most rated") {
        return b.rating - a.rating;
      }
      return 0;
    });

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-4">{contest.title}</h1>
      <p className="text-gray-600 mb-4">Current Round: {contest.round}</p>

      {/* Tabs */}
      <div className="flex border-b mb-8">
        {["Design Entries", "Brief", "Comments"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 ${
              activeTab === tab
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "Design Entries" && (
        <div>
          {/* Filters */}
          <div className="flex justify-between items-center mb-4">
            <select
              value={filter.sortBy}
              onChange={(e) =>
                setFilter((prev) => ({ ...prev, sortBy: e.target.value }))
              }
              className="border rounded-lg px-4 py-2"
            >
              <option value="most recent">Most Recent</option>
              <option value="most rated">Most Rated</option>
            </select>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filter.showDeclined}
                onChange={(e) =>
                  setFilter((prev) => ({
                    ...prev,
                    showDeclined: e.target.checked,
                  }))
                }
              />
              Show Declined
            </label>
          </div>

          {/* Entries */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEntries.map((entry) => (
              <div
                key={entry.id}
                className="border rounded-lg p-4 shadow hover:shadow-lg transition"
              >
                <img
                  src={entry.imageUrl}
                  alt={entry.designer}
                  className="w-full h-40 object-cover mb-4"
                />
                <h3 className="text-lg font-semibold mb-2">{entry.designer}</h3>
                <p className="text-gray-600 mb-2">Rating: {entry.rating} / 5</p>
                <div className="flex items-center gap-2 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleRateEntry(entry.id, star)}
                      className={`text-xl ${
                        star <= entry.rating ? "text-yellow-500" : "text-gray-400"
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => handleDeleteEntry(entry.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "Brief" && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Contest Brief</h2>
          <p className="text-gray-600">{contest.description}</p>
        </div>
      )}

      {activeTab === "Comments" && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Comments</h2>
          <div className="space-y-4 mb-4">
            {comments.map((comment) => (
              <div key={comment.id} className="border rounded-lg p-4">
                <p className="font-semibold">{comment.author}</p>
                <p className="text-gray-600">{comment.text}</p>
              </div>
            ))}
          </div>
          <textarea
            placeholder="Write a comment..."
            className="w-full border rounded-lg p-4 mb-4"
            rows={4}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleAddComment((e.target as HTMLTextAreaElement).value);
                (e.target as HTMLTextAreaElement).value = "";
              }
            }}
          ></textarea>
        </div>
      )}
    </div>
  );
}