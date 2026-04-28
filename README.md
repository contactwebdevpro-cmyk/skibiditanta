# 🚽 SkibidiTanta — Déploiement Vercel

## Structure du projet
```
skibidi-tantafruit/
├── index.html      ← App principale (Firebase configuré)
├── vercel.json     ← Config Vercel
└── README.md       ← Ce fichier
```

---

## 🚀 Déployer sur Vercel (3 méthodes)

### Méthode 1 — Vercel CLI (recommandé)
```bash
# 1. Installe Vercel CLI
npm install -g vercel

# 2. Va dans le dossier
cd skibidi-tantafruit/

# 3. Déploie
vercel

# 4. Suis les instructions :
#    - Set up and deploy? → Y
#    - Which scope? → ton compte
#    - Link to existing project? → N
#    - Project name? → skibidi-tantafruit
#    - Directory? → ./
#    - Override settings? → N
```

### Méthode 2 — GitHub + Vercel (auto-deploy)
```bash
# 1. Crée un repo GitHub
git init
git add .
git commit -m "🚽 Initial skibidi commit"
git remote add origin https://github.com/TON_USERNAME/skibidi-tantafruit.git
git push -u origin main

# 2. Va sur vercel.com → "Add New Project"
# 3. Importe ton repo GitHub
# 4. Deploy → Done!
```

### Méthode 3 — Drag & Drop
1. Va sur **vercel.com/new**
2. Glisse-dépose le dossier `skibidi-tantafruit/`
3. Deploy!

---

## 🔥 Config Firebase déjà intégrée
```
Project: skibididb-fd19b
Auth: Email/Password ✅
Firestore: ✅
```

## ⚙️ Activer Firebase (obligatoire avant déploiement)

### 1. Firestore — Règles de sécurité
Va sur **console.firebase.google.com → skibididb-fd19b → Firestore → Rules** et colle :

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /posts/{postId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update: if request.auth != null && 
        (resource.data.userId == request.auth.uid || 
         request.resource.data.diff(resource.data).affectedKeys().hasOnly(['likes', 'comments']));
      allow delete: if request.auth != null && 
        resource.data.userId == request.auth.uid;
    }
  }
}
```

### 2. Authentication
- Console Firebase → Authentication → Sign-in method
- Active **Email/Password** ✅

### 3. Domaine autorisé sur Vercel
- Console Firebase → Authentication → Settings → Authorized domains
- Ajoute ton domaine Vercel : `skibidi-tantafruit.vercel.app`

---

## 🌐 Ton URL finale
```
https://skibidi-tantafruit.vercel.app
```
(ou le nom que Vercel te génère)

---

## 📦 Variables d'environnement (optionnel)
Si tu veux sécuriser ta config, tu peux mettre dans Vercel :
```
FIREBASE_API_KEY=AIzaSyDo-vkOiAXZTINsaxx-2YOanli6PUe7Vqg
```
Mais pour un projet HTML statique, la config dans le code est standard.

---

**GG sigma, ton réseau social est live 🚽🍉🔥**
