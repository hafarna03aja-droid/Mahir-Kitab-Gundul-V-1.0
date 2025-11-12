# 🔒 SECURITY NOTICE - PENTING!

## ⚠️ JANGAN PERNAH COMMIT API KEYS!

API keys adalah **sangat sensitif** dan tidak boleh di-commit ke Git atau dipublikasikan di GitHub!

## ✅ Checklist Keamanan

### Sebelum Push ke GitHub:

- [ ] ✅ File `.env` ada di `.gitignore`
- [ ] ✅ Tidak ada API key di source code
- [ ] ✅ Gunakan environment variables
- [ ] ✅ File `.env.example` hanya berisi template (tanpa key asli)

### Jika API Key Terekspos:

**SEGERA lakukan:**

1. **Revoke API Key Immediately**
   ```
   🚨 PRIORITAS TERTINGGI!
   
   Gemini API Key:
   → https://aistudio.google.com/app/apikey
   → Klik tombol Delete/Revoke pada key yang terekspos
   → Generate API key baru
   ```

2. **Check Git History**
   ```bash
   # Cari apakah API key pernah di-commit
   git log --all -S "YOUR_API_KEY" --oneline
   
   # Jika ditemukan, hapus dari history (HATI-HATI!)
   # Konsultasi dengan tim atau gunakan git-filter-repo
   ```

3. **Generate New Keys**
   - Gemini: https://aistudio.google.com/app/apikey
   - Supabase: Project Settings → API → Reset anon key

4. **Update Environment Variables**
   ```bash
   # Local
   nano .env  # Update dengan key baru
   
   # Vercel
   vercel env rm GEMINI_API_KEY
   vercel env add GEMINI_API_KEY
   # Paste key baru
   vercel --prod  # Redeploy
   ```

## 🛡️ Best Practices

### 1. Gunakan Environment Variables

**❌ JANGAN:**
```typescript
const API_KEY = "AIzaSyCQ0hAr44T7SpCOwxOCjg2PN0OXL1vHl-U";
```

**✅ LAKUKAN:**
```typescript
// Server-side (API routes)
const API_KEY = process.env.GEMINI_API_KEY;

// Client-side (with VITE_ prefix)
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
```

### 2. File .env HARUS di .gitignore

```gitignore
# Environment variables
.env
.env.local
.env.production
.env.*.local
```

### 3. Gunakan .env.example untuk Template

```bash
# .env.example (SAFE to commit)
GEMINI_API_KEY=your_key_here
VITE_SUPABASE_URL=your_url_here

# .env (NEVER commit!)
GEMINI_API_KEY=AIza...actual_key
VITE_SUPABASE_URL=https://...actual_url
```

### 4. Validasi Sebelum Push

```bash
# Check no .env file in staging
git status

# Check no API keys in code
grep -r "AIza" .
grep -r "GEMINI_API_KEY.*=" . --include="*.ts" --include="*.tsx"
```

### 5. Setup Git Hooks (Optional)

Buat file `.git/hooks/pre-commit`:
```bash
#!/bin/bash
# Prevent committing .env files

if git diff --cached --name-only | grep -q "^\.env$"; then
    echo "❌ ERROR: Attempting to commit .env file!"
    echo "Remove it from staging: git reset .env"
    exit 1
fi

# Check for API key patterns
if git diff --cached | grep -q "AIza"; then
    echo "⚠️  WARNING: Possible API key detected!"
    echo "Review your changes carefully"
    exit 1
fi
```

## 🔍 Monitoring

### Deteksi API Key di GitHub

Jika accidentally push ke GitHub:
- GitHub akan auto-detect dan send security alert
- Revoke key SEGERA
- GitHub akan also notify Google

### Check Exposed Keys

Tools untuk scan:
- [TruffleHog](https://github.com/trufflesecurity/trufflehog)
- [git-secrets](https://github.com/awslabs/git-secrets)
- [GitGuardian](https://www.gitguardian.com/)

## 📋 Incident Response Checklist

Jika API key terekspos:

1. [ ] Revoke key immediately
2. [ ] Generate new key
3. [ ] Update all environments (local, Vercel, etc.)
4. [ ] Check usage logs for unauthorized access
5. [ ] Remove key from Git history if needed
6. [ ] Document incident
7. [ ] Review security practices

## 🆘 Emergency Contacts

- **Gemini API**: https://support.google.com
- **Supabase**: https://supabase.com/support
- **Vercel**: https://vercel.com/support

## 📖 Resources

- [GitHub Secret Scanning](https://docs.github.com/en/code-security/secret-scanning)
- [OWASP API Security](https://owasp.org/www-project-api-security/)
- [12 Factor App - Config](https://12factor.net/config)

---

**Remember: Prevention is better than cure!** 🔒

Always review your commits before pushing and never hardcode sensitive data.
