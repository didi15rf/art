"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

// Define proper types
interface User {
    username?: string;
    name?: string;
    email: string;
    password?: string;
    bio?: string;
    profileImage?: string;
    artworks?: number;
    followers?: number;
    following?: number;
    createdAt?: string;
}

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
    const [showUploadModal, setShowUploadModal] = useState(false);
    
    // Drawing states
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [currentTool, setCurrentTool] = useState("brush");
    const [currentColor, setCurrentColor] = useState("#ff00ff");
    const [brushSize, setBrushSize] = useState(5);
    
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

    // File upload states
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);

    // Load saved user data, sign-in status, and current page on component mount
    useEffect(() => {
        const savedUser = localStorage.getItem('xartUser');
        const savedSignInStatus = localStorage.getItem('xartSignedIn');
        
        if (savedUser && savedSignInStatus === 'true') {
            const userData = JSON.parse(savedUser);
            setUser(userData);
            setIsSignedIn(true);
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
                const img = new window.Image(); // Use window.Image instead of new Image()
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
        const users: User[] = savedUsers ? JSON.parse(savedUsers) : [];
        
        // Find user with matching email and password
        const foundUser = users.find((u: User) => 
            u.email === signInForm.email && u.password === signInForm.password
        );
        
        if (foundUser) {
            // Sign in successful
            const userData = {
                name: foundUser.username || foundUser.name || "Artist", // Support both old and new field names
                email: foundUser.email,
                bio: foundUser.bio || "Digital artist passionate about creating stunning visual experiences",
                profileImage: foundUser.profileImage || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
                artworks: foundUser.artworks || 47,
                followers: foundUser.followers || 1234,
                following: foundUser.following || 89
            };

            setUser(userData);
            setIsSignedIn(true);
            setShowSignIn(false);
            setShowProfile(true);
            setShowSignUp(false);
            setShowDrawingDesk(false);
            setSignInForm({ email: "", password: "" });
            
            // Save sign-in status and user data to localStorage
            localStorage.setItem('xartSignedIn', 'true');
            localStorage.setItem('xartUser', JSON.stringify(userData));
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
            const users: User[] = savedUsers ? JSON.parse(savedUsers) : [];
            
            // Check if email already exists
            const emailExists = users.find((u: User) => u.email === signUpForm.email);
            if (emailExists) {
                alert('Email already exists. Please use a different email or sign in.');
                return;
            }
            
            // Create new user object
            const newUser: User = {
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
                name: newUser.username || "Artist",
                email: newUser.email,
                bio: newUser.bio || "Digital artist passionate about creating stunning visual experiences",
                profileImage: newUser.profileImage || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
                artworks: newUser.artworks || 0,
                followers: newUser.followers || 0,
                following: newUser.following || 0
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
        // Clear sign-in status from localStorage
        localStorage.removeItem('xartSignedIn');
        localStorage.removeItem('xartUser');
        localStorage.removeItem('xartCurrentPage');
        
        setIsSignedIn(false);
        // Reset states...
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

    // Add this function to handle file selection
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const imageFiles = files.filter(file => file.type.startsWith('image/'));
        
        setSelectedFiles(imageFiles);
        
        // Create preview URLs
        const urls = imageFiles.map(file => URL.createObjectURL(file));
        setPreviewUrls(urls);
    };

    // Add this function to handle upload
    const handleUploadArt = () => {
        setShowUploadModal(true);
        setShowProfile(false);
        setShowSignIn(false);
        setShowSignUp(false);
        setShowDrawingDesk(false);
    };

    // Add this function to close upload modal
    const handleCloseUpload = () => {
        setShowUploadModal(false);
        // Clean up preview URLs
        previewUrls.forEach(url => URL.revokeObjectURL(url));
        setPreviewUrls([]);
        setSelectedFiles([]);
    };

    // Add this function to save uploaded art
    const handleSaveUploadedArt = () => {
        if (selectedFiles.length > 0) {
            // Here you could save to localStorage or send to a server
            alert(`Successfully uploaded ${selectedFiles.length} artwork(s)!`);
            
            // Update user's artwork count
            setUser(prev => ({
                ...prev,
                artworks: prev.artworks + selectedFiles.length
            }));
            
            handleCloseUpload();
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

    // Profile Page
    if (showProfile && isSignedIn) {
        return (
            <div className="min-h-screen p-4 sm:p-6 md:p-10 bg-gray-900">
                <style jsx>{`
                    .card-dark {
                        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
                        border-radius: 12px;
                        border: 1px solid #374151;
                    }
                    .btn-neon {
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        padding: 12px 24px;
                        border-radius: 8px;
                        font-weight: 500;
                        transition: all 0.3s ease;
                        border: none;
                        cursor: pointer;
                    }
                    .btn-neon:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
                    }
                `}</style>
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 mb-8">
                        <h1 className="text-xl sm:text-2xl font-bold text-white">Xart</h1>
                        <div className="flex gap-4">
                            <button
                                onClick={handleBackToHome}
                                className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
                            >
                                Back to Home
                            </button>
                            <button
                                onClick={handleSignOut}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>

                    {/* Profile Content */}
                    <div className="card-dark p-8">
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
                            <Image
                                src={user.profileImage}
                                alt={user.name || "User profile image"}
                                width={128}
                                height={128}
                                className="w-32 h-32 rounded-full object-cover border-4 border-purple-500"
                                loader={({ src }) => src}
                                unoptimized
                            />
                            <div className="flex-1 text-center md:text-left">
                                <h2 className="text-3xl font-bold text-white mb-2">{user.name}</h2>
                                <p className="text-gray-300 mb-4">{user.email}</p>
                                <p className="text-gray-400 mb-6">{user.bio}</p>
                                
                                <div className="grid grid-cols-3 gap-4 max-w-md mx-auto md:mx-0">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-purple-400">{user.artworks}</div>
                                        <div className="text-gray-400 text-sm">Artworks</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-blue-400">{user.followers}</div>
                                        <div className="text-gray-400 text-sm">Followers</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-green-400">{user.following}</div>
                                        <div className="text-gray-400 text-sm">Following</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <button className="btn-neon">Edit Profile</button>
                            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                                Upload Art
                            </button>
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                                My Gallery
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Sign In Modal
    if (showSignIn) {
        return (
            <div className="min-h-screen p-4 sm:p-6 md:p-10 flex items-center justify-center bg-gray-900">
                <style jsx>{`
                    .card-dark {
                        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
                        border-radius: 12px;
                        border: 1px solid #374151;
                    }
                    .btn-neon {
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        padding: 12px 24px;
                        border-radius: 8px;
                        font-weight: 500;
                        transition: all 0.3s ease;
                        border: none;
                        cursor: pointer;
                        width: 100%;
                    }
                    .btn-neon:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
                    }
                `}</style>
                <div className="card-dark p-8 w-full max-w-md">
                    <h2 className="text-2xl font-bold text-white mb-6 text-center">Sign In to Xart</h2>
                    
                    <form onSubmit={handleSignIn} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                            <input
                                type="email"
                                value={signInForm.email}
                                onChange={(e) => setSignInForm({...signInForm, email: e.target.value})}
                                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                                style={{ color: 'white' }}
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                            <input
                                type="password"
                                value={signInForm.password}
                                onChange={(e) => setSignInForm({...signInForm, password: e.target.value})}
                                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                                style={{ color: 'white' }}
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        
                        <button
                            type="submit"
                            className="btn-neon"
                        >
                            Sign In
                        </button>
                    </form>
                    
                    <div className="mt-6 text-center">
                        <p className="text-gray-400">Don&apos;t have an account?</p>
                        <button
                            onClick={() => {
                                setShowSignIn(false);
                                setShowSignUp(true);
                                setShowProfile(false);
                                setShowDrawingDesk(false);
                            }}
                            className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg font-medium transition-colors mt-2"
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Sign Up Modal
    if (showSignUp) {
        return (
            <div className="min-h-screen p-4 sm:p-6 md:p-10 flex items-center justify-center bg-gray-900">
                <style jsx>{`
                    .card-dark {
                        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
                        border-radius: 12px;
                        border: 1px solid #374151;
                    }
                    .btn-neon {
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        padding: 12px 24px;
                        border-radius: 8px;
                        font-weight: 500;
                        transition: all 0.3s ease;
                        border: none;
                        cursor: pointer;
                        width: 100%;
                    }
                    .btn-neon:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
                    }
                `}</style>
                <div className="card-dark p-8 w-full max-w-md">
                    <h2 className="text-2xl font-bold text-white mb-6 text-center">Join Xart</h2>
                    
                    <form onSubmit={handleSignUp} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                            <input
                                type="text"
                                value={signUpForm.username}
                                onChange={(e) => setSignUpForm({...signUpForm, username: e.target.value})}
                                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                                style={{ color: 'white' }}
                                placeholder="Enter your username"
                                required
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                            <input
                                type="email"
                                value={signUpForm.email}
                                onChange={(e) => setSignUpForm({...signUpForm, email: e.target.value})}
                                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                                style={{ color: 'white' }}
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                            <input
                                type="password"
                                value={signUpForm.password}
                                onChange={(e) => setSignUpForm({...signUpForm, password: e.target.value})}
                                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                                style={{ color: 'white' }}
                                placeholder="Create a password"
                                required
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
                            <input
                                type="password"
                                value={signUpForm.confirmPassword}
                                onChange={(e) => setSignUpForm({...signUpForm, confirmPassword: e.target.value})}
                                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                                style={{ color: 'white' }}
                                placeholder="Confirm your password"
                                required
                            />
                        </div>
                        
                        <button
                            type="submit"
                            className="btn-neon"
                        >
                            Sign Up
                        </button>
                    </form>
                    
                    <div className="mt-6 text-center">
                        <p className="text-gray-400">Already have an account?</p>
                        <button
                            onClick={() => {
                                setShowSignUp(false);
                                setShowSignIn(true);
                                setShowProfile(false);
                                setShowDrawingDesk(false);
                            }}
                            className="text-purple-400 hover:text-purple-300 font-medium"
                        >
                            Sign In
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Upload Art Modal
    if (showUploadModal) {
        return (
            <div className="min-h-screen p-4 sm:p-6 md:p-10 bg-gray-900">
                <style jsx>{`
                    .card-dark {
                        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
                        border-radius: 12px;
                        border: 1px solid #374151;
                    }
                    .btn-neon {
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        padding: 12px 24px;
                        border-radius: 8px;
                        font-weight: 500;
                        transition: all 0.3s ease;
                        border: none;
                        cursor: pointer;
                    }
                    .btn-neon:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
                    }
                    .image-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                        gap: 1rem;
                        max-height: 60vh;
                        overflow-y: auto;
                    }
                    .image-preview {
                        position: relative;
                        border-radius: 8px;
                        overflow: hidden;
                        border: 2px solid #374151;
                        transition: border-color 0.3s;
                    }
                    .image-preview:hover {
                        border-color: #667eea;
                    }
                    .image-preview img {
                        width: 100%;
                        height: 150px;
                        object-fit: cover;
                    }
                    .file-info {
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        background: linear-gradient(transparent, rgba(0,0,0,0.8));
                        color: white;
                        padding: 8px;
                        font-size: 12px;
                    }
                `}</style>
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 mb-8">
                        <h1 className="text-xl sm:text-2xl font-bold text-white">Upload Your Art</h1>
                        <button
                            onClick={handleCloseUpload}
                            className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
                        >
                            Back
                        </button>
                    </div>

                    {/* Upload Section */}
                    <div className="card-dark p-8">
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-bold text-white mb-4">Select Your Artwork</h2>
                            <p className="text-gray-400 mb-6">Choose multiple images from your computer</p>
                            
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleFileSelect}
                                className="hidden"
                                id="art-upload"
                            />
                            <label
                                htmlFor="art-upload"
                                className="btn-neon cursor-pointer inline-block"
                            >
                                📁 Browse Images
                            </label>
                        </div>

                        {/* Preview Section */}
                        {previewUrls.length > 0 && (
                            <div>
                                <h3 className="text-xl font-bold text-white mb-4">
                                    Selected Images ({selectedFiles.length})
                                </h3>
                                <div className="image-grid">
                                    {previewUrls.map((url, index) => (
                                        <div key={index} className="image-preview">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={url} alt={`Preview ${index + 1}`} />
                                            <div className="file-info">
                                                <div className="font-semibold">
                                                    {selectedFiles[index].name}
                                                </div>
                                                <div className="text-gray-300">
                                                    {(selectedFiles[index].size / 1024 / 1024).toFixed(2)} MB
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="flex gap-4 mt-6 justify-center">
                                    <button
                                        onClick={handleSaveUploadedArt}
                                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                                    >
                                        ✅ Upload {selectedFiles.length} Artwork{selectedFiles.length !== 1 ? 's' : ''}
                                    </button>
                                    <button
                                        onClick={handleCloseUpload}
                                        className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Upload Tips */}
                        <div className="mt-8 p-4 bg-gray-800 rounded-lg">
                            <h4 className="text-lg font-semibold text-purple-400 mb-2">Upload Tips</h4>
                            <ul className="text-gray-300 text-sm space-y-1">
                                <li>• Supported formats: JPG, PNG, GIF, WebP</li>
                                <li>• Multiple files can be selected at once</li>
                                <li>• Maximum file size: 10MB per image</li>
                                <li>• High resolution images are recommended</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Main Home Page (add CSS styles here too)
    return (
        <div className="min-h-screen bg-gray-900">
            <style jsx>{`
                .card-dark {
                    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
                    border-radius: 12px;
                    border: 1px solid #374151;
                }
                .btn-neon {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 8px 16px;
                    border-radius: 8px;
                    font-weight: 500;
                    transition: all 0.3s ease;
                    border: none;
                    cursor: pointer;
                }
                .btn-neon:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
                }
            `}</style>
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
                            <div key={artist.name} className="flex flex-col items-center bg-gray-800 rounded-lg p-6">
                                <Image
                                    src={artist.img}
                                    alt={artist.name}
                                    width={80}
                                    height={80}
                                    className="w-20 h-20 rounded-full object-cover border-4 border-purple-500 mb-4"
                                    loader={({ src }) => src}
                                    unoptimized
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
                            <button className="btn-neon" onClick={handleUploadArt}>
                                Upload Art
                            </button>
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
