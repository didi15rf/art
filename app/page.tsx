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

const artCategories = [
    {
        name: "Painting",
        description: "Traditional and contemporary paintings",
        count: "245 artworks"
    },
    {
        name: "Sculpture",
        description: "3D art in various materials",
        count: "89 artworks"
    },
    {
        name: "Photography",
        description: "Digital and film photography",
        count: "156 artworks"
    },
    {
        name: "Digital Art",
        description: "Computer-generated artwork",
        count: "203 artworks"
    },
    {
        name: "Illustration",
        description: "Hand-drawn and digital illustrations",
        count: "178 artworks"
    },
    {
        name: "Mixed Media",
        description: "Combination of different art forms",
        count: "67 artworks"
    },
    {
        name: "Street Art",
        description: "Urban and graffiti art",
        count: "134 artworks"
    },
    {
        name: "Crafts",
        description: "Handmade decorative objects",
        count: "92 artworks"
    }
];

export default function Home() {
    const [following, setFollowing] = useState<string[]>([]);
    const [currentView, setCurrentView] = useState<'home' | 'categories'>('home');
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleFollow = (name: string) => {
        setFollowing((prev) =>
            prev.includes(name)
                ? prev.filter((n) => n !== name)
                : [...prev, name]
        );
    };

    const handleSignIn = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple validation - in a real app you'd validate against a backend
        if (email && password) {
            setIsSignedIn(true);
        }
    };

    const handleSignOut = () => {
        setIsSignedIn(false);
        setEmail('');
        setPassword('');
    };

    // Show sign-in form if user is not signed in
    if (!isSignedIn) {
        return (
            <div className="min-h-screen bg-gradient-blue-black">
                <div className="min-h-screen flex flex-col justify-center items-center px-6">
                    <div className="w-full max-w-md">
                        <div className="text-center mb-12">
                            <h1 className="text-6xl font-bold text-white mb-4">Xart</h1>
                            <p className="text-xl text-gray-300">Sign in to discover amazing art</p>
                        </div>
                        
                        <form onSubmit={handleSignIn} className="space-y-8">
                            <div>
                                <label htmlFor="email" className="block text-lg font-medium text-white mb-3">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-4 text-lg bg-white bg-opacity-20 border border-gray-300 border-opacity-30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="password" className="block text-lg font-medium text-white mb-3">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-4 text-lg bg-white bg-opacity-20 border border-gray-300 border-opacity-30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>
                            
                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-6 text-lg rounded-lg transition-colors"
                            >
                                Sign In
                            </button>
                        </form>
                        
                        <div className="mt-8 text-center">
                            <p className="text-gray-300 text-lg">
                                Don't have an account?{' '}
                                <a href="#" className="text-blue-400 hover:text-blue-300">
                                    Sign up
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-blue-black">
            {/* Header */}
            <header className="bg-transparent border-b border-gray-700 px-6 py-4">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <h1 className="text-xl font-bold text-white">Xart</h1>
                    <nav className="flex gap-6 text-sm">
                        <a 
                            href="#" 
                            onClick={(e) => {
                                e.preventDefault();
                                setCurrentView('home');
                            }}
                            className={`font-medium ${currentView === 'home' ? 'text-white' : 'text-gray-300 hover:text-white'}`}
                        >
                            Home
                        </a>
                        <a 
                            href="#" 
                            onClick={(e) => {
                                e.preventDefault();
                                setCurrentView('categories');
                            }}
                            className={`font-medium ${currentView === 'categories' ? 'text-white' : 'text-gray-300 hover:text-white'}`}
                        >
                            Categories
                        </a>
                        <a href="#" className="text-gray-300 hover:text-white font-medium">
                            Profile
                        </a>
                        <button 
                            onClick={handleSignOut}
                            className="text-gray-300 hover:text-white font-medium"
                        >
                            Sign Out
                        </button>
                    </nav>
                </div>
            </header>

            <div className="max-w-4xl mx-auto p-6">
                {currentView === 'home' ? (
                    /* Recommended Artists Section */
                    <div className="mb-8">
                        <h2 className="text-lg font-semibold text-white mb-6">Recommended Artists to Follow</h2>
                        
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
                ) : (
                    /* Art Categories Section */
                    <div className="mb-8">
                        <h2 className="text-lg font-semibold text-white mb-6">Art Categories</h2>
                        
                        <div className="grid grid-cols-2 gap-6">
                            {artCategories.map((category, i) => (
                                <div key={i} className="bg-gray-100 rounded-lg p-6 hover:bg-gray-200 transition-colors cursor-pointer">
                                    <h3 className="font-semibold text-gray-900 text-lg mb-2">{category.name}</h3>
                                    <p className="text-gray-600 text-sm mb-3">{category.description}</p>
                                    <p className="text-blue-600 text-xs font-medium">{category.count}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}