"use client";

import React, { useState } from "react";
import axios from "axios";

export default function Analytics() {
  const [shortUrl, setShortUrl] = useState("");
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAnalytics = async () => {
    if (!shortUrl) {
      setError("Please enter a short URL");
      return;
    }

    setLoading(true);
    setError("");
    setAnalytics(null);

    try {
      const urlParts = shortUrl.split("/");
      const shortUrlId = urlParts[urlParts.length - 1];

      const response = await axios.get(`/api/analytic?id=${shortUrlId}`);

      if (response.data.success) {
        setAnalytics(response.data);
      } else {
        setError(response.data.message || "Failed to fetch analytics");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("An error occurred while fetching analytics");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchAnalytics();
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const formatDateShort = (timestamp) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-screen-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-black rounded-sm mb-6">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h2a2 2 0 012 2z"
                />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-black mb-4">
              URL Analytics
            </h1>
            <p className=" text-gray-600 max-w-2xl mx-auto">
              Discover detailed insights and performance metrics for your
              shortened URLs
            </p>
          </div>

          {/* Form */}
          <div className="bg-white border-2 border-gray-200 rounded-sm p-8 mb-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-black mb-3">
                  Enter Short URL
                </label>
                <input
                  type="text"
                  value={shortUrl}
                  onChange={(e) => setShortUrl(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="https://yoursite.com/api/getlink/abc123"
                  className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-sm focus:border-black outline-none transition-all duration-200 text-black placeholder-gray-500"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="border-2 border-black bg-gray-100 p-4 rounded-sm">
                  <span className="text-black font-medium">{error}</span>
                </div>
              )}

              <button
                onClick={fetchAnalytics}
                disabled={loading || !shortUrl.trim()}
                className="w-full bg-black text-white font-medium py-3 px-6 rounded-sm transition-all duration-200 "
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Analyzing...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h2a2 2 0 012 2z"
                      />
                    </svg>
                    <span>Get Analytics</span>
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Analytics Results */}
          {analytics && (
            <div className="space-y-8">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white border-2 border-gray-200 p-6 rounded-sm">
                  <h3 className="text-gray-600 text-sm font-medium mb-2">
                    Total Clicks
                  </h3>
                  <p className="text-3xl font-bold text-black">
                    {analytics.totalClicks}
                  </p>
                </div>

                <div className="bg-white border-2 border-gray-200 p-6 rounded-sm">
                  <h3 className="text-gray-600 text-sm font-medium mb-2">
                    Short URL
                  </h3>
                  <p className="text-sm font-mono font-medium text-black truncate">
                    {analytics.entry.shortUrl}
                  </p>
                </div>

                <div className="bg-white border-2 border-gray-200 p-6 rounded-sm">
                  <h3 className="text-gray-600 text-sm font-medium mb-2">
                    Created
                  </h3>
                  <p className="text-sm font-medium text-black">
                    {formatDateShort(analytics.entry.createdAt)}
                  </p>
                </div>
              </div>

              {/* Original URL */}
              <div className="bg-white border-2 border-gray-200 rounded-sm p-6">
                <h3 className="text-xl font-bold text-black mb-4 flex items-center">
                  <div className="bg-black p-2 rounded-sm mr-3">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </div>
                  Original URL
                </h3>
                <div className="bg-gray-50 border border-gray-200 p-4 rounded-sm">
                  <a
                    href={analytics.entry.redirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black hover:underline break-all font-medium"
                  >
                    {analytics.entry.redirectUrl}
                  </a>
                </div>
              </div>

              {/* Visit History */}
              <div className="bg-white border-2 border-gray-200 rounded-sm p-6">
                <h3 className="text-xl font-bold text-black mb-6 flex items-center">
                  <div className="bg-black p-2 rounded-sm mr-3">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  Visit History
                </h3>

                {analytics.entry.visitHistory &&
                analytics.entry.visitHistory.length > 0 ? (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {analytics.entry.visitHistory.map((visit, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-sm hover:bg-gray-100 transition-colors duration-200"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="bg-black text-white text-sm font-bold px-3 py-1 rounded-sm min-w-[2rem] text-center">
                            {index + 1}
                          </div>
                          <div>
                            <div className="text-black font-medium">
                              {formatDate(visit.timestamp)}
                            </div>
                            <div className="text-gray-500 text-sm">
                              Click recorded
                            </div>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="bg-gray-100 border-2 border-gray-200 rounded-sm p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h2a2 2 0 012 2z"
                        />
                      </svg>
                    </div>
                    <h4 className="text-lg font-medium text-black mb-2">
                      No visits yet
                    </h4>
                    <p className="text-gray-500">
                      This URL hasn&lsquo;t been clicked yet. Share it to start
                      tracking visits!
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
  );
}
