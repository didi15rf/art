"use client";

import { useState } from "react";

const artists = [
    {
        name: "Artist Name 1",
        bio: "Short bio about artist 1",
    },
    {
        name: "Artist Name 2",
        bio: "Short bio about artist 2",
    },
    {
        name: "Artist Name 3",
        bio: "Short bio about artist 3",
    },
    {
        name: "Artist Name 4",
        bio: "Short bio about artist 4",
    },
    {
        name: "Artist Name 5",
        bio: "Short bio about artist 5",
    },
    {
        name: "Artist Name 6",
        bio: "Short bio about artist 6",
    },
];

export default function Home() {
    const [following, setFollowing] = useState<string[]>([]);

    const handleFollow = (name: string) => {
        setFollowing((prev) =>
            prev.includes(name)
                ? prev.filter((n) => n !== name)
                : [...prev, name]
        );
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 px-6 py-4">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <h1 className="text-xl font-bold text-gray-900">Xart</h1>
                    <nav className="flex gap-6 text-sm">
                        <a href="#" className="text-blue-600 font-medium">
                            Home
                        </a>
                        <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">
                            Categories
                        </a>
                        <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">
                            Profile
                        </a>
                    </nav>
                </div>
            </header>

            <div className="max-w-4xl mx-auto p-6">
                {/* Recommended Artists Section */}
                <div className="mb-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">Recommended Artists to Follow</h2>
                    
                    <div className="grid grid-cols-3 gap-4">
                        {artists.map((artist, i) => (
                            <div key={i} className="bg-gray-100 rounded-lg p-6 text-center">
                                <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                                    <span className="text-gray-500 text-xs">150 x 150</span>
                                </div>
                                <h3 className="font-semibold text-gray-900 text-sm mb-1">{artist.name}</h3>
                                <p className="text-xs text-gray-600 mb-4">{artist.bio}</p>
                                <button
                                    onClick={() => handleFollow(artist.name)}
                                    className={`px-4 py-2 rounded text-sm font-medium ${
                                        following.includes(artist.name)
                                            ? "bg-gray-300 text-gray-700"
                                            : "bg-blue-500 text-white hover:bg-blue-600"
                                    }`}
                                >
                                    {following.includes(artist.name) ? "Following" : "Follow"}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}