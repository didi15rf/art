"use client";

import { useState } from "react";

export default function Home() {
    const [following, setFollowing] = useState<string[]>([]);
    const [activeTab, setActiveTab] = useState("discover");
    const [favorites, setFavorites] = useState<string[]>([]);

    const artists = [
        {
            id: 1,
            name: "Elena Rodriguez",
            bio: "Digital abstract artist exploring color",
            followers: "12.3K",
            artworks: 45,
            category: "Digital Art"
        },
        {
            id: 2,
            name: "Marcus Chen", 
            bio: "Street art and urban photography",
            followers: "8.7K",
            artworks: 67,
            category: "Street Art"
        },
        {
            id: 3,
            name: "Sofia Andersson",
            bio: "Minimalist painter and sculptor",
            followers: "15.2K",
            artworks: 32,
            category: "Sculpture"
        },
        {
            id: 4,
            name: "David Kim",
            bio: "Contemporary mixed media artist",
            followers: "9.1K",
            artworks: 51,
            category: "Mixed Media"
        },
        {
            id: 5,
            name: "Isabella Costa",
            bio: "Watercolor landscapes and portraits",
            followers: "11.8K",
            artworks: 78,
            category: "Painting"
        },
        {
            id: 6,
            name: "Ahmed Hassan",
            bio: "3D digital sculptures and installations",
            followers: "13.5K",
            artworks: 29,
            category: "3D Art"
        }
    ];

    const featuredArtworks = [
        {
            id: 1,
            title: "Ocean Dreams",
            artist: "Elena Rodriguez",
            price: "$250",
            image: "🌊"
        },
        {
            id: 2,
            title: "Urban Rhythm",
            artist: "Marcus Chen",
            price: "$180",
            image: "🏙️"
        },
        {
            id: 3,
            title: "Silent Forms",
            artist: "Sofia Andersson",
            price: "$320",
            image: "🎭"
        },
        {
            id: 4,
            title: "Digital Fusion",
            artist: "Ahmed Hassan",
            price: "$400",
            image: "💎"
        }
    ];

    const handleFollow = (artistId: number) => {
        setFollowing(prev => 
            prev.includes(artistId.toString())
                ? prev.filter(id => id !== artistId.toString())
                : [...prev, artistId.toString()]
        );
    };

    const handleFavorite = (artworkId: number) => {
        setFavorites(prev => 
            prev.includes(artworkId.toString())
                ? prev.filter(id => id !== artworkId.toString())
                : [...prev, artworkId.toString()]
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-blue-600">Xart</h1>
                        <nav className="flex space-x-16">
                            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Home</a>
                            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Profile</a>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-8">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Recommended Artists to Follow</h2>
                    
                    {/* Artists Grid */}
                    <div className="grid grid-cols-3 gap-6 max-w-6xl">
                        {artists.map((artist) => (
                            <div key={artist.id} className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                                {/* Circular Profile */}
                                <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                                    <span className="text-white font-bold text-xl">{artist.name.charAt(0)}</span>
                                </div>
                                
                                {/* Artist Info */}
                                <h3 className="font-semibold text-gray-900 mb-1">{artist.name}</h3>
                                <p className="text-sm text-gray-600 mb-2">{artist.bio}</p>
                                <div className="flex justify-center space-x-4 text-xs text-gray-500 mb-4">
                                    <span>{artist.followers} followers</span>
                                    <span>{artist.artworks} works</span>
                                </div>
                                <div className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full mb-4 inline-block">
                                    {artist.category}
                                </div>
                                
                                {/* Follow Button */}
                                <button
                                    onClick={() => handleFollow(artist.id)}
                                    className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        following.includes(artist.id.toString())
                                            ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                            : 'bg-blue-500 text-white hover:bg-blue-600'
                                    }`}
                                >
                                    {following.includes(artist.id.toString()) ? 'Following' : 'Follow'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
