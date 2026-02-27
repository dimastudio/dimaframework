# راهنمای انتشار دایما فریمورک در مخازن مختلف

## 📦 روش‌های انتشار

### ۱. انتشار در npm

```bash
# ۱. وارد پوشه پروژه شوید
cd dimaframework-package

# ۲. به حساب npm خود لاگین کنید
npm login

# ۳. پکیج را منتشر کنید
npm publish
```

**نکته:** اگر نام پکیج `@dima/framework` باشد:
```bash
npm publish --access public
```

### ۲. انتشار در GitHub Packages

۱. فایل `.npmrc` بسازید:
```
@dimaframework:registry=https://npm.pkg.github.com
```

۲. در `package.json` مخزن را تنظیم کنید:
```json
{
  "name": "@dimaframework/dima-framework",
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  }
}
```

۳. منتشر کنید:
```bash
npm publish
```

### ۳. انتشار در GitLab Package Registry

```bash
# در package.json
{
  "publishConfig": {
    "@dimaframework:registry": "https://gitlab.com/api/v4/projects/YOUR_PROJECT_ID/packages/npm/"
  }
}

# تنظیم توکن
npm config set //gitlab.com/api/v4/projects/YOUR_PROJECT_ID/packages/npm/:_authToken YOUR_TOKEN

# انتشار
npm publish
```

### ۴. انتشار در JFrog Artifactory

```bash
# تنظیم رجیستری
npm config set registry https://yourcompany.jfrog.io/artifactory/api/npm/npm-local/

# انتشار
npm publish
```

### ۵. انتشار در Verdaccio (Private npm)

```bash
# تنظیم رجیستری
npm set registry http://your-verdaccio-server:4873/

# افزودن کاربر
npm adduser --registry http://your-verdaccio-server:4873/

# انتشار
npm publish
```

---

## 🚀 ساخت و انتشار فایل تاربال

```bash
# ساخت فایل tarball
npm pack

# این فایل dima-framework-2.0.0.tgz ایجاد می‌شود
# کاربران می‌توانند آن را نصب کنند:
npm install ./dima-framework-2.0.0.tgz
```

---

## 📁 ساختار فایل‌های انتشار

```
dimaframework-package/
├── dist/                    # فایل‌های بیلد شده
│   ├── index.js            # CommonJS
│   ├── index.esm.js        # ES Module
│   ├── index.d.ts          # TypeScript declarations
│   └── styles.css          # استایل‌ها
├── src/                     # سورس کد
│   ├── index.ts            # خروجی اصلی
│   ├── lib/                # ابزارها
│   │   └── utils.ts
│   └── components/
│       ├── ui/             # کامپوننت‌های پایه
│       └── layouts/        # کامپوننت‌های لایه‌بندی
├── package.json
├── tsconfig.json
├── tsup.config.ts
├── README.md
└── LICENSE
```

---

## 🔧 بیلد کردن پروژه

```bash
# نصب وابستگی‌ها
npm install

# بیلد
npm run build

# تست بیلد محلی
npm link

# در پروژه دیگر
npm link dima-framework
```

---

## 📋 چک‌لیست قبل از انتشار

- [ ] نسخه در `package.json` بروز است
- [ ] فایل `README.md` کامل است
- [ ] فایل `LICENSE` موجود است
- [ ] فایل‌های بیلد در `dist/` هستند
- [ ] توکن npm تنظیم شده
- [ ] تست‌ها پاس شده‌اند
- [ ] CHANGELOG.md بروز شده

---

## 🔐 تنظیم توکن‌ها

### npm
```bash
# ایجاد توکن در npmjs.com
# سپس:
npm config set //registry.npmjs.org/:_authToken YOUR_TOKEN
```

### GitHub
```bash
# ایجاد PAT در GitHub Settings > Developer settings > Personal access tokens
npm config set //npm.pkg.github.com/:_authToken YOUR_GITHUB_TOKEN
```

---

## 📝 نمونه .npmrc

```
//registry.npmjs.org/:_authToken=npm_xxxxx
@dimaframework:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=ghp_xxxxx
```

---

## 🌐 انتشار مستندات HTML

برای انتشار مستندات در سرور خود:

### روش ۱: آپلود مستقیم
فایل `index.html` را در ریشه سایت خود قرار دهید:
```
/var/www/dimaframework.ir/public_html/index.html
```

### روش ۲: GitHub Pages
```bash
# ایجاد مخزن جدید برای مستندات
git init
git add index.html
git commit -m "Add docs"
git branch -M main
git remote add origin https://github.com/dimaframework/docs.git
git push -u origin main

# فعال‌سازی GitHub Pages در Settings > Pages
```

### روش ۳: Netlify
```bash
# نصب Netlify CLI
npm install -g netlify-cli

# انتشار
netlify deploy --prod --dir=.
```

### روش ۴: Vercel
```bash
# نصب Vercel CLI
npm install -g vercel

# انتشار
vercel --prod
```
