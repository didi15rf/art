"use client";

import { useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const artists = [
    {
        name: "Sakura Anime",
        bio: "Anime and manga artist specializing in character design and storytelling",
        categories: ["Digital Art", "Illustration", "Anime"],
        followers: "15.2K",
        artworks: 89,
        joinDate: "March 2023",
        location: "Tokyo, Japan",
        artworkGallery: [
            { title: "Cherry Blossom Warrior", likes: 2340, comments: 156, type: "Digital Art" },
            { title: "Moonlight Serenade", likes: 1890, comments: 234, type: "Illustration" },
            { title: "Dragon Academy", likes: 3421, comments: 287, type: "Anime" },
            { title: "Mystic Forest Guardian", likes: 1567, comments: 123, type: "Digital Art" },
            { title: "Sunset Dreams", likes: 2109, comments: 189, type: "Illustration" },
            { title: "Cyber Samurai", likes: 2876, comments: 245, type: "Anime" }
        ]
    },
    {
        name: "Urban Sketcher",
        bio: "Street art and urban photography capturing city life",
        categories: ["Street Art", "Photography"],
        followers: "8.7K",
        artworks: 124,
        joinDate: "June 2022",
        location: "New York, USA",
        artworkGallery: [
            { title: "Brooklyn Bridge Shadows", likes: 1234, comments: 89, type: "Photography" },
            { title: "Subway Stories", likes: 987, comments: 156, type: "Street Art" },
            { title: "Urban Jungle", likes: 1456, comments: 234, type: "Photography" },
            { title: "City Lights", likes: 1876, comments: 167, type: "Street Art" }
        ]
    },
    {
        name: "Nature Painter",
        bio: "Traditional landscape paintings inspired by natural beauty",
        categories: ["Painting", "Nature"],
        followers: "12.4K",
        artworks: 67,
        joinDate: "January 2023",
        location: "Oregon, USA",
        artworkGallery: [
            { title: "Mountain Sunrise", likes: 2345, comments: 198, type: "Painting" },
            { title: "Forest Stream", likes: 1789, comments: 145, type: "Painting" },
            { title: "Ocean Waves", likes: 2567, comments: 234, type: "Painting" },
            { title: "Desert Bloom", likes: 1456, comments: 167, type: "Painting" }
        ]
    },
    {
        name: "Digital Dreams",
        bio: "Futuristic digital compositions and sci-fi environments",
        categories: ["Digital Art", "Sci-Fi"],
        followers: "22.1K",
        artworks: 156,
        joinDate: "August 2022",
        location: "London, UK",
        artworkGallery: [
            { title: "Neon Cityscape", likes: 3456, comments: 289, type: "Digital Art" },
            { title: "Space Station Alpha", likes: 2890, comments: 234, type: "Sci-Fi" },
            { title: "Cyberpunk Streets", likes: 4123, comments: 456, type: "Digital Art" },
            { title: "Alien Landscape", likes: 2345, comments: 178, type: "Sci-Fi" }
        ]
    },
    {
        name: "Clay Master",
        bio: "Contemporary sculpture artist working with various materials",
        categories: ["Sculpture", "Crafts"],
        followers: "6.8K",
        artworks: 43,
        joinDate: "November 2022",
        location: "Florence, Italy",
        artworkGallery: [
            { title: "Abstract Form #1", likes: 876, comments: 67, type: "Sculpture" },
            { title: "Human Expression", likes: 1234, comments: 89, type: "Sculpture" },
            { title: "Nature's Dance", likes: 987, comments: 56, type: "Crafts" },
            { title: "Modern Geometry", likes: 1567, comments: 123, type: "Sculpture" }
        ]
    },
    {
        name: "Photo Explorer",
        bio: "Travel and portrait photography around the world",
        categories: ["Photography", "Travel"],
        followers: "18.9K",
        artworks: 203,
        joinDate: "April 2022",
        location: "Barcelona, Spain",
        artworkGallery: [
            { title: "Himalayan Peaks", likes: 2890, comments: 234, type: "Travel" },
            { title: "Street Portrait", likes: 1567, comments: 123, type: "Photography" },
            { title: "Golden Hour", likes: 3245, comments: 289, type: "Photography" },
            { title: "Ancient Ruins", likes: 1876, comments: 156, type: "Travel" }
        ]
    },
    {
        name: "Manga Creator",
        bio: "Original manga and character design for stories and games",
        categories: ["Illustration", "Anime", "Digital Art"],
        followers: "25.3K",
        artworks: 134,
        joinDate: "February 2023",
        location: "Osaka, Japan",
        artworkGallery: [
            { title: "Hero's Journey", likes: 4567, comments: 456, type: "Manga" },
            { title: "Character Sheet #1", likes: 2345, comments: 234, type: "Character Design" },
            { title: "Battle Scene", likes: 3890, comments: 345, type: "Digital Art" },
            { title: "Emotional Moment", likes: 2876, comments: 267, type: "Illustration" }
        ]
    },
    {
        name: "Abstract Vision",
        bio: "Modern abstract paintings exploring color and form",
        categories: ["Painting", "Abstract"],
        followers: "9.2K",
        artworks: 78,
        joinDate: "September 2022",
        location: "Berlin, Germany",
        artworkGallery: [
            { title: "Color Symphony", likes: 1567, comments: 123, type: "Abstract" },
            { title: "Emotional Waves", likes: 2234, comments: 178, type: "Painting" },
            { title: "Geometric Dreams", likes: 1876, comments: 145, type: "Abstract" },
            { title: "Flow State", likes: 1456, comments: 89, type: "Painting" }
        ]
    },
    {
        name: "Street Muralist",
        bio: "Large scale street murals and public art installations",
        categories: ["Street Art", "Murals"],
        followers: "14.6K",
        artworks: 56,
        joinDate: "May 2022",
        location: "Los Angeles, USA",
        artworkGallery: [
            { title: "Unity Mural", likes: 2345, comments: 234, type: "Murals" },
            { title: "Community Voices", likes: 1876, comments: 156, type: "Street Art" },
            { title: "Hope Rising", likes: 3456, comments: 289, type: "Murals" },
            { title: "Urban Stories", likes: 1567, comments: 123, type: "Street Art" }
        ]
    },
    {
        name: "Craft Artisan",
        bio: "Handmade pottery, jewelry and traditional crafts",
        categories: ["Crafts", "Handmade"],
        followers: "7.1K",
        artworks: 92,
        joinDate: "July 2022",
        location: "Kyoto, Japan",
        artworkGallery: [
            { title: "Ceramic Bowl Set", likes: 876, comments: 67, type: "Pottery" },
            { title: "Silver Pendant", likes: 1234, comments: 89, type: "Jewelry" },
            { title: "Wooden Sculpture", likes: 987, comments: 56, type: "Handmade" },
            { title: "Traditional Vase", likes: 1456, comments: 123, type: "Crafts" }
        ]
    },
    {
        name: "Anime Studio",
        bio: "Professional anime illustrations and character design studio",
        categories: ["Anime", "Digital Art", "Character Design"],
        followers: "31.7K",
        artworks: 198,
        joinDate: "January 2022",
        location: "Tokyo, Japan",
        artworkGallery: [
            { title: "Magical Girl Series", likes: 5678, comments: 567, type: "Anime" },
            { title: "Mech Warrior", likes: 4567, comments: 456, type: "Digital Art" },
            { title: "Fantasy Adventure", likes: 3890, comments: 389, type: "Character Design" },
            { title: "School Life", likes: 2345, comments: 234, type: "Anime" }
        ]
    },
    {
        name: "Mixed Media Pro",
        bio: "Experimental mixed media art combining digital and traditional",
        categories: ["Mixed Media", "Experimental"],
        followers: "11.3K",
        artworks: 87,
        joinDate: "October 2022",
        location: "Paris, France",
        artworkGallery: [
            { title: "Digital Collage #1", likes: 1567, comments: 123, type: "Mixed Media" },
            { title: "Texture Study", likes: 2234, comments: 178, type: "Experimental" },
            { title: "Urban Fusion", likes: 1876, comments: 145, type: "Mixed Media" },
            { title: "Color Experiment", likes: 1456, comments: 89, type: "Experimental" }
        ]
    }
];

// Mock users for search functionality
const mockUsers = [
    { username: "artlover123", name: "Art Lover", bio: "Digital art enthusiast" },
    { username: "painter_joe", name: "Joe Smith", bio: "Professional painter" },
    { username: "sketch_master", name: "Sarah Chen", bio: "Sketching and drawing expert" },
    { username: "photo_wizard", name: "Mike Johnson", bio: "Photography specialist" },
    { username: "creative_soul", name: "Emma Davis", bio: "Mixed media artist" },
    { username: "design_guru", name: "Alex Kim", bio: "Graphic designer" },
    { username: "art_collector", name: "Lisa Brown", bio: "Art collector and curator" },
    { username: "street_artist", name: "Carlos Rodriguez", bio: "Street art and murals" },
];

// Artist type for recommendations
type Artist = {
    name: string;
    bio: string;
    categories: string[];
    followers: string;
    artworks: number;
    joinDate: string;
    location: string;
    artworkGallery: {
        title: string;
        likes: number;
        comments: number;
        type: string;
    }[];
};

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
        cancel: "Cancel",
        search: "Search",
        searchUsers: "Search users...",
        noResults: "No users found",
        closeSearch: "Close search"
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
        cancel: "Cancelar",
        search: "Buscar",
        searchUsers: "Buscar usuarios...",
        noResults: "No se encontraron usuarios",
        closeSearch: "Cerrar búsqueda"
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
        cancel: "Annuler",
        search: "Rechercher",
        searchUsers: "Rechercher des utilisateurs...",
        noResults: "Aucun utilisateur trouvé",
        closeSearch: "Fermer la recherche"
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
        cancel: "Abbrechen",
        search: "Suchen",
        searchUsers: "Benutzer suchen...",
        noResults: "Keine Benutzer gefunden",
        closeSearch: "Suche schließen"
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
        cancel: "キャンセル",
        search: "検索",
        searchUsers: "ユーザーを検索...",
        noResults: "ユーザーが見つかりません",
        closeSearch: "検索を閉じる"
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
        cancel: "取消",
        search: "搜索",
        searchUsers: "搜索用户...",
        noResults: "未找到用户",
        closeSearch: "关闭搜索"
    }
};

