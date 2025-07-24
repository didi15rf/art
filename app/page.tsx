"use client";

import { useState, useRef, useEffect } from "react";

const artists = [
    {
        name: "Artist Name 1",
        bio: "Short bio about artist 1",
        img: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    },
    {
        name: "Artist Name 2",
        bio: "Short bio about artist 2",
        img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    {
        name: "Artist Name 3",
        bio: "Short bio about artist 3",
        img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    },
    {
        name: "Artist Name 4",
        bio: "Short bio about artist 4",
        img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
    {
        name: "Artist Name 5",
        bio: "Short bio about artist 5",
        img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    },
    {
        name: "Artist Name 6",
        bio: "Short bio about artist 6",
        img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    },
];

const artCategories = [
    "Painting",
    "Drawing Desk", 
    "Photography",
    "Digital Art",
    "Illustration",
    "Mixed Media",
    "Anime Art",
    "Discord Server"
];

export default function Home() {
    const [following, setFollowing] = useState<string[]>([]);
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [showSignIn, setShowSignIn] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [showDrawingDesk, setShowDrawingDesk] = useState(false);
    
    // Drawing states
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [currentTool, setCurrentTool] = useState("brush");
    const [currentColor, setCurrentColor] = useState("#ff00ff");
    const [brushSize, setBrushSize] = useState(5);
    const [canvasHistory, setCanvasHistory] = useState<string[]>([]);
    
    // User profile data
    const [user, setUser] = useState({
        name: "John Artist",
        email: "john@xart.com",
        bio: "Digital artist passionate about creating stunning visual experiences",
        profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        artworks: 47,
        followers: 1234,
        following: 89
    });

    // Sign in form
    const [signInForm, setSignInForm] = useState({
        email: "",
        password: ""
    });

    // Sign up form
    const [signUpForm, setSignUpForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    // Load saved user data, sign-in status, and current page on component mount
    useEffect(() => {
        const savedUser = localStorage.getItem('xartUser');
        const savedSignInStatus = localStorage.getItem('xartSignedIn');
        const savedFollowing = localStorage.getItem('xartFollowing');
        const savedCurrentPage = localStorage.getItem('xartCurrentPage');
        
        if (savedUser && savedSignInStatus === 'true') {
            const userData = JSON.parse(savedUser);
            setUser(userData);
            setIsSignedIn(true);
        }
        
        if (savedFollowing) {
            setFollowing(JSON.parse(savedFollowing));
        }

        // Restore the page state
        if (savedCurrentPage) {
            const pageState = JSON.parse(savedCurrentPage);
            setShowProfile(pageState.showProfile || false);
            setShowSignIn(pageState.showSignIn || false);
            setShowSignUp(pageState.showSignUp || false);
            setShowDrawingDesk(pageState.showDrawingDesk || false);
        }
    }, []);

    // Save following list to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('xartFollowing', JSON.stringify(following));
    }, [following]);

    // Save current page state whenever it changes
    useEffect(() => {
        const currentPageState = {
            showProfile,
            showSignIn,
            showSignUp,
            showDrawingDesk
        };
        localStorage.setItem('xartCurrentPage', JSON.stringify(currentPageState));
    }, [showProfile, showSignIn, showSignUp, showDrawingDesk]);

    // Drawing functions
    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        setIsDrawing(true);
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set up drawing properties
        ctx.lineWidth = brushSize;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        switch (currentTool) {
            case 'brush':
                ctx.globalCompositeOperation = 'source-over';
                ctx.strokeStyle = currentColor;
                ctx.globalAlpha = 0.8;
                break;
            case 'pencil':
                ctx.globalCompositeOperation = 'source-over';
                ctx.strokeStyle = currentColor;
                ctx.globalAlpha = 1;
                ctx.lineWidth = Math.max(1, brushSize / 2);
                break;
            case 'pen':
                ctx.globalCompositeOperation = 'source-over';
                ctx.strokeStyle = currentColor;
                ctx.globalAlpha = 1;
                ctx.lineWidth = Math.max(2, brushSize);
                break;
            case 'eraser':
                ctx.globalCompositeOperation = 'destination-out';
                ctx.globalAlpha = 1;
                break;
        }

        ctx.beginPath();
        ctx.moveTo(x, y);
    };

    const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Continue the line to the current mouse position
        ctx.lineTo(x, y);
        ctx.stroke();
    };

    const stopDrawing = () => {
        if (!isDrawing) return;
        setIsDrawing(false);
        
        // End the current path
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.beginPath(); // Start a new path for the next drawing
            }
            
            // Save canvas state for undo functionality
            const dataURL = canvas.toDataURL();
            setCanvasHistory(prev => [...prev, dataURL]);
        }
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Fill with white background
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const saveDrawing = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const link = document.createElement('a');
        link.download = `xart-drawing-${Date.now()}.png`;
        link.href = canvas.toDataURL();
        link.click();
    };

    const loadDrawing = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = canvasRef.current;
                    if (!canvas) return;

                    const ctx = canvas.getContext('2d');
                    if (!ctx) return;

                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                };
                img.src = event.target?.result as string;
            };
            reader.readAsDataURL(file);
        };
        input.click();
    };

    // Initialize canvas
    useEffect(() => {
        if (showDrawingDesk && canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                // Set white background
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }
        }
    }, [showDrawingDesk]);

    const handleFollow = (name: string) => {
        setFollowing((prev) =>
            prev.includes(name)
                ? prev.filter((n) => n !== name)
                : [...prev, name]
        );
    };

    const handleProfileClick = () => {
        if (isSignedIn) {
            setShowProfile(true);
            setShowSignIn(false);
            setShowSignUp(false);
            setShowDrawingDesk(false);
        } else {
            setShowSignIn(true);
            setShowProfile(false);
            setShowSignUp(false);
            setShowDrawingDesk(false);
        }
    };

    const handleSignIn = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Get saved users from localStorage
        const savedUsers = localStorage.getItem('xartUsers');
        const users = savedUsers ? JSON.parse(savedUsers) : [];
        
        // Find user with matching email and password
        const foundUser = users.find((u: any) => 
            u.email === signInForm.email && u.password === signInForm.password
        );
        
        if (foundUser) {
            // Sign in successful
            setUser({
                name: foundUser.username || foundUser.name, // Support both old and new field names
                email: foundUser.email,
                bio: foundUser.bio || "Digital artist passionate about creating stunning visual experiences",
                profileImage: foundUser.profileImage || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
                artworks: foundUser.artworks || 47,
                followers: foundUser.followers || 1234,
                following: foundUser.following || 89
            });
            setIsSignedIn(true);
            setShowSignIn(false);
            setShowProfile(true);
            setShowSignUp(false);
            setShowDrawingDesk(false);
            setSignInForm({ email: "", password: "" });
            
            // Save sign-in status and current user
            localStorage.setItem('xartSignedIn', 'true');
            localStorage.setItem('xartUser', JSON.stringify({
                name: foundUser.username || foundUser.name,
                email: foundUser.email,
                bio: foundUser.bio || "Digital artist passionate about creating stunning visual experiences",
                profileImage: foundUser.profileImage || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
                artworks: foundUser.artworks || 47,
                followers: foundUser.followers || 1234,
                following: foundUser.following || 89
            }));
        } else {
            // Sign in failed
            alert('Invalid email or password. Please try again.');
        }
    };

    const handleSignUp = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Simple validation
        if (signUpForm.username && signUpForm.email && signUpForm.password && 
            signUpForm.password === signUpForm.confirmPassword) {
            
            // Get existing users from localStorage
            const savedUsers = localStorage.getItem('xartUsers');
            const users = savedUsers ? JSON.parse(savedUsers) : [];
            
            // Check if email already exists
            const emailExists = users.find((u: any) => u.email === signUpForm.email);
            if (emailExists) {
                alert('Email already exists. Please use a different email or sign in.');
                return;
            }
            
            // Create new user object
            const newUser = {
                username: signUpForm.username,
                email: signUpForm.email,
                password: signUpForm.password,
                bio: "Digital artist passionate about creating stunning visual experiences",
                profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
                artworks: 0,
                followers: 0,
                following: 0,
                createdAt: new Date().toISOString()
            };
            
            // Add new user to users array and save to localStorage
            users.push(newUser);
            localStorage.setItem('xartUsers', JSON.stringify(users));
            
            // Set current user
            setUser({
                name: newUser.username,
                email: newUser.email,
                bio: newUser.bio,
                profileImage: newUser.profileImage,
                artworks: newUser.artworks,
                followers: newUser.followers,
                following: newUser.following
            });
            
            setIsSignedIn(true);
            setShowSignUp(false);
            setShowProfile(true);
            setShowSignIn(false);
            setShowDrawingDesk(false);
            setSignUpForm({ username: "", email: "", password: "", confirmPassword: "" });
            
            // Save sign-in status and current user
            localStorage.setItem('xartSignedIn', 'true');
            localStorage.setItem('xartUser', JSON.stringify({
                name: newUser.username,
                email: newUser.email,
                bio: newUser.bio,
                profileImage: newUser.profileImage,
                artworks: newUser.artworks,
                followers: newUser.followers,
                following: newUser.following
            }));
            
        } else {
            alert('Please fill in all fields and make sure passwords match.');
        }
    };

    const handleSignOut = () => {
        setIsSignedIn(false);
        setShowProfile(false);
        setShowSignIn(false);
        setShowSignUp(false);
        setShowDrawingDesk(false);
        
        // Clear sign-in status from localStorage
        localStorage.removeItem('xartSignedIn');
        localStorage.removeItem('xartUser');
        localStorage.removeItem('xartCurrentPage'); // Clear page state
        
        // Reset user to default
        setUser({
            name: "John Artist",
            email: "john@xart.com",
            bio: "Digital artist passionate about creating stunning visual experiences",
            profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
            artworks: 47,
            followers: 1234,
            following: 89
        });
    };

    const handleBackToHome = () => {
        setShowProfile(false);
        setShowSignIn(false);
        setShowSignUp(false);
        setShowDrawingDesk(false);
    };

    const handleHomeClick = () => {
        setShowProfile(false);
        setShowSignIn(false);
        setShowSignUp(false);
        setShowDrawingDesk(false);
    };

    const handleCategoryClick = (category: string) => {
        if (category === "Discord Server") {
            window.open("https://discord.gg/Rscu8NWh", "_blank");
        } else if (category === "Drawing Desk") {
            setShowDrawingDesk(true);
            setShowProfile(false);
            setShowSignIn(false);
            setShowSignUp(false);
        } else {
            // Handle other categories
            console.log(`Clicked on ${category}`);
        }
    };

    // Drawing Desk Page
    if (showDrawingDesk) {
        return (
            <div className="min-h-screen p-4 sm:p-6 md:p-10 bg-gray-900">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="nav-container flex items-center justify-between p-4 mb-8">
                        <h1 className="xart-title text-xl sm:text-2xl font-bold text-white">Xart - Drawing Desk</h1>
                        <button
                            onClick={handleBackToHome}
                            className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
                        >
                            Back to Home
                        </button>
                    </div>

                    {/* Drawing Tools */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Toolbar */}
                        <div className="lg:col-span-1">
                            <div className="card-dark p-6 space-y-6">
                                <h3 className="text-xl font-bold text-white mb-4">Drawing Tools</h3>
                                
                                {/* Brush Tools */}
                                <div>
                                    <h4 className="text-lg font-semibold text-purple-400 mb-3">Brushes</h4>
                                    <div className="grid grid-cols-2 gap-2">
                                        <button 
                                            onClick={() => setCurrentTool('brush')}
                                            className={`text-sm py-2 px-3 rounded transition-colors ${
                                                currentTool === 'brush' ? 'btn-neon' : 'bg-gray-700 hover:bg-gray-600 text-white'
                                            }`}
                                        >
                                            🖌️ Brush
                                        </button>
                                        <button 
                                            onClick={() => setCurrentTool('pencil')}
                                            className={`text-sm py-2 px-3 rounded transition-colors ${
                                                currentTool === 'pencil' ? 'btn-neon' : 'bg-gray-700 hover:bg-gray-600 text-white'
                                            }`}
                                        >
                                            ✏️ Pencil
                                        </button>
                                        <button 
                                            onClick={() => setCurrentTool('pen')}
                                            className={`text-sm py-2 px-3 rounded transition-colors ${
                                                currentTool === 'pen' ? 'btn-neon' : 'bg-gray-700 hover:bg-gray-600 text-white'
                                            }`}
                                        >
                                            🖊️ Pen
                                        </button>
                                        <button 
                                            onClick={() => setCurrentTool('eraser')}
                                            className={`text-sm py-2 px-3 rounded transition-colors ${
                                                currentTool === 'eraser' ? 'btn-neon' : 'bg-gray-700 hover:bg-gray-600 text-white'
                                            }`}
                                        >
                                            🧽 Eraser
                                        </button>
                                    </div>
                                </div>

                                {/* Colors */}
                                <div>
                                    <h4 className="text-lg font-semibold text-purple-400 mb-3">Colors</h4>
                                    <div className="grid grid-cols-4 gap-2">
                                        {[
                                            '#000000', '#ff0000', '#0000ff', '#00ff00',
                                            '#ffff00', '#ff00ff', '#ffc0cb', '#ffa500'
                                        ].map((color) => (
                                            <div
                                                key={color}
                                                onClick={() => setCurrentColor(color)}
                                                className={`w-8 h-8 rounded cursor-pointer border-2 transition-all ${
                                                    currentColor === color ? 'border-white scale-110' : 'border-gray-400'
                                                }`}
                                                style={{ backgroundColor: color }}
                                            />
                                        ))}
                                    </div>
                                    <div className="mt-3">
                                        <input
                                            type="color"
                                            value={currentColor}
                                            onChange={(e) => setCurrentColor(e.target.value)}
                                            className="w-full h-8 rounded border border-gray-600"
                                        />
                                    </div>
                                </div>

                                {/* Brush Size */}
                                <div>
                                    <h4 className="text-lg font-semibold text-purple-400 mb-3">Brush Size</h4>
                                    <input
                                        type="range"
                                        min="1"
                                        max="50"
                                        value={brushSize}
                                        onChange={(e) => setBrushSize(Number(e.target.value))}
                                        className="w-full"
                                    />
                                    <div className="text-gray-300 text-sm mt-1">Size: {brushSize}px</div>
                                    <div 
                                        className="mt-2 mx-auto rounded-full border border-gray-400"
                                        style={{
                                            width: `${Math.min(brushSize, 30)}px`,
                                            height: `${Math.min(brushSize, 30)}px`,
                                            backgroundColor: currentColor
                                        }}
                                    />
                                </div>

                                {/* Actions */}
                                <div className="space-y-2">
                                    <button 
                                        onClick={saveDrawing}
                                        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition-colors"
                                    >
                                        💾 Save Drawing
                                    </button>
                                    <button 
                                        onClick={loadDrawing}
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition-colors"
                                    >
                                        📁 Load Drawing
                                    </button>
                                    <button 
                                        onClick={clearCanvas}
                                        className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded transition-colors"
                                    >
                                        🗑️ Clear Canvas
                                    </button>
                                </div>

                                {/* Current Tool Display */}
                                <div className="bg-gray-800 p-3 rounded">
                                    <div className="text-sm text-gray-300">Current Tool:</div>
                                    <div className="text-lg font-bold text-purple-400 capitalize">{currentTool}</div>
                                    <div className="text-sm text-gray-300">Color: {currentColor}</div>
                                    <div className="text-sm text-gray-300">Size: {brushSize}px</div>
                                </div>
                            </div>
                        </div>

                        {/* Canvas Area */}
                        <div className="lg:col-span-3">
                            <div className="card-dark p-6">
                                <div className="bg-gray-700 rounded-lg border-4 border-gray-600">
                                    <canvas
                                        ref={canvasRef}
                                        width="800"
                                        height="600"
                                        className="w-full h-full rounded cursor-crosshair bg-white"
                                        onMouseDown={startDrawing}
                                        onMouseMove={draw}
                                        onMouseUp={stopDrawing}
                                        onMouseLeave={stopDrawing}
                                        style={{ touchAction: 'none' }}
                                    />
                                </div>
                                <div className="mt-4 text-center text-gray-300 text-sm">
                                    Click and drag to draw • The line will follow your mouse continuously
                                </div>
                            </div>
                        </div>
                    </div>
                        
                    {/* Quick Resources */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                        <div className="card-dark p-6 text-center">
                            <h3 className="text-lg font-bold text-white mb-3">📚 Tutorials</h3>
                            <p className="text-gray-300 mb-4">Learn drawing techniques and tips</p>
                            <button className="btn-neon">Browse Tutorials</button>
                        </div>
                        
                        <div className="card-dark p-6 text-center">
                            <h3 className="text-lg font-bold text-white mb-3">🎨 Color Palettes</h3>
                            <p className="text-gray-300 mb-4">Discover beautiful color combinations</p>
                            <button className="btn-neon">View Palettes</button>
                        </div>
                        
                        <div className="card-dark p-6 text-center">
                            <h3 className="text-lg font-bold text-white mb-3">🖼️ Gallery</h3>
                            <p className="text-gray-300 mb-4">Get inspired by other artists</p>
                            <button className="btn-neon">Explore Gallery</button>
                        </div>
                    </div>
                        
                    {/* Drawing Tips */}
                    <div className="card-dark p-6 mt-8">
                        <h3 className="text-xl font-bold text-white mb-4">🎯 Quick Drawing Tips</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
                            <div className="flex items-start space-x-3">
                                <span className="text-purple-400 font-bold">1.</span>
                                <span>Start with basic shapes to build your drawing foundation</span>
                            </div>
                            <div className="flex items-start space-x-3">
                                <span className="text-purple-400 font-bold">2.</span>
                                <span>Use layers to separate different elements of your artwork</span>
                            </div>
                            <div className="flex items-start space-x-3">
                                <span className="text-purple-400 font-bold">3.</span>
                                <span>Practice gesture drawing to improve your line confidence</span>
                            </div>
                            <div className="flex items-start space-x-3">
                                <span className="text-purple-400 font-bold">4.</span>
                                <span>Study light and shadow to add depth to your drawings</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Main Home Page
    return (
        <div className="min-h-screen bg-gray-900">
            {/* Header */}
            <div className="bg-gray-800 shadow-sm border-b border-gray-700">
                <div className="max-w-6xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <h1 className="text-2xl font-bold text-white">Xart</h1>
                            <input
                                type="text"
                                placeholder="Search artists, artworks..."
                                className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none w-64"
                                style={{ color: 'white' }}
                            />
                        </div>
                        <nav className="flex gap-6">
                            <button 
                                onClick={handleHomeClick}
                                className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
                            >
                                Home
                            </button>
                            <a href="#" className="text-gray-300 hover:text-white transition-colors">Categories</a>
                            <button 
                                onClick={handleProfileClick}
                                className="text-gray-300 hover:text-white font-medium transition-colors"
                            >
                                Profile
                            </button>
                        </nav>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Featured Artists */}
                <div className="card-dark p-8 mb-8">
                    <h2 className="text-2xl font-bold text-white mb-6">Featured Artists</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {artists.map((artist) => (
                            <div key={artist.name} className="bg-gray-800 rounded-lg p-6 flex flex-col items-center">
                                <img
                                    src={artist.img}
                                    alt={artist.name}
                                    className="w-20 h-20 rounded-full object-cover border-4 border-purple-500 mb-4"
                                />
                                <h3 className="text-lg font-bold text-white mb-1">{artist.name}</h3>
                                <p className="text-gray-400 text-sm mb-3 text-center">{artist.bio}</p>
                                <button
                                    onClick={() => handleFollow(artist.name)}
                                    className={`px-4 py-2 rounded transition-colors font-medium ${
                                        following.includes(artist.name)
                                            ? "bg-green-600 hover:bg-green-700 text-white"
                                            : "bg-blue-600 hover:bg-blue-700 text-white"
                                    }`}
                                >
                                    {following.includes(artist.name) ? "Following" : "Follow"}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Categories */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-6">Explore Categories</h2>
                    <div className="flex flex-wrap gap-3">
                        {artCategories.map((category) => (
                            <button
                                key={category}
                                onClick={() => handleCategoryClick(category)}
                                className="btn-neon"
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Community Section */}
                <div className="card-dark p-8 mb-8">
                    <h2 className="text-2xl font-bold text-white mb-6">Join the Community</h2>
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-purple-400 mb-2">Share your art</h3>
                            <p className="text-gray-300 mb-4">
                                Upload your artwork and get feedback from fellow artists. Inspire and be inspired!
                            </p>
                            <button className="btn-neon">Upload Art</button>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-purple-400 mb-2">Join our Discord</h3>
                            <p className="text-gray-300 mb-4">
                                Connect with artists, join challenges, and participate in live events.
                            </p>
                            <button
                                className="btn-neon"
                                onClick={() => window.open("https://discord.gg/Rscu8NWh", "_blank")}
                            >
                                Join Discord
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="text-center text-gray-500 mt-12">
                    &copy; {new Date().getFullYear()} Xart. All rights reserved.
                </footer>
            </div>
        </div>
    );
}
