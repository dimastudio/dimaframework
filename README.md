# دایما فریمورک (Dima Framework)

<div align="center">

![Dima Framework](https://img.shields.io/badge/دایما_فریمورک-۲.۰-purple?style=for-the-badge)

**فریمورک مدرن و قدرتمند برای ساخت اپلیکیشن‌های وب با پشتیبانی کامل از RTL و زبان فارسی**

[شروع سریع](#شروع-سریع) • [مستندات](https://dimaframework.ir) • [نمونه‌ها](#نمونه‌ها) • [مشارکت](#مشارکت)

</div>

---

## ✨ ویژگی‌ها

- 🎨 **طراحی مدرن** - کامپوننت‌های زیبا با پشتیبانی از تم روشن/تاریک
- 🌐 **پشتیبانی کامل RTL** - طراحی شده برای زبان فارسی
- ⚡ **عملکرد بالا** - بهینه‌سازی شده برای سرعت و حجم کم
- 🔒 **امنیت بالا** - رعایت استانداردهای امنیتی
- 📦 **TypeScript** - تایپ‌های کامل برای تجربه توسعه بهتر
- 🔧 **قابل سفارشی‌سازی** - با CSS Variables و Tailwind

---

## 🚀 شروع سریع

### نصب

```bash
npm install dima-framework
# یا
yarn add dima-framework
# یا
pnpm add dima-framework
```

### استفاده

```tsx
import { Button, Card, Input, Badge } from 'dima-framework';
import 'dima-framework/dist/styles.css';

function App() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>سلام دنیا!</CardTitle>
        <Badge>جدید</Badge>
      </CardHeader>
      <CardContent>
        <Input placeholder="نام خود را وارد کنید" />
        <Button>ارسال</Button>
      </CardContent>
    </Card>
  );
}
```

---

## 📦 کامپوننت‌ها

### دکمه‌ها
```tsx
<Button variant="primary">اصلی</Button>
<Button variant="secondary">ثانویه</Button>
<Button variant="outline">کادر</Button>
<Button variant="ghost">شبح</Button>
<Button variant="destructive">تخریبی</Button>
```

### کارت‌ها
```tsx
<Card>
  <CardHeader>
    <CardTitle>عنوان</CardTitle>
    <CardDescription>توضیحات</CardDescription>
  </CardHeader>
  <CardContent>محتوا</CardContent>
  <CardFooter>پاورقی</CardFooter>
</Card>
```

### فرم‌ها
```tsx
<Input placeholder="ورودی متن" />
<Textarea placeholder="متن چند خطی" />
<Select><SelectItem value="1">گزینه</SelectItem></Select>
<Checkbox />
<RadioGroup />
<Switch />
<Slider />
```

### مودال‌ها
```tsx
<Dialog>
  <DialogTrigger>باز کردن</DialogTrigger>
  <DialogContent>
    <DialogTitle>عنوان</DialogTitle>
    <DialogDescription>توضیحات</DialogDescription>
  </DialogContent>
</Dialog>
```

### جعبه‌های اطلاع‌رسانی
```tsx
<InfoBox>پیام اطلاع‌رسانی</InfoBox>
<WarningBox>پیام هشدار</WarningBox>
<SuccessBox>پیام موفقیت</SuccessBox>
<DangerBox>پیام خطا</DangerBox>
<TipBox>نکته</TipBox>
```

---

## 🎨 سیستم رنگ‌بندی

```css
/* متغیرهای CSS */
--primary: #7c3aed;
--secondary: #f3f0ff;
--accent: #8b5cf6;
--destructive: #ef4444;
--success: #22c55e;
--warning: #f59e0b;
--info: #3b82f6;
```

---

## 🔧 پیکربندی

### Tailwind CSS

```js
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/dima-framework/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // سفارشی‌سازی‌های شما
    },
  },
}
```

### CSS Variables

```css
:root {
  --primary: 270 50% 50%;
  --secondary: 270 20% 96%;
}

.dark {
  --primary: 270 50% 70%;
  --secondary: 270 20% 22%;
}
```

---

## 📱 ریسپانسیو

دایما فریمورک به صورت کامل ریسپانسیو است:

- **موبایل**: < 768px
- **تبلت**: 768px - 1024px
- **دسکتاپ**: > 1024px

---

## 🌙 تم تاریک

```tsx
// فعال‌سازی تم تاریک
<html class="dark">
  ...
</html>

// یا با JavaScript
document.documentElement.classList.add('dark');
```

---

## 📋 لیست کامپوننت‌ها

| کامپوننت | توضیحات |
|---------|---------|
| `Button` | دکمه با انواع مختلف |
| `Card` | کارت برای نمایش محتوا |
| `Input` | فیلد ورودی متن |
| `Textarea` | ورودی متن چند خطی |
| `Select` | لیست انتخاب |
| `Checkbox` | چک‌باکس |
| `RadioGroup` | گروه رادیو باتن |
| `Switch` | سوییچ روشن/خاموش |
| `Slider` | اسلایدر |
| `Progress` | نوار پیشرفت |
| `Badge` | نشان/برچسب |
| `Alert` | جعبه هشدار |
| `Dialog` | مودال/دیالوگ |
| `Tabs` | تب‌ها |
| `Accordion` | آکوردئون |
| `Tooltip` | تولتیپ |
| `DropdownMenu` | منوی کشویی |
| `Avatar` | آواتار کاربر |
| `Separator` | جداکننده |
| `Pagination` | صفحه‌بندی |
| `Breadcrumb` | مسیر صفحه |
| `Sheet` | پنل کناری |
| `ScrollArea` | ناحیه اسکرول |

---

## 🤝 مشارکت

از مشارکت شما استقبال می‌کنیم!

1. Fork کنید
2. Branch جدید بسازید (`git checkout -b feature/amazing`)
3. Commit کنید (`git commit -m 'Add amazing feature'`)
4. Push کنید (`git push origin feature/amazing`)
5. Pull Request باز کنید

---

## 📄 مجوز

این پروژه تحت مجوز MIT منتشر شده است.

---

## 📞 تماس

- وبسایت: [dimaframework.ir](https://dimaframework.ir)
- ایمیل: info@dimaframework.ir
- توییتر: [@dimaframework](https://twitter.com/dimaframework)

---

<div align="center">

ساخته شده با ❤️ برای توسعه‌دهندگان فارسی‌زبان

</div>
