# 🚽 SkibidiTanta — Déploiement Vercel avec Variables d'Environnement

## Structure du projet
```
skibidi-tantafruit/
├── index.html      ← Source (variables via window.__ENV__)
├── build.js        ← Script qui injecte les env vars au build
├── package.json    ← Config npm
├── vercel.json     ← Config Vercel (build + output)
└── README.md
```

---

## ⚙️ Étape 1 — Ajouter les variables dans Vercel

Va sur **vercel.com → ton projet → Settings → Environment Variables**
et ajoute ces 6 variables :

| Name | Value |
|------|-------|
| `VITE_FIREBASE_API_KEY` | `AIzaSyDo-vkOiAXZTINsaxx-2YOanli6PUe7Vqg` |
| `VITE_FIREBASE_AUTH_DOMAIN` | `skibididb-fd19b.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | `skibididb-fd19b` |
| `VITE_FIREBASE_STORAGE_BUCKET` | `skibididb-fd19b.firebasestorage.app` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | `584260890482` |
| `VITE_FIREBASE_APP_ID` | `1:584260890482:web:ae6f5c7c10fbfe027437eb` |

Coche **Production**, **Preview** et **Development** pour chaque variable.

---

## 🚀 Étape 2 — Déployer

### Via CLI
```bash
npm install -g vercel
cd skibidi-tantafruit/
vercel
```

### Via GitHub (auto-deploy à chaque push)
```bash
git init
git add .
git commit -m "🚽 skibidi tantafruit launch"
git remote add origin https://github.com/TON_USERNAME/skibidi-tantafruit.git
git push -u origin main
# Ensuite import le repo sur vercel.com
```

---

## Comment ça marche ?

Au moment du build Vercel exécute `node build.js`.
Ce script lit les variables d'environnement Vercel et les injecte
dans `index.html` sous forme de `window.__ENV__` avant de copier
le fichier dans `/dist`. Résultat : tes clés ne sont **jamais** hardcodées
dans le code source GitHub, mais elles sont disponibles au runtime.

```
Vercel env vars
     ↓
  build.js   →   dist/index.html  (avec window.__ENV__ injecté)
     ↑
  index.html (source propre, sans clés)
```

---

## 🔥 Firebase — Config requise

### Règles Firestore
Console Firebase → Firestore → Rules :
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /posts/{postId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update: if request.auth != null &&
        (resource.data.userId == request.auth.uid ||
         request.resource.data.diff(resource.data).affectedKeys()
           .hasOnly(['likes', 'comments']));
      allow delete: if request.auth != null &&
        resource.data.userId == request.auth.uid;
    }
  }
}
```

### Authentication
Firebase Console → Authentication → Sign-in method → **Email/Password** ✅

### Domaine autorisé
Firebase Console → Authentication → Settings → Authorized domains
→ Ajoute `skibidi-tantafruit.vercel.app` (ou ton vrai domaine Vercel)

---

**GG sigma, tes clés sont sécurisées et le site est live 🚽🍉🔥**
