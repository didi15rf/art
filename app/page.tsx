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

// Translation object
const translations = {
    english: {
        appName: "Xart",
        signIn: "Sign In",
        signUp: "Sign Up",
        email: "Email",
        password: "Password",
        username: "Username",
        phoneNumber: "Phone Number",
        home: "Home",
        categories: "Categories",
        profile: "Profile",
        settings: "Settings",
        signOut: "Sign Out",
        recommendedArtists: "Recommended Artists to Follow",
        follow: "Follow",
        following: "Following",
        artCategories: "Art Categories",
        accountSettings: "Account Settings",
        emailNotifications: "Email Notifications",
        emailNotificationsDesc: "Receive updates about new artists and artworks",
        pushNotifications: "Push Notifications",
        pushNotificationsDesc: "Get notified when artists you follow post new work",
        profileVisibility: "Profile Visibility",
        profileVisibilityDesc: "Make your profile visible to other users",
        preferences: "Preferences",
        preferredArtCategories: "Preferred Art Categories",
        language: "Language",
        dataPrivacy: "Data & Privacy",
        downloadMyData: "Download My Data",
        privacyPolicy: "Privacy Policy",
        security: "Security",
        changePassword: "Change Password",
        changePasswordDesc: "Update your account password",
        twoFactorAuth: "Two-Factor Authentication",
        twoFactorAuthDesc: "Add an extra layer of security",
        account: "Account",
        saveSettings: "Save Settings",
        deleteAccount: "Delete Account",
        accountInformation: "Account Information",
        memberSince: "Member since",
        followers: "Followers",
        likes: "Likes",
        allCategories: "All Categories",
        painting: "Painting",
        digitalArt: "Digital Art",
        photography: "Photography",
        sculpture: "Sculpture",
        joinedDate: "Joined",
        signInToDiscover: "Sign in to discover amazing art",
        createYourAccount: "Create your account",
        doNotHaveAccount: "Do not have an account?",
        alreadyHaveAccount: "Already have an account?",
        enterYourEmail: "Enter your email",
        enterYourPassword: "Enter your password",
        chooseUsername: "Choose a username",
        enterPhoneNumber: "Enter your phone number",
        createPassword: "Create a password",
        creatingAccount: "Creating your account...",
        signingIn: "Signing you in...",
        youSignIn: "You sign in!",
        languageChanged: "Hello! English has been selected",
        profileImageUpdated: "Profile image updated!",
        addPhoto: "Add Photo",
        save: "Save",
        cancel: "Cancel"
    },
    spanish: {
        appName: "Xart",
        signIn: "Iniciar Sesión",
        signUp: "Registrarse",
        email: "Correo Electrónico",
        password: "Contraseña",
        username: "Nombre de Usuario",
        phoneNumber: "Número de Teléfono",
        home: "Inicio",
        categories: "Categorías",
        profile: "Perfil",
        settings: "Configuración",
        signOut: "Cerrar Sesión",
        recommendedArtists: "Artistas Recomendados para Seguir",
        follow: "Seguir",
        following: "Siguiendo",
        artCategories: "Categorías de Arte",
        accountSettings: "Configuración de Cuenta",
        emailNotifications: "Notificaciones por Correo",
        emailNotificationsDesc: "Recibir actualizaciones sobre nuevos artistas y obras de arte",
        pushNotifications: "Notificaciones Push",
        pushNotificationsDesc: "Recibir notificaciones cuando los artistas que sigues publiquen nuevo trabajo",
        profileVisibility: "Visibilidad del Perfil",
        profileVisibilityDesc: "Hacer tu perfil visible a otros usuarios",
        preferences: "Preferencias",
        preferredArtCategories: "Categorías de Arte Preferidas",
        language: "Idioma",
        dataPrivacy: "Datos y Privacidad",
        downloadMyData: "Descargar Mis Datos",
        privacyPolicy: "Política de Privacidad",
        security: "Seguridad",
        changePassword: "Cambiar Contraseña",
        changePasswordDesc: "Actualizar la contraseña de tu cuenta",
        twoFactorAuth: "Autenticación de Dos Factores",
        twoFactorAuthDesc: "Agregar una capa adicional de seguridad",
        account: "Cuenta",
        saveSettings: "Guardar Configuración",
        deleteAccount: "Eliminar Cuenta",
        accountInformation: "Información de la Cuenta",
        memberSince: "Miembro desde",
        followers: "Seguidores",
        likes: "Me Gusta",
        allCategories: "Todas las Categorías",
        painting: "Pintura",
        digitalArt: "Arte Digital",
        photography: "Fotografía",
        sculpture: "Escultura",
        joinedDate: "Se Unió",
        signInToDiscover: "Inicia sesión para descubrir arte increíble",
        createYourAccount: "Crea tu cuenta",
        doNotHaveAccount: "¿No tienes una cuenta?",
        alreadyHaveAccount: "¿Ya tienes una cuenta?",
        enterYourEmail: "Ingresa tu correo electrónico",
        enterYourPassword: "Ingresa tu contraseña",
        chooseUsername: "Elige un nombre de usuario",
        enterPhoneNumber: "Ingresa tu número de teléfono",
        createPassword: "Crea una contraseña",
        creatingAccount: "Creando tu cuenta...",
        signingIn: "Iniciando sesión...",
        youSignIn: "¡Has iniciado sesión!",
        languageChanged: "¡Hola! Español ha sido seleccionado",
        profileImageUpdated: "¡Imagen de perfil actualizada!",
        addPhoto: "Agregar Foto",
        save: "Guardar",
        cancel: "Cancelar"
    },
    french: {
        appName: "Xart",
        signIn: "Se Connecter",
        signUp: "S'inscrire",
        email: "E-mail",
        password: "Mot de Passe",
        username: "Nom d'Utilisateur",
        phoneNumber: "Numéro de Téléphone",
        home: "Accueil",
        categories: "Catégories",
        profile: "Profil",
        settings: "Paramètres",
        signOut: "Se Déconnecter",
        recommendedArtists: "Artistes Recommandés à Suivre",
        follow: "Suivre",
        following: "Suivi",
        artCategories: "Catégories d'Art",
        accountSettings: "Paramètres du Compte",
        emailNotifications: "Notifications par E-mail",
        emailNotificationsDesc: "Recevoir des mises à jour sur les nouveaux artistes et œuvres d'art",
        pushNotifications: "Notifications Push",
        pushNotificationsDesc: "Être notifié quand les artistes que vous suivez publient de nouveaux travaux",
        profileVisibility: "Visibilité du Profil",
        profileVisibilityDesc: "Rendre votre profil visible aux autres utilisateurs",
        preferences: "Préférences",
        preferredArtCategories: "Catégories d'Art Préférées",
        language: "Langue",
        dataPrivacy: "Données et Confidentialité",
        downloadMyData: "Télécharger Mes Données",
        privacyPolicy: "Politique de Confidentialité",
        security: "Sécurité",
        changePassword: "Changer le Mot de Passe",
        changePasswordDesc: "Mettre à jour le mot de passe de votre compte",
        twoFactorAuth: "Authentification à Deux Facteurs",
        twoFactorAuthDesc: "Ajouter une couche de sécurité supplémentaire",
        account: "Compte",
        saveSettings: "Enregistrer les Paramètres",
        deleteAccount: "Supprimer le Compte",
        accountInformation: "Informations du Compte",
        memberSince: "Membre depuis",
        followers: "Abonnés",
        likes: "J'aime",
        allCategories: "Toutes les Catégories",
        painting: "Peinture",
        digitalArt: "Art Numérique",
        photography: "Photographie",
        sculpture: "Sculpture",
        joinedDate: "Rejoint",
        signInToDiscover: "Connectez-vous pour découvrir un art incroyable",
        createYourAccount: "Créez votre compte",
        doNotHaveAccount: "Vous n'avez pas de compte?",
        alreadyHaveAccount: "Vous avez déjà un compte?",
        enterYourEmail: "Entrez votre e-mail",
        enterYourPassword: "Entrez votre mot de passe",
        chooseUsername: "Choisissez un nom d'utilisateur",
        enterPhoneNumber: "Entrez votre numéro de téléphone",
        createPassword: "Créez un mot de passe",
        creatingAccount: "Création de votre compte...",
        signingIn: "Connexion en cours...",
        youSignIn: "Vous vous êtes connecté!",
        languageChanged: "Bonjour! Français a été choisi",
        profileImageUpdated: "Image de profil mise à jour!",
        addPhoto: "Ajouter une Photo",
        save: "Enregistrer",
        cancel: "Annuler"
    },
    german: {
        appName: "Xart",
        signIn: "Anmelden",
        signUp: "Registrieren",
        email: "E-Mail",
        password: "Passwort",
        username: "Benutzername",
        phoneNumber: "Telefonnummer",
        home: "Startseite",
        categories: "Kategorien",
        profile: "Profil",
        settings: "Einstellungen",
        signOut: "Abmelden",
        recommendedArtists: "Empfohlene Künstler zum Folgen",
        follow: "Folgen",
        following: "Folge ich",
        artCategories: "Kunstkategorien",
        accountSettings: "Kontoeinstellungen",
        emailNotifications: "E-Mail-Benachrichtigungen",
        emailNotificationsDesc: "Updates über neue Künstler und Kunstwerke erhalten",
        pushNotifications: "Push-Benachrichtigungen",
        pushNotificationsDesc: "Benachrichtigt werden, wenn Künstler, denen Sie folgen, neue Arbeiten veröffentlichen",
        profileVisibility: "Profil-Sichtbarkeit",
        profileVisibilityDesc: "Ihr Profil für andere Benutzer sichtbar machen",
        preferences: "Einstellungen",
        preferredArtCategories: "Bevorzugte Kunstkategorien",
        language: "Sprache",
        dataPrivacy: "Daten & Datenschutz",
        downloadMyData: "Meine Daten Herunterladen",
        privacyPolicy: "Datenschutzrichtlinie",
        security: "Sicherheit",
        changePassword: "Passwort Ändern",
        changePasswordDesc: "Ihr Konto-Passwort aktualisieren",
        twoFactorAuth: "Zwei-Faktor-Authentifizierung",
        twoFactorAuthDesc: "Eine zusätzliche Sicherheitsebene hinzufügen",
        account: "Konto",
        saveSettings: "Einstellungen Speichern",
        deleteAccount: "Konto Löschen",
        accountInformation: "Kontoinformationen",
        memberSince: "Mitglied seit",
        followers: "Follower",
        likes: "Gefällt mir",
        allCategories: "Alle Kategorien",
        painting: "Malerei",
        digitalArt: "Digitale Kunst",
        photography: "Fotografie",
        sculpture: "Skulptur",
        joinedDate: "Beigetreten",
        signInToDiscover: "Melden Sie sich an, um erstaunliche Kunst zu entdecken",
        createYourAccount: "Erstellen Sie Ihr Konto",
        doNotHaveAccount: "Haben Sie kein Konto?",
        alreadyHaveAccount: "Haben Sie bereits ein Konto?",
        enterYourEmail: "Geben Sie Ihre E-Mail ein",
        enterYourPassword: "Geben Sie Ihr Passwort ein",
        chooseUsername: "Wählen Sie einen Benutzernamen",
        enterPhoneNumber: "Geben Sie Ihre Telefonnummer ein",
        createPassword: "Erstellen Sie ein Passwort",
        creatingAccount: "Ihr Konto wird erstellt...",
        signingIn: "Sie werden angemeldet...",
        youSignIn: "Sie haben sich angemeldet!",
        languageChanged: "Hallo! Deutsch wurde ausgewählt",
        profileImageUpdated: "Profilbild aktualisiert!",
        addPhoto: "Foto Hinzufügen",
        save: "Speichern",
        cancel: "Abbrechen"
    },
    japanese: {
        appName: "Xart",
        signIn: "サインイン",
        signUp: "サインアップ",
        email: "メール",
        password: "パスワード",
        username: "ユーザー名",
        phoneNumber: "電話番号",
        home: "ホーム",
        categories: "カテゴリ",
        profile: "プロフィール",
        settings: "設定",
        signOut: "サインアウト",
        recommendedArtists: "フォローするおすすめアーティスト",
        follow: "フォロー",
        following: "フォロー中",
        artCategories: "アートカテゴリ",
        accountSettings: "アカウント設定",
        emailNotifications: "メール通知",
        emailNotificationsDesc: "新しいアーティストやアートワークの更新を受け取る",
        pushNotifications: "プッシュ通知",
        pushNotificationsDesc: "フォローしているアーティストが新しい作品を投稿したときに通知を受け取る",
        profileVisibility: "プロフィールの可視性",
        profileVisibilityDesc: "プロフィールを他のユーザーに表示する",
        preferences: "設定",
        preferredArtCategories: "好みのアートカテゴリ",
        language: "言語",
        dataPrivacy: "データとプライバシー",
        downloadMyData: "マイデータをダウンロード",
        privacyPolicy: "プライバシーポリシー",
        security: "セキュリティ",
        changePassword: "パスワード変更",
        changePasswordDesc: "アカウントのパスワードを更新",
        twoFactorAuth: "二要素認証",
        twoFactorAuthDesc: "追加のセキュリティレイヤーを追加",
        account: "アカウント",
        saveSettings: "設定を保存",
        deleteAccount: "アカウントを削除",
        accountInformation: "アカウント情報",
        memberSince: "登録日",
        followers: "フォロワー",
        likes: "いいね",
        allCategories: "すべてのカテゴリ",
        painting: "絵画",
        digitalArt: "デジタルアート",
        photography: "写真",
        sculpture: "彫刻",
        joinedDate: "参加日",
        signInToDiscover: "サインインして素晴らしいアートを発見しよう",
        createYourAccount: "アカウントを作成",
        doNotHaveAccount: "アカウントをお持ちでない場合",
        alreadyHaveAccount: "すでにアカウントをお持ちの場合",
        enterYourEmail: "メールアドレスを入力",
        enterYourPassword: "パスワードを入力",
        chooseUsername: "ユーザー名を選択",
        enterPhoneNumber: "電話番号を入力",
        createPassword: "パスワードを作成",
        creatingAccount: "アカウントを作成中...",
        signingIn: "サインイン中...",
        youSignIn: "サインインしました！",
        languageChanged: "こんにちは！日本語が選択されました",
        profileImageUpdated: "プロフィール画像が更新されました！",
        addPhoto: "写真を追加",
        save: "保存",
        cancel: "キャンセル"
    },
    chinese: {
        appName: "Xart",
        signIn: "登录",
        signUp: "注册",
        email: "邮箱",
        password: "密码",
        username: "用户名",
        phoneNumber: "电话号码",
        home: "首页",
        categories: "分类",
        profile: "个人资料",
        settings: "设置",
        signOut: "退出登录",
        recommendedArtists: "推荐关注的艺术家",
        follow: "关注",
        following: "已关注",
        artCategories: "艺术分类",
        accountSettings: "账户设置",
        emailNotifications: "邮件通知",
        emailNotificationsDesc: "接收关于新艺术家和艺术作品的更新",
        pushNotifications: "推送通知",
        pushNotificationsDesc: "当您关注的艺术家发布新作品时收到通知",
        profileVisibility: "个人资料可见性",
        profileVisibilityDesc: "让其他用户看到您的个人资料",
        preferences: "偏好设置",
        preferredArtCategories: "偏好的艺术分类",
        language: "语言",
        dataPrivacy: "数据与隐私",
        downloadMyData: "下载我的数据",
        privacyPolicy: "隐私政策",
        security: "安全",
        changePassword: "更改密码",
        changePasswordDesc: "更新您的账户密码",
        twoFactorAuth: "双重身份验证",
        twoFactorAuthDesc: "添加额外的安全层",
        account: "账户",
        saveSettings: "保存设置",
        deleteAccount: "删除账户",
        accountInformation: "账户信息",
        memberSince: "注册时间",
        followers: "关注者",
        likes: "点赞",
        allCategories: "所有分类",
        painting: "绘画",
        digitalArt: "数字艺术",
        photography: "摄影",
        sculpture: "雕塑",
        joinedDate: "加入时间",
        signInToDiscover: "登录以发现精彩艺术",
        createYourAccount: "创建您的账户",
        doNotHaveAccount: "没有账户？",
        alreadyHaveAccount: "已有账户？",
        enterYourEmail: "输入您的邮箱",
        enterYourPassword: "输入您的密码",
        chooseUsername: "选择用户名",
        enterPhoneNumber: "输入您的电话号码",
        createPassword: "创建密码",
        creatingAccount: "正在创建您的账户...",
        signingIn: "正在登录...",
        youSignIn: "您已登录！",
        languageChanged: "您好！中文已被选择",
        profileImageUpdated: "头像已更新！",
        addPhoto: "添加照片",
        save: "保存",
        cancel: "取消"
    }
};

