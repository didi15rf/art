"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';

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
    const [signUpUsername, setSignUpUsername] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');
    const [customUsername, setCustomUsername] = useState('');
    const [isEditingUsername, setIsEditingUsername] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    const [profileImage, setProfileImage] = useState<string | null>(null);
    
    // Load user data from localStorage on component mount
    useEffect(() => {
        const savedUserData = localStorage.getItem('xart-user');
        if (savedUserData) {
            const userData = JSON.parse(savedUserData);
            setIsSignedIn(true);
            setEmail(userData.email || '');
            setCustomUsername(userData.customUsername || '');
            setFollowing(userData.following || []);
            setProfileImage(userData.profileImage || null);
        }
        setIsInitialized(true);
    }, []);

    // Register ldrs component and create trefoil loader
    useEffect(() => {
        async function setupLoader() {
            const { trefoil } = await import('ldrs');
            trefoil.register();
        }
        setupLoader();
    }, []);

    // Save user data to localStorage whenever following or username changes
    useEffect(() => {
        if (isSignedIn && isInitialized) {
            const userData = {
                email: email,
                customUsername: customUsername,
                following: following,
                profileImage: profileImage,
                signInDate: new Date().toISOString()
            };
            localStorage.setItem('xart-user', JSON.stringify(userData));
        }
    }, [following, customUsername, profileImage, isSignedIn, isInitialized, email]);

    // Create trefoil element when loading starts
    useEffect(() => {
        if (isLoading) {
            const container = document.getElementById('trefoil-loader');
            if (container) {
                // Clear existing content
                container.innerHTML = '';
                
                // Create trefoil element
                const trefoilElement = document.createElement('l-trefoil');
                trefoilElement.setAttribute('size', '40');
                trefoilElement.setAttribute('stroke', '4');
                trefoilElement.setAttribute('stroke-length', '0.15');
                trefoilElement.setAttribute('bg-opacity', '0.1');
                trefoilElement.setAttribute('speed', '1.4');
                trefoilElement.setAttribute('color', 'black');
                container.appendChild(trefoilElement);
            }
        }
    }, [isLoading]);
    
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
            setIsLoading(true);
            // Simulate API call delay
            setTimeout(() => {
                setIsSignedIn(true);
                setIsLoading(false);
                
                // Show success toast
                toast.success('You sign in!');
                
                // Save user data to localStorage
                const userData = {
                    email: email,
                    customUsername: customUsername,
                    following: following,
                    profileImage: profileImage,
                    signInDate: new Date().toISOString()
                };
                localStorage.setItem('xart-user', JSON.stringify(userData));
            }, 2000);
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
        setSignUpUsername('');
        setCustomUsername('');
        setIsEditingUsername(false);
        setFollowing([]);
        setProfileImage(null);
        
        // Clear user data from localStorage
        localStorage.removeItem('xart-user');
    };
    const handleSignUp = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple validation - in a real app you'd validate against a backend
        if (signUpEmail && signUpPhone && signUpUsername && signUpPassword) {
            setIsLoading(true);
            // Simulate API call delay
            setTimeout(() => {
                setIsSignedIn(true);
                setShowSignUp(false);
                setEmail(signUpEmail); // Set email for profile
                setCustomUsername(signUpUsername); // Set username for profile
                setIsLoading(false);
                
                // Save user data to localStorage
                const userData = {
                    email: signUpEmail,
                    customUsername: signUpUsername,
                    following: following,
                    profileImage: profileImage,
                    signInDate: new Date().toISOString()
                };
                localStorage.setItem('xart-user', JSON.stringify(userData));
            }, 2000);
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

    const handleProfileImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result as string;
                setProfileImage(result);
                toast.success('Profile image updated!');
            };
            reader.readAsDataURL(file);
        }
    };

    const handleProfileImageClick = () => {
        const fileInput = document.getElementById('profile-image-input') as HTMLInputElement;
        fileInput?.click();
    };


    // Show loading while initializing
    if (!isInitialized) {
        return (
            <div className="min-h-screen bg-gradient-blue-black flex items-center justify-center">
                <div className="text-white text-lg">Loading...</div>
            </div>
        );
    }

    // Show sign-in form if user is not signed in
    if (!isSignedIn) {
        return (
            <div className="min-h-screen bg-gradient-blue-black flex items-center justify-center px-4">
                {/* Loading Overlay */}
                {isLoading && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-8 text-center">
                            <div className="flex justify-center mb-4">
                                <div id="trefoil-loader"></div>
                            </div>
                            <p className="text-gray-700 font-medium">
                                {showSignUp ? 'Creating your account...' : 'Signing you in...'}
                            </p>
                        </div>
                    </div>
                )}
                
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
                                    Do not have an account?{' '}
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
                                    <label htmlFor="signUpUsername" className="block text-sm font-medium text-white mb-2">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        id="signUpUsername"
                                        value={signUpUsername}
                                        onChange={(e) => setSignUpUsername(e.target.value)}
                                        className="w-full px-3 py-3 text-base bg-white bg-opacity-20 border border-gray-300 border-opacity-30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Choose a username"
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
                                <div key={i} className="bg-gray-800 rounded-lg p-6 text-center">
                                    <div className="w-20 h-20 bg-gray-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                                        <span className="text-gray-400 text-xs">150 x 150</span>
                                    </div>
                                    <h3 className="font-semibold text-white text-lg mb-2">{artist.name}</h3>
                                    <p className="text-gray-300 text-sm mb-4">{artist.bio}</p>
                                    <button
                                        onClick={() => handleFollow(artist.name)}
                                        className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                                            following.includes(artist.name)
                                                ? "bg-gray-600 text-gray-300"
                                                : "bg-blue-600 text-white hover:bg-blue-700"
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
                        
                        <div className="bg-gray-100 rounded-lg p-8 max-w-md mx-auto">
                            {/* Profile Header - TikTok Style */}
                            <div className="text-center mb-8">
                                {/* Profile Image */}
                                <div className="relative">
                                    <div 
                                        className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                                        onClick={handleProfileImageClick}
                                    >
                                        {profileImage ? (
                                            <Image 
                                                src={profileImage}
                                                alt="Profile"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="text-center">
                                                <svg className="w-8 h-8 text-gray-500 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                </svg>
                                                <p className="text-xs text-gray-500">Add Photo</p>
                                            </div>
                                        )}
                                    </div>
                                    <input
                                        id="profile-image-input"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleProfileImageUpload}
                                        className="hidden"
                                    />
                                </div>
                                
                                {/* Username - TikTok Style */}
                                {isEditingUsername ? (
                                    <div className="flex items-center justify-center gap-2 mb-3">
                                        <span className="text-xl font-bold text-gray-900">@</span>
                                        <input
                                            type="text"
                                            value={customUsername}
                                            onChange={(e) => setCustomUsername(e.target.value)}
                                            className="text-xl font-bold text-gray-900 bg-white border border-gray-300 rounded px-2 py-1 text-center"
                                            placeholder="Username"
                                        />
                                        <button
                                            onClick={handleUsernameSave}
                                            className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-xs"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={handleUsernameCancel}
                                            className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded text-xs"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center gap-1 mb-3">
                                        <h3 className="text-xl font-bold text-gray-900">@{profileData.username}</h3>
                                        <button
                                            onClick={handleUsernameEdit}
                                            className="text-gray-500 hover:text-blue-600 ml-1"
                                        >
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </button>
                                    </div>
                                )}
                                
                                {/* Join Date */}
                                <p className="text-gray-500 text-sm mb-6">Joined {profileData.joinDate}</p>
                                
                                {/* Stats Row - TikTok Style */}
                                <div className="flex justify-center items-center gap-8 mb-6">
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-gray-900">
                                            {following.length}
                                        </div>
                                        <div className="text-xs text-gray-500">Following</div>
                                    </div>
                                    
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-gray-900">
                                            {profileData.followers.toLocaleString()}
                                        </div>
                                        <div className="text-xs text-gray-500">Followers</div>
                                    </div>
                                    
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-gray-900">
                                            {profileData.likes.toLocaleString()}
                                        </div>
                                        <div className="text-xs text-gray-500">Likes</div>
                                    </div>
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
            <Toaster
                position="top-left"
                reverseOrder={false}
            />
        </div>
    );
}
