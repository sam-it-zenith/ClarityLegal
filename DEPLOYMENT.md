# 🚀 Deploy ClarityLegal to Vercel

This guide will help you deploy your ClarityLegal AI agent to Vercel in just a few steps.

## 📋 Prerequisites

1. **Google Gemini API Key** - Get one from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. **GitHub Account** - For version control
3. **Vercel Account** - Sign up at [vercel.com](https://vercel.com)

## 🎯 Step-by-Step Deployment

### **Step 1: Prepare Your Repository**

1. **Initialize Git** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: ClarityLegal AI Agent"
   ```

2. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/yourusername/claritylegal.git
   git push -u origin main
   ```

### **Step 2: Deploy to Vercel**

#### **Option A: Deploy via Vercel Dashboard (Recommended)**

1. **Go to [vercel.com](https://vercel.com)** and sign in
2. **Click "New Project"**
3. **Import your GitHub repository**:
   - Select your `claritylegal` repository
   - Vercel will auto-detect it's a Next.js project
4. **Configure Environment Variables**:
   - Click "Environment Variables" tab
   - Add: `NEXT_PUBLIC_GEMINI_API_KEY` = `your_actual_api_key`
5. **Deploy**:
   - Click "Deploy"
   - Wait for build to complete (2-3 minutes)

#### **Option B: Deploy via Vercel CLI**

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel --prod
   ```

4. **Set Environment Variables**:
   - Go to your Vercel dashboard
   - Navigate to your project settings
   - Add environment variable: `NEXT_PUBLIC_GEMINI_API_KEY`

## 🔧 Environment Variables

### **Required Variables**

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_GEMINI_API_KEY` | Your Google Gemini API key | `AIzaSyC...` |

### **How to Get Your API Key**

1. **Visit [Google AI Studio](https://makersuite.google.com/app/apikey)**
2. **Sign in with your Google account**
3. **Click "Create API Key"**
4. **Copy the generated key**
5. **Add it to Vercel environment variables**

## 🎨 Custom Domain (Optional)

1. **Go to your Vercel project dashboard**
2. **Click "Settings" → "Domains"**
3. **Add your custom domain**
4. **Follow the DNS configuration instructions**

## 🔍 Post-Deployment Checklist

- [ ] **Test the application** - Upload a legal document
- [ ] **Verify API key** - Check if Gemini API calls work
- [ ] **Test error handling** - Try uploading non-legal documents
- [ ] **Check mobile responsiveness** - Test on different devices
- [ ] **Monitor performance** - Check Vercel analytics

## 🛠️ Troubleshooting

### **Common Issues**

1. **Build Fails**:
   - Check if all dependencies are in `package.json`
   - Ensure TypeScript compilation passes
   - Check Vercel build logs

2. **API Key Not Working**:
   - Verify the environment variable is set correctly
   - Check if the API key has proper permissions
   - Ensure the key is for Gemini API

3. **Environment Variables Not Loading**:
   - Make sure variable name starts with `NEXT_PUBLIC_`
   - Redeploy after adding environment variables
   - Check Vercel project settings

### **Useful Commands**

```bash
# Check build locally
npm run build

# Test locally
npm run dev

# Deploy to preview
vercel

# Deploy to production
vercel --prod

# View deployment logs
vercel logs
```

## 📊 Monitoring & Analytics

### **Vercel Analytics**
- **Performance monitoring** - Page load times
- **Error tracking** - JavaScript errors
- **User analytics** - Page views, sessions

### **Custom Monitoring**
- **API usage** - Monitor Gemini API calls
- **Error rates** - Track document analysis failures
- **User feedback** - Consider adding feedback forms

## 🔒 Security Considerations

1. **API Key Security**:
   - Never commit API keys to Git
   - Use environment variables only
   - Rotate keys regularly

2. **Rate Limiting**:
   - Monitor API usage
   - Consider implementing rate limits
   - Set up alerts for high usage

3. **Data Privacy**:
   - Documents are processed client-side
   - No data is stored on servers
   - Consider adding privacy policy

## 🎉 Success!

Once deployed, your ClarityLegal AI agent will be available at:
- **Production URL**: `https://your-project.vercel.app`
- **Custom Domain**: `https://yourdomain.com` (if configured)

## 📞 Support

If you encounter issues:
1. **Check Vercel documentation**: [vercel.com/docs](https://vercel.com/docs)
2. **Review build logs** in Vercel dashboard
3. **Test locally** with `npm run dev`
4. **Check environment variables** are set correctly

---

**Happy Deploying! 🚀** 