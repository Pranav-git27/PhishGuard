# How PhishGuard AI Works 🧠

PhishGuard AI utilizes a **Hybrid Detection Architecture** that combines traditional cybersecurity heuristics with state-of-the-art Large Language Model (LLM) reasoning.

## 🔬 The Two-Layer Detection Engine

### Layer 1: Simulated Classic Heuristics (TF-IDF)
The engine first simulates a traditional machine learning approach similar to what you would find in standard email filters (like those built with Python's Scikit-learn).
- **Vectorization**: The system "tokenizes" the text, looking for the frequency of specific high-risk keywords (e.g., "Account," "Urgent," "Verify," "Suspended").
- **Statistical Scoring**: It calculates a `classicModelScore` based on the density of these tokens. This tells the user: *"Would a basic, non-AI filter have caught this based purely on keywords?"*

### Layer 2: Semantic AI Intelligence (Gemini 3 Flash)
Unlike traditional filters, the AI layer understands **context** and **intent**. It performs deep forensics on:
- **Artificial Urgency**: Detecting "Panic Cues" designed to bypass a human's critical thinking (e.g., "within 2 hours" or "immediate action required").
- **Brand Consistency**: Comparing the claimed identity (e.g., "Microsoft Security") against the tone and the provided URLs.
- **Link Forensics**: Identifying "Look-alike" or "Typosquatted" domains (e.g., `micros0ft-support.com` instead of `microsoft.com`).
- **Psychological Profiling**: Detecting social engineering tactics like "Authority" (Impersonating a CEO) or "Social Proof."

## 🎣 The "Subject Line" Vector
In phishing forensics, the **Subject Line** is analyzed as the primary "Hook." 
- Attackers use the subject line to set the **Emotional Context**.
- By isolating the subject line, our AI can determine if the "hook" matches known malicious social engineering patterns, even if the body text is relatively safe or vague.

## 📊 Risk Score Calculation
The final **Risk Score (0-100)** is a synthesis of:
1.  **Technical Markers**: Presence of suspicious links or attachments.
2.  **Linguistic Markers**: Grammar patterns typical of automated phishing templates.
3.  **Behavioral Markers**: Unusual requests (asking for passwords, PII, or wire transfers).

| Score | Status | Description |
| :--- | :--- | :--- |
| **0-30** | ✅ Safe | Normal communication patterns, consistent domains. |
| **31-70** | ⚠️ Suspicious | High-pressure language or unknown sender origins. |
| **71-100** | ❌ Malicious | Definitive phishing markers, spoofed links, or data harvesting attempts. |

## 🛡️ Forensic Output
Every analysis returns a structured list of **Red Flags**. This is designed to educate the user, explaining *why* a specific sentence or link is dangerous, helping them develop a "human firewall" for future threats.
