# ClarityLegal AI Agent 🚀

A modern, beautiful, and user-friendly AI-powered legal document analysis platform that transforms complex legal jargon into clear, actionable insights.

![ClarityLegal Hero](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-38B2AC)

## ✨ Features

### 🎨 **Modern Design**
- **Beautiful UI/UX** with glass morphism effects
- **Responsive design** that works on all devices
- **Dark/Light mode** support with smooth transitions
- **Gradient backgrounds** and modern color palette
- **Smooth animations** and micro-interactions

### 🤖 **AI-Powered Analysis**
- **Plain English Summaries** - Transform complex legal jargon into clear explanations
- **Risk Detection** - Identify hidden obligations and potential pitfalls
- **Rights & Duties** - Understand your responsibilities and entitlements
- **Contract Structure Map** - Visualize document organization

### 📁 **File Support**
- **PDF documents** - Full text extraction and analysis
- **DOCX files** - Microsoft Word document processing
- **TXT files** - Plain text document support
- **Drag & Drop** interface with visual feedback

### 🔒 **Security & Privacy**
- **Client-side processing** - Your documents never leave your device
- **No data storage** - Analysis happens in real-time
- **Secure file handling** - Temporary processing only

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd claritylegal

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🎯 Usage

1. **Upload Document** - Drag and drop your legal document or click to browse
2. **AI Analysis** - Our AI processes your document in real-time
3. **Review Results** - Get clear insights in four key areas:
   - Plain English Summary
   - Risky Clauses to Watch
   - Your Rights & Duties
   - Contract Structure Map
4. **Download/Share** - Export your analysis or share with others

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Google Fonts** - Inter & Poppins for beautiful typography

### AI & Processing
- **Google Gemini AI** - Advanced document analysis
- **PDF.js** - PDF text extraction
- **Mammoth.js** - DOCX file processing

### Design System
- **Modern Color Palette** - Slate, Blue, Purple gradients
- **Glass Morphism** - Backdrop blur effects
- **Smooth Animations** - CSS transitions and keyframes
- **Responsive Grid** - Mobile-first design

## 🎨 Design Features

### Color Scheme
```css
Primary: Blue (#3b82f6 → #1d4ed8)
Secondary: Purple (#8b5cf6 → #7c3aed)
Success: Green (#22c55e → #16a34a)
Warning: Orange (#f59e0b → #d97706)
Danger: Red (#ef4444 → #dc2626)
```

### Typography
- **Display Font**: Poppins (Headings)
- **Body Font**: Inter (Content)
- **Mono Font**: Geist Mono (Code)

### Components
- **Glass Cards** - Semi-transparent with backdrop blur
- **Gradient Buttons** - Beautiful hover effects
- **Animated Icons** - Smooth transitions
- **Loading States** - Elegant spinners

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop** - Full feature set with grid layouts
- **Tablet** - Adaptive layouts with touch-friendly interactions
- **Mobile** - Streamlined interface with optimized spacing

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file:

```env
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```

### Tailwind Configuration
The design system is configured in `tailwind.config.js` with:
- Custom color palette
- Extended spacing and typography
- Custom animations and keyframes
- Plugin configurations

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Other Platforms
The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

**ClarityLegal is an AI-powered explainer, not a law firm.** The information provided is for educational and informational purposes only and does not constitute legal advice. For legal advice, please consult a qualified attorney.

## 🙏 Acknowledgments

- **Google Gemini AI** for powerful document analysis
- **Tailwind CSS** for the beautiful design system
- **Next.js Team** for the amazing React framework
- **Heroicons** for the beautiful SVG icons

---

**Made with ❤️ for making legal documents accessible to everyone**
