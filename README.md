
# PhishGuard AI 🛡️

PhishGuard AI is an advanced, AI-powered phishing email detector. It uses a multi-layered approach to analyze suspicious messages, combining simulated traditional machine learning heuristics with deep semantic analysis via **Google Gemini 3 Flash**.

## ✨ Features

- **Dual-Layer Analysis**: Combines a simulated TF-IDF Logistic Regression score (heuristic) with a LLM-powered semantic scan.
- **Risk Scoring**: Real-time gauge visualization of threat levels.
- **Red Flag Identification**: Automatically extracts suspicious elements like urgency, spoofed links, and grammatical inconsistencies.
- **Forensic History**: Locally stored history of previous scans.
- **Actionable Advice**: Provides clear steps on how to handle the detected threat.

## 🚀 Tech Stack

- **Frontend**: React 19, Tailwind CSS
- **AI Engine**: Google Gemini API (`gemini-3-flash-preview`)
- **Icons**: Lucide React
- **Visualization**: Recharts

## 💻 How to Run Locally

If you are cloning this repository to run it on your own machine, follow these steps:

### 1. Prerequisites
- A modern web browser.
- A Google Gemini API Key (get one at [ai.google.dev](https://ai.google.dev/)).

### 2. Method A: Using a Development Server (Recommended)
This is the most reliable way to handle the API key and module imports.
1.  **Clone the repo**: `git clone <your-repo-url>`
2.  **Install Vite**: `npm install -g vite` (if you don't have it).
3.  **Run the server**: 
    ```bash
    npx vite --port 3000
    ```
4.  **API Key**: Since the app uses `process.env.API_KEY`, you can pass it during startup:
    ```bash
    API_KEY=your_key_here npx vite
    ```

### 3. Method B: Using VS Code "Live Server"
1.  Open the folder in VS Code.
2.  Right-click `index.html` and select **Open with Live Server**.
3.  **Manual Key Setup**: Since "Live Server" doesn't handle `process.env`, you must briefly edit `services/geminiService.ts`:
    - Change `const API_KEY = process.env.API_KEY || '';` 
    - To `const API_KEY = 'YOUR_ACTUAL_KEY_HERE';`
    - **⚠️ WARNING**: Do not commit this file back to GitHub once you've added your secret key!

## 🧪 Testing Samples

To test the application's capabilities, copy and paste these samples into the detector:

### 1. Financial Phishing (High Risk)
**Subject:** URGENT: Unauthorized access to your Bank account
**Body:**
Dear Customer,
Our security systems have detected an unusual login attempt on your account from an unknown IP address. For your protection, your account has been temporarily restricted. To restore access, please click the link below and verify your identity immediately: http://bank-secure-update-portal.net/login

### 2. Corporate Impersonation (Medium Risk)
**Subject:** Action Required: Mandatory Password Reset
**Body:**
Your network password is set to expire in 2 hours. Due to new security policies, you must update it now to maintain access to corporate resources. 
Update here: https://outlook-office365-verify.com/auth

## 💡 Why the Subject Line Matters
The Subject Line is the "hook" of a phishing attack. It is specifically designed to bypass rational judgment by inducing urgency, authority, or curiosity. By analyzing the Subject Line separately from the body, PhishGuard AI can detect psychological triggers before the technical malicious payload (the link) is even reached.
