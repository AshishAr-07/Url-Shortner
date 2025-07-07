"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [url, setUrl] = useState("");
  const [generatedShortUrl, setGeneratedShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  const generateShortUrl = async () => {
    if (!url) {
      setError("Please enter a URL");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`/api/generate`, {
        url: url,
      });

      if (response.data.success) {
        const shortUrlId = response.data.shortUrl;
        const fullShortUrl = `${window.location.origin}/api/getlink/${shortUrlId}`;
        setGeneratedShortUrl(fullShortUrl);
      } else {
        setError("Failed to generate short URL");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("An error occurred while generating the short URL");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedShortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const redirectToAnalytics = () => {
    router.push("/analytics");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      generateShortUrl();
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-lg">
        {/* Main Card */}
        <div className="bg-white border-2 border-gray-200 rounded-sm p-8 sm:p-10">
          {/* Header with Analytics Button */}
          <div className="text-center mb-10 relative">
            {/* Analytics Button - Top Right */}
            <button
              onClick={redirectToAnalytics}
              className="absolute top-0 right-0 bg-black cursor-pointer text-white p-3 rounded-sm transition-all duration-200"
              title="View Analytics"
            >
              <svg
                className="w-5 h-5"
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
            </button>

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
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-black mb-3">
              URL Shortener
            </h1>
            <p className="text-gray-600 text-lg">
              Transform long URLs into short, shareable links
            </p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* URL Input */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-black">
                Enter your long URL
              </label>
              <div className="relative">
                <input
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyPress={handleKeyPress}
                  type="url"
                  value={url}
                  placeholder="https://example.com/very-long-url-that-needs-shortening"
                  className="w-full px-5 py-4 bg-white border-2 border-gray-300 rounded-sm focus:border-black outline-none transition-all duration-200 text-black placeholder-gray-500"
                />
                {url && (
                  <button
                    onClick={() => setUrl("")}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="border-2 border-black bg-gray-100 p-4 rounded-sm">
                <span className="text-black font-medium">{error}</span>
              </div>
            )}

            {/* Generate Button */}
            <button
              onClick={generateShortUrl}
              disabled={loading || !url.trim()}
              className="w-full bg-black  text-white font-bold py-4 px-8 rounded-sm transition-all duration-200 "
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Generating...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  <span>Generate Short URL</span>
                </div>
              )}
            </button>
          </div>

          {/* Result Section */}
          <div className="mt-8">
            {generatedShortUrl ? (
              <div className="bg-gray-50 border-2 border-gray-200 rounded-sm p-6">
                <div className="text-center mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-black rounded-sm mb-3">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-black font-semibold mb-1">Success!</p>
                  <p className="text-gray-600 text-sm">
                    Your shortened URL is ready
                  </p>
                </div>

                <div className="bg-white border-2 border-gray-200 p-4 rounded-sm">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-black font-mono text-sm sm:text-base truncate">
                        {generatedShortUrl}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={copyToClipboard}
                        className="flex-shrink-0 bg-black hover:bg-gray-800 text-white px-3 py-2 rounded-sm font-medium transition-all duration-200"
                      >
                        {copied ? (
                          <div className="flex items-center space-x-2">
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
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            <span className="hidden sm:inline">Copied!</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
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
                                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                              />
                            </svg>
                            <span className="hidden sm:inline">Copy</span>
                          </div>
                        )}
                      </button>

                      {/* Analytics Button for Generated URL */}
                      <button
                        onClick={redirectToAnalytics}
                        className="flex-shrink-0 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-sm font-medium transition-all duration-200"
                        title="View Analytics"
                      >
                        <div className="flex items-center space-x-2">
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
                          <span className="hidden sm:inline">Analytics</span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-sm p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-200 rounded-sm mb-4">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                </div>
                <h3 className="text-gray-600 font-semibold mb-2">
                  Ready to shorten
                </h3>
                <p className="text-gray-500 text-sm">
                  Enter a URL above and click generate to create your short link
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
