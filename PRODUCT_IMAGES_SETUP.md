# 🎨 Sutr Product Images Setup Guide

## ✅ What's Been Created

I've built a complete product catalog system for your Sutr collection with:
- 11 products with detailed descriptions and pricing
- Individual product pages with image carousels
- Hover info pills for product details
- Responsive product grid layout

## 📁 Where to Place Your Images

### Product Images Directory
```
/Users/suryatejlalam/Brahmi antigravity/public/images/products/sutr/
```

### Required Images for Each Product

Each product needs **3 images** named exactly as shown:

#### 1. KANTHI JACKET
```
public/images/products/sutr/kanthi-jacket/
├── image-1.jpg
├── image-2.jpg
└── image-3.jpg
```

#### 2. KANTHI SKIRT
```
public/images/products/sutr/kanthi-skirt/
├── image-1.jpg
├── image-2.jpg
└── image-3.jpg
```

#### 3. NILAAYA DRESS
```
public/images/products/sutr/nilaaya-dress/
├── image-1.jpg
├── image-2.jpg
└── image-3.jpg
```

#### 4. CHARKHA VEST
```
public/images/products/sutr/charkha-vest/
├── image-1.jpg
├── image-2.jpg
└── image-3.jpg
```

#### 5. CHARKHA PANTS
```
public/images/products/sutr/charkha-pants/
├── image-1.jpg
├── image-2.jpg
└── image-3.jpg
```

#### 6. DHAARA SKIRT
```
public/images/products/sutr/dhaara-skirt/
├── image-1.jpg
├── image-2.jpg
└── image-3.jpg
```

#### 7. AVANTI TOP
```
public/images/products/sutr/avanti-top/
├── image-1.jpg
├── image-2.jpg
└── image-3.jpg
```

#### 8. EKA REKHA SHIRT
```
public/images/products/sutr/eka-rekha-shirt/
├── image-1.jpg
├── image-2.jpg
└── image-3.jpg
```

#### 9. EKA REKHA PANTS
```
public/images/products/sutr/eka-rekha-pants/
├── image-1.jpg
├── image-2.jpg
└── image-3.jpg
```

#### 10. NEEL DHAARA SHIRT
```
public/images/products/sutr/neel-dhaara-shirt/
├── image-1.jpg
├── image-2.jpg
└── image-3.jpg
```

#### 11. KALDHAARA PANTS
```
public/images/products/sutr/kaldhaara-pants/
├── image-1.jpg
├── image-2.jpg
└── image-3.jpg
```

## 📸 Image Guidelines

### Size & Format
- **Format**: JPG or PNG
- **Minimum Size**: 1200×1600px (portrait orientation)
- **Aspect Ratio**: 3:4 recommended
- **File Size**: Optimize to under 500KB each

### Image Types
- **image-1.jpg** - Main product shot (front view, clean background)
- **image-2.jpg** - Alternate angle or detail shot (fabric texture, stitching)
- **image-3.jpg** - Lifestyle shot (styled, worn by model, or flat lay)

### Quality Tips
- High resolution for zoom functionality
- Consistent lighting across all product images
- Clean, professional backgrounds (white or neutral)
- Show product details and texture clearly

## 🎯 Product Details

### Categories
- **Jackets**: Kanthi Jacket
- **Vests**: Charkha Vest
- **Tops**: Avanti Top
- **Shirts**: Eka Rekha Shirt, Neel Dhaara Shirt
- **Dresses**: Nilaaya Dress
- **Skirts**: Kanthi Skirt, Dhaara Skirt
- **Pants**: Charkha Pants, Eka Rekha Pants, Kaldhaara Pants

### Pricing (Dummy)
- Jackets: ₹6,499
- Vests: ₹4,299
- Dresses: ₹5,999
- Tops: ₹3,799
- Shirts: ₹4,499 - ₹4,899
- Skirts: ₹4,299 - ₹4,799
- Pants: ₹3,999 - ₹4,599

### Sizes
All products available in: S, M, L, XL, XXL

## 🔗 URLs

### Collection Page
```
http://localhost:3000/collections/sutr
```

### Individual Product Pages
- `/collections/sutr/kanthi-jacket`
- `/collections/sutr/kanthi-skirt`
- `/collections/sutr/nilaaya-dress`
- `/collections/sutr/charkha-vest`
- `/collections/sutr/charkha-pants`
- `/collections/sutr/dhaara-skirt`
- `/collections/sutr/avanti-top`
- `/collections/sutr/eka-rekha-shirt`
- `/collections/sutr/eka-rekha-pants`
- `/collections/sutr/neel-dhaara-shirt`  
- `/collections/sutr/kaldhaara-pants`

## ✨ Features Implemented

### Product Listing Page
- ✅ Grid layout with hover effects
- ✅ Category badges
- ✅ Pricing display
- ✅ Click to view details

### Individual Product Pages
- ✅ **Left Half**: 3-image carousel with thumbnails
- ✅ **Right Half**:
  - Product name and price
  - Size selector (S, M, L, XL, XXL)
  - Link to size chart
  - Add to Cart button
  - Info pills with hover overlays:
    - **Description** - Full product story
    - **Details** - Material, fit, category
    - **Product Care** - Washing and care instructions
    - **Shipping** - Delivery information

### Design Features
- Translucent backdrop-blur hover panels
- Smooth animations and transitions
- Responsive sizing
- Font alignment with design system
- Professional styling throughout

## 🚀 Next Steps

1. **Add your product images** to the directories listed above
2. **Update descriptions** in `/src/lib/mockData/products.ts` with real content
3. **Adjust pricing** as needed in the same file
4. **Test the pages** by visiting the URLs above
5. **Update care instructions** and shipping info per product if different

All directories have been created and are ready for your images! 📸