export default function Home() {
    const [following, setFollowing] = useState<string[]>([]);
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showSignUp, setShowSignUp] = useState(false);
    const [signUpPhone, setSignUpPhone] = useState('');
    const [signUpEmail, setSignUpEmail] = useState('');
    const [signUpUsername, setSignUpUsername] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');
    const [customUsername, setCustomUsername] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [currentLanguage, setCurrentLanguage] = useState<'english' | 'spanish' | 'french' | 'german' | 'japanese' | 'chinese'>('english');
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<string[]>([]);
    const [userPreferences, setUserPreferences] = useState<string[]>(['Digital Art', 'Anime']); // Default preferences
    const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);

    const [showArtworkView, setShowArtworkView] = useState(false);
    const [currentPage, setCurrentPage] = useState<'main' | 'artistProfile'>('main');
    // Get current translations
    const t = translations[currentLanguage];
    
    // Function to get recommended artists based on user preferences
    
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
            setUserPreferences(userData.preferences || ['Digital Art', 'Anime']);
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
                preferences: userPreferences,
                signInDate: new Date().toISOString()
            };
            localStorage.setItem('xart-user', JSON.stringify(userData));
        }
    }, [following, customUsername, profileImage, currentLanguage, userPreferences, isSignedIn, isInitialized, email]);

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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleArtistClick = (artist: Artist) => {
        setSelectedArtist(artist);
        setCurrentPage('artistProfile');
        setShowArtworkView(false);
    };

    const handleCloseSearch = () => {
        setShowSearch(false);
        setSearchQuery('');
        setSearchResults([]);
    };

    const handleSearchChange = (query: string) => {
        setSearchQuery(query);
        if (query.trim() === '') {
            setSearchResults([]);
            return;
        }

        // Filter users based on username or name
        const filtered = mockUsers.filter(user => 
            user.username.toLowerCase().includes(query.toLowerCase()) ||
            user.name.toLowerCase().includes(query.toLowerCase())
        ).map(user => user.username);
        
        setSearchResults(filtered);
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

    const handleCloseArtistProfile = () => {
        setCurrentPage('main');
        setSelectedArtist(null);
        setShowArtworkView(false);
    };

    const handleArtworkToggle = () => {
        setShowArtworkView(!showArtworkView);
        if (!showArtworkView) {
            // Scroll to artwork section when showing artwork view
            setTimeout(() => {
                const artworkSection = document.querySelector('#artwork-gallery');
                if (artworkSection) {
                    artworkSection.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
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

    // Render Artist Profile Page
    if (currentPage === 'artistProfile' && selectedArtist) {
        return (
            <div className="min-h-screen bg-white">
                {/* Artist Profile Header */}
                <div className="relative">
                    <button
                        onClick={handleCloseArtistProfile}
                        className="absolute top-6 left-6 z-10 bg-black bg-opacity-20 hover:bg-opacity-30 rounded-full p-3 transition-colors flex items-center gap-2"
                    >
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <span className="text-white font-medium hidden sm:inline">{t.home}</span>
                    </button>
                    
                    {/* Cover Image */}
                    <div className="h-64 md:h-80 bg-gradient-to-r from-blue-500 to-purple-600 relative">
                        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                    </div>
                    
                    {/* Profile Info */}
                    {!showArtworkView && (
                        <div className="px-6 md:px-12 lg:px-24">
                            <div className="flex flex-col md:flex-row items-start gap-6 -mt-16 relative z-10">
                                {/* Profile Picture */}
                                <div className="w-32 h-32 bg-gray-300 rounded-full border-6 border-white flex items-center justify-center shadow-lg">
                                    <span className="text-gray-600 text-4xl font-bold">
                                        {selectedArtist.name.charAt(0)}
                                    </span>
                                </div>
                                
                                {/* Artist Info */}
                                <div className="flex-1 md:mt-16">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                                        <div>
                                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{selectedArtist?.name}</h1>
                                            <p className="text-gray-600 text-lg mb-2">{selectedArtist?.location}</p>
                                            <p className="text-gray-700 text-lg max-w-2xl">{selectedArtist?.bio}</p>
                                        </div>
                                        <button
                                            onClick={() => handleFollow(selectedArtist?.name)}
                                            className={`mt-4 md:mt-0 px-8 py-3 rounded-lg font-semibold text-lg transition-colors ${
                                                following.includes(selectedArtist?.name)
                                                    ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                                    : "bg-blue-600 text-white hover:bg-blue-700"
                                            }`}
                                        >
                                            {following.includes(selectedArtist?.name) ? t.following : t.follow}
                                        </button>
                                    </div>
                                    
                                    {/* Stats */}
                                    <div className="flex gap-8 mb-6">
                                        <div className="text-center">
                                            <div className="text-2xl md:text-3xl font-bold text-gray-900">{selectedArtist?.artworks}</div>
                                            <div className="text-gray-500 font-medium">Artworks</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl md:text-3xl font-bold text-gray-900">{selectedArtist?.followers}</div>
                                            <div className="text-gray-500 font-medium">Followers</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl md:text-3xl font-bold text-gray-900">{selectedArtist?.joinDate}</div>
                                            <div className="text-gray-500 font-medium">Joined</div>
                                        </div>
                                    </div>
                                    
                                    {/* Categories */}
                                    <div className="flex flex-wrap gap-3 items-center">
                                        {selectedArtist?.categories.map((category, index) => (
                                            <span 
                                                key={index} 
                                                className={`px-4 py-2 rounded-full font-medium ${
                                                    userPreferences.includes(category)
                                                        ? 'bg-blue-100 text-blue-800 border-2 border-blue-200'
                                                        : 'bg-gray-100 text-gray-700 border-2 border-gray-200'
                                                }`}
                                            >
                                                {category}
                                            </span>
                                        ))}
                                        {/* Artwork Toggle Button */}
                                        <button
                                            onClick={handleArtworkToggle}
                                            className={`px-4 py-2 rounded-full font-medium transition-colors flex items-center gap-2 ${
                                                showArtworkView 
                                                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                                                    : 'bg-gray-800 text-white hover:bg-gray-700'
                                            }`}
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <span>{showArtworkView ? 'Profile' : 'Artwork'}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                
                {/* Artwork Gallery */}
                <div id="artwork-gallery" className={`px-6 md:px-12 lg:px-24 ${showArtworkView ? 'pt-24' : 'py-12'}`}>
                    {showArtworkView && (
                        <div className="mb-8 text-center">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{selectedArtist?.name}&apos;s Artwork</h1>
                            <p className="text-gray-600 text-lg">{selectedArtist?.artworkGallery?.length} artworks • {selectedArtist?.followers} followers</p>
                        </div>
                    )}
                    <h2 className={`font-bold text-gray-900 mb-8 ${showArtworkView ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl'}`}>
                        {showArtworkView ? 'All Artworks' : 'Artwork Gallery'}
                    </h2>
                    <div className={`grid gap-6 ${showArtworkView ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}`}>
                        {selectedArtist?.artworkGallery?.map((artwork, index) => (
                            <div key={index} className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group">
                                {/* Artwork Placeholder */}
                                <div className="aspect-square bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center relative overflow-hidden">
                                    <span className={`text-gray-600 font-semibold text-center px-4 ${showArtworkView ? 'text-sm' : ''}`}>{artwork.title}</span>
                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                                </div>
                                
                                {/* Artwork Info */}
                                <div className="p-4">
                                    <h3 className={`font-bold text-gray-900 mb-1 truncate ${showArtworkView ? 'text-sm' : ''}`}>{artwork.title}</h3>
                                    <p className={`text-gray-500 mb-3 ${showArtworkView ? 'text-xs' : 'text-sm'}`}>{artwork.type}</p>
                                    <div className={`flex items-center justify-between text-gray-600 ${showArtworkView ? 'text-xs' : 'text-sm'}`}>
                                        <span className="flex items-center gap-2">
                                            <svg className={`text-red-500 ${showArtworkView ? 'w-3 h-3' : 'w-4 h-4'}`} fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                            </svg>
                                            <span className="font-medium">{artwork.likes.toLocaleString()}</span>
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <svg className={`text-gray-400 ${showArtworkView ? 'w-3 h-3' : 'w-4 h-4'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                            </svg>
                                            <span className="font-medium">{artwork.comments}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                <Toaster
                    position="top-left"
                    reverseOrder={false}
                />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-blue-black">
            {/* Search Modal */}
            {showSearch && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">{t.search}</h3>
                            <button
                                onClick={handleCloseSearch}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            placeholder={t.searchUsers}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                            autoFocus
                        />
                        
                        <div className="max-h-60 overflow-y-auto">
                            {searchQuery && searchResults.length === 0 ? (
                                <p className="text-gray-500 text-center py-4">{t.noResults}</p>
                            ) : (
                                searchResults.map((username) => {
                                    const user = mockUsers.find(u => u.username === username);
                                    return (
                                        <div key={username} className="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                                            <div className="w-10 h-10 bg-gray-300 rounded-full mr-3 flex items-center justify-center">
                                                <span className="text-gray-600 text-sm font-medium">
                                                    {user?.name?.charAt(0) || username.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">@{username}</p>
                                                <p className="text-sm text-gray-500">{user?.name}</p>
                                                <p className="text-xs text-gray-400">{user?.bio}</p>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>
            )}

            <Toaster
                position="top-left"
                reverseOrder={false}
            />
        </div>
    );
}