export default function Home() {
    const [following, setFollowing] = useState<string[]>([]);
    const [currentView, setCurrentView] = useState<'home' | 'categories' | 'profile' | 'settings'>('home');
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
    const [currentLanguage, setCurrentLanguage] = useState<'english' | 'spanish' | 'french' | 'german' | 'japanese' | 'chinese'>('english');
    
    // Get current translations
    const t = translations[currentLanguage];
    
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
            setCurrentLanguage(userData.language || 'english');
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
                language: currentLanguage,
                signInDate: new Date().toISOString()
            };
            localStorage.setItem('xart-user', JSON.stringify(userData));
        }
    }, [following, customUsername, profileImage, currentLanguage, isSignedIn, isInitialized, email]);

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

    const handleLanguageChange = (language: 'english' | 'spanish' | 'french' | 'german' | 'japanese' | 'chinese') => {
        setCurrentLanguage(language);
        toast.success(translations[language].languageChanged);
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
                                <h1 className="text-4xl font-bold text-white mb-3">{t.appName}</h1>
                                <p className="text-base text-gray-300">{t.signInToDiscover}</p>
                            </div>
                            
                            <form onSubmit={handleSignIn} className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                                        {t.email}
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-3 py-3 text-base bg-white bg-opacity-20 border border-gray-300 border-opacity-30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder={t.enterYourEmail}
                                        required
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                                        {t.password}
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-3 py-3 text-base bg-white bg-opacity-20 border border-gray-300 border-opacity-30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder={t.enterYourPassword}
                                        required
                                    />
                                </div>
                                
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 text-base rounded-lg transition-colors"
                                >
                                    {t.signIn}
                                </button>
                            </form>
                            
                            <div className="mt-6 text-center">
                                <p className="text-gray-300 text-sm">
                                    {t.doNotHaveAccount}{' '}
                                    <button 
                                        onClick={() => setShowSignUp(true)}
                                        className="text-blue-400 hover:text-blue-300 underline"
                                    >
                                        {t.signUp}
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
                    <h1 className="text-xl font-bold text-white">{t.appName}</h1>
                    <nav className="flex gap-6 text-sm">
                        <a 
                            href="#" 
                            onClick={(e) => {
                                e.preventDefault();
                                setCurrentView('home');
                            }}
                            className={`font-medium ${currentView === 'home' ? 'text-white' : 'text-gray-300 hover:text-white'}`}
                        >
                            {t.home}
                        </a>
                        <a 
                            href="#" 
                            onClick={(e) => {
                                e.preventDefault();
                                setCurrentView('categories');
                            }}
                            className={`font-medium ${currentView === 'categories' ? 'text-white' : 'text-gray-300 hover:text-white'}`}
                        >
                            {t.categories}
                        </a>
                        <a 
                            href="#" 
                            onClick={(e) => {
                                e.preventDefault();
                                setCurrentView('profile');
                            }}
                            className={`font-medium ${currentView === 'profile' ? 'text-white' : 'text-gray-300 hover:text-white'}`}
                        >
                            {t.profile}
                        </a>
                        <a 
                            href="#" 
                            onClick={(e) => {
                                e.preventDefault();
                                setCurrentView('settings');
                            }}
                            className={`font-medium ${currentView === 'settings' ? 'text-white' : 'text-gray-300 hover:text-white'}`}
                        >
                            {t.settings}
                        </a>
                        <button 
                            onClick={handleSignOut}
                            className="text-gray-300 hover:text-white font-medium"
                        >
                            {t.signOut}
                        </button>
                    </nav>
                </div>
            </header>

            <div className={currentView === 'settings' ? 'p-6' : 'max-w-4xl mx-auto p-6'}>
                {currentView === 'home' ? (
                    /* Recommended Artists Section */
                    <div className="mb-8">
                        <h2 className="text-lg font-semibold text-white mb-6">{t.recommendedArtists}</h2>
                        
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
                                        {following.includes(artist.name) ? t.following : t.follow}
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
                ) : currentView === 'settings' ? (
                    /* Settings Section */
                    <div className="mb-8">
                        <h2 className="text-lg font-semibold text-white mb-6">Settings</h2>
                        
                        <div className="bg-gray-100 rounded-lg p-8 w-full">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Left Column */}
                                <div>
                                    {/* Account Settings */}
                                    <div className="mb-8">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h3>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between py-3 border-b border-gray-200">
                                                <div>
                                                    <p className="font-medium text-gray-900">Email Notifications</p>
                                                    <p className="text-sm text-gray-500">Receive updates about new artists and artworks</p>
                                                </div>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input type="checkbox" className="sr-only peer" defaultChecked />
                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                </label>
                                            </div>
                                            
                                            <div className="flex items-center justify-between py-3 border-b border-gray-200">
                                                <div>
                                                    <p className="font-medium text-gray-900">Push Notifications</p>
                                                    <p className="text-sm text-gray-500">Get notified when artists you follow post new work</p>
                                                </div>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input type="checkbox" className="sr-only peer" />
                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                </label>
                                            </div>
                                            
                                            <div className="flex items-center justify-between py-3 border-b border-gray-200">
                                                <div>
                                                    <p className="font-medium text-gray-900">Profile Visibility</p>
                                                    <p className="text-sm text-gray-500">Make your profile visible to other users</p>
                                                </div>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input type="checkbox" className="sr-only peer" defaultChecked />
                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Preferences */}
                                    <div className="mb-8">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferences</h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Preferred Art Categories
                                                </label>
                                                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                                    <option>All Categories</option>
                                                    <option>Painting</option>
                                                    <option>Digital Art</option>
                                                    <option>Photography</option>
                                                    <option>Sculpture</option>
                                                </select>
                                            </div>
                                            
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    {t.language}
                                                </label>
                                                <select 
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    value={currentLanguage}
                                                    onChange={(e) => handleLanguageChange(e.target.value as 'english' | 'spanish' | 'french' | 'german' | 'japanese' | 'chinese')}
                                                >
                                                    <option value="english">English</option>
                                                    <option value="spanish">Español</option>
                                                    <option value="french">Français</option>
                                                    <option value="german">Deutsch</option>
                                                    <option value="japanese">日本語</option>
                                                    <option value="chinese">中文</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Right Column */}
                                <div>
                                    {/* Data & Privacy */}
                                    <div className="mb-6">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Data & Privacy</h3>
                                        <div className="space-y-2">
                                            <button className="w-full text-left px-3 py-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                                                <div className="flex items-center justify-between">
                                                    <span className="font-medium text-gray-900 text-sm">Download My Data</span>
                                                    <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                            </button>
                                            
                                            <button className="w-full text-left px-3 py-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                                                <div className="flex items-center justify-between">
                                                    <span className="font-medium text-gray-900 text-sm">Privacy Policy</span>
                                                    <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                    
                                    {/* Security */}
                                    <div className="mb-8">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Security</h3>
                                        <div className="space-y-3">
                                            <button className="w-full text-left px-4 py-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                                                <div className="flex items-center justify-between">
                                                    <span className="font-medium text-gray-900">Change Password</span>
                                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                                <p className="text-sm text-gray-500 mt-1">Update your account password</p>
                                            </button>
                                            
                                            <button className="w-full text-left px-4 py-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                                                <div className="flex items-center justify-between">
                                                    <span className="font-medium text-gray-900">Two-Factor Authentication</span>
                                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                                <p className="text-sm text-gray-500 mt-1">Add an extra layer of security</p>
                                            </button>
                                        </div>
                                    </div>
                                    
                                    {/* Account Actions */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account</h3>
                                        <div className="space-y-3">
                                            <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                                                Save Settings
                                            </button>
                                            <button className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
                                                Delete Account
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Profile Section */
                    <div className="mb-8">
                        <h2 className="text-lg font-semibold text-white mb-6">{t.profile}</h2>
                        
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
                                                <p className="text-xs text-gray-500">{t.addPhoto}</p>
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
                                            placeholder={t.username}
                                        />
                                        <button
                                            onClick={handleUsernameSave}
                                            className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-xs"
                                        >
                                            {t.save}
                                        </button>
                                        <button
                                            onClick={handleUsernameCancel}
                                            className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded text-xs"
                                        >
                                            {t.cancel}
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
                                <p className="text-gray-500 text-sm mb-6">{t.joinedDate} {profileData.joinDate}</p>
                                
                                {/* Stats Row - TikTok Style */}
                                <div className="flex justify-center items-center gap-8 mb-6">
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-gray-900">
                                            {following.length}
                                        </div>
                                        <div className="text-xs text-gray-500">{t.following}</div>
                                    </div>
                                    
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-gray-900">
                                            {profileData.followers.toLocaleString()}
                                        </div>
                                        <div className="text-xs text-gray-500">{t.followers}</div>
                                    </div>
                                    
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-gray-900">
                                            {profileData.likes.toLocaleString()}
                                        </div>
                                        <div className="text-xs text-gray-500">{t.likes}</div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Additional Profile Info */}
                            <div className="mt-8 space-y-4">
                                <div className="bg-white rounded-lg p-4 shadow-sm">
                                    <h4 className="font-semibold text-gray-900 mb-2">{t.accountInformation}</h4>
                                    <div className="space-y-2 text-sm text-gray-600">
                                        <div className="flex justify-between">
                                            <span>{t.email}:</span>
                                            <span>{email}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>{t.memberSince}:</span>
                                            <span>{profileData.joinDate}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>{t.following}:</span>
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
