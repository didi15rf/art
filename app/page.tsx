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
    const [currentView, setCurrentView] = useState<'home' | 'categories' | 'profile'>('home');
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showSignUp, setShowSignUp] = useState(false);
    const [signUpPhone, setSignUpPhone] = useState('');
    const [signUpEmail, setSignUpEmail] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');
    const [customUsername, setCustomUsername] = useState('');
    const [isEditingUsername, setIsEditingUsername] = useState(false);
    const [profilePicture, setProfilePicture] = useState<string | null>(null);
    
    // Profile data - in a real app this would come from your backend
    const profileData = {
        username: customUsername || (email ? email.split('@')[0] : 'User'),
        joinDate: 'January 2024',
        followers: 1247,
        likes: 3891,
        comments: 567
    };

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
        setShowSignUp(false);
        setSignUpPhone('');
        setSignUpEmail('');
        setSignUpPassword('');
        setCustomUsername('');
        setIsEditingUsername(false);
        setProfilePicture(null);
    };

    const handleSignUp = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple validation - in a real app you'd validate against a backend
        if (signUpEmail && signUpPassword && signUpPhone) {
            setIsSignedIn(true);
            setShowSignUp(false);
            setEmail(signUpEmail); // Set email for profile
        }
    };

    const handleUsernameEdit = () => {
        setIsEditingUsername(true);
        setCustomUsername(profileData.username);
    };

    const handleUsernameSave = () => {
        if (customUsername.trim()) {
            setIsEditingUsername(false);
        }
    };

    const handleUsernameCancel = () => {
        setCustomUsername(profileData.username);
        setIsEditingUsername(false);
    };

    const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfilePicture(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // Show sign-in form if user is not signed in
    if (!isSignedIn) {
        return (
            <div className="min-h-screen bg-gradient-blue-black flex items-center justify-center px-4">
                <div className="w-full max-w-xs">
                    {!showSignUp ? (
                        // Sign In Form
                        <>
                            <div className="text-center mb-8">
                                <h1 className="text-4xl font-bold text-white mb-3">Xart</h1>
                                <p className="text-base text-gray-300">Sign in to discover amazing art</p>
                            </div>
                            
                            <form onSubmit={handleSignIn} className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-3 py-3 text-base bg-white bg-opacity-20 border border-gray-300 border-opacity-30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-3 py-3 text-base bg-white bg-opacity-20 border border-gray-300 border-opacity-30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter your password"
                                        required
                                    />
                                </div>
                                
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 text-base rounded-lg transition-colors"
                                >
                                    Sign In
                                </button>
                            </form>
                            
                            <div className="mt-6 text-center">
                                <p className="text-gray-300 text-sm">
                                    Don't have an account?{' '}
                                    <button 
                                        onClick={() => setShowSignUp(true)}
                                        className="text-blue-400 hover:text-blue-300 underline"
                                    >
                                        Sign up
                                    </button>
                                </p>
                            </div>
                        </>
                    ) : (
                        // Sign Up Form
                        <>
                            <div className="text-center mb-8">
                                <h1 className="text-4xl font-bold text-white mb-3">Xart</h1>
                                <p className="text-base text-gray-300">Create your account</p>
                            </div>
                            
                            <form onSubmit={handleSignUp} className="space-y-6">
                                <div>
                                    <label htmlFor="signUpEmail" className="block text-sm font-medium text-white mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="signUpEmail"
                                        value={signUpEmail}
                                        onChange={(e) => setSignUpEmail(e.target.value)}
                                        className="w-full px-3 py-3 text-base bg-white bg-opacity-20 border border-gray-300 border-opacity-30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="signUpPhone" className="block text-sm font-medium text-white mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="signUpPhone"
                                        value={signUpPhone}
                                        onChange={(e) => setSignUpPhone(e.target.value)}
                                        className="w-full px-3 py-3 text-base bg-white bg-opacity-20 border border-gray-300 border-opacity-30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter your phone number"
                                        required
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="signUpPassword" className="block text-sm font-medium text-white mb-2">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="signUpPassword"
                                        value={signUpPassword}
                                        onChange={(e) => setSignUpPassword(e.target.value)}
                                        className="w-full px-3 py-3 text-base bg-white bg-opacity-20 border border-gray-300 border-opacity-30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Create a password"
                                        required
                                    />
                                </div>
                                
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 text-base rounded-lg transition-colors"
                                >
                                    Sign Up
                                </button>
                            </form>
                            
                            <div className="mt-6 text-center">
                                <p className="text-gray-300 text-sm">
                                    Already have an account?{' '}
                                    <button 
                                        onClick={() => setShowSignUp(false)}
                                        className="text-blue-400 hover:text-blue-300 underline"
                                    >
                                        Sign in
                                    </button>
                                </p>
                            </div>
                        </>
                    )}
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
                        <a 
                            href="#" 
                            onClick={(e) => {
                                e.preventDefault();
                                setCurrentView('profile');
                            }}
                            className={`font-medium ${currentView === 'profile' ? 'text-white' : 'text-gray-300 hover:text-white'}`}
                        >
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
                ) : currentView === 'categories' ? (
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
                ) : (
                    /* Profile Section */
                    <div className="mb-8">
                        <h2 className="text-lg font-semibold text-white mb-6">Profile</h2>
                        
                        <div className="bg-gray-100 rounded-lg p-8 max-w-2xl mx-auto">
                            {/* Profile Header */}
                            <div className="mb-8">
                                {/* Profile Picture and Stats Row */}
                                <div className="flex items-center gap-8 mb-6">
                                    <div className="relative">
                                        <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                                            {profilePicture ? (
                                                <img 
                                                    src={profilePicture} 
                                                    alt="Profile" 
                                                    className="w-full h-full object-cover rounded-full"
                                                />
                                            ) : (
                                                <span className="text-gray-500 text-sm">Profile</span>
                                            )}
                                        </div>
                                        <label 
                                            htmlFor="profilePicUpload"
                                            className="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 cursor-pointer shadow-lg transition-colors"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </label>
                                        <input
                                            type="file"
                                            id="profilePicUpload"
                                            accept="image/*"
                                            onChange={handleProfilePictureChange}
                                            className="hidden"
                                        />
                                    </div>
                                    
                                    {/* Stats beside profile picture */}
                                    <div className="flex-1">
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-blue-600 mb-1">
                                                    {profileData.followers.toLocaleString()}
                                                </div>
                                                <div className="text-sm text-gray-600">Followers</div>
                                            </div>
                                            
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-red-500 mb-1">
                                                    {profileData.likes.toLocaleString()}
                                                </div>
                                                <div className="text-sm text-gray-600">Likes</div>
                                            </div>
                                            
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-green-600 mb-1">
                                                    {profileData.comments.toLocaleString()}
                                                </div>
                                                <div className="text-sm text-gray-600">Comments</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Username section */}
                                <div className="text-center">
                                    {isEditingUsername ? (
                                        <div className="flex items-center justify-center gap-2 mb-2">
                                            <span className="text-2xl font-bold text-gray-900">@</span>
                                            <input
                                                type="text"
                                                value={customUsername}
                                                onChange={(e) => setCustomUsername(e.target.value)}
                                                className="text-2xl font-bold text-gray-900 bg-white border border-gray-300 rounded px-2 py-1 text-center"
                                                placeholder="Username"
                                            />
                                            <button
                                                onClick={handleUsernameSave}
                                                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={handleUsernameCancel}
                                                className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center gap-2 mb-2">
                                            <h3 className="text-2xl font-bold text-gray-900">@{profileData.username}</h3>
                                            <button
                                                onClick={handleUsernameEdit}
                                                className="text-blue-600 hover:text-blue-700 ml-2"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                        </div>
                                    )}
                                    <p className="text-gray-600">Joined {profileData.joinDate}</p>
                                </div>
                            </div>
                            
                            {/* Additional Profile Info */}
                            <div className="mt-8 space-y-4">
                                <div className="bg-white rounded-lg p-4 shadow-sm">
                                    <h4 className="font-semibold text-gray-900 mb-2">Account Information</h4>
                                    <div className="space-y-2 text-sm text-gray-600">
                                        <div className="flex justify-between">
                                            <span>Email:</span>
                                            <span>{email}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Member since:</span>
                                            <span>{profileData.joinDate}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Following:</span>
                                            <span>{following.length} artists</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}