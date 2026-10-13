# 🎓 Smart Campus Analytics: AI-Powered Student Success Platform

> **Predict, Optimize & Improve Student Success**  
> *Transforming multi-source campus data into actionable insights and decision intelligence for college administrators and faculty.*

---

## 🏆 Hackathon Evaluation Criteria Compliance Matrix (100 Points + Bonus)

| Criterion | Weight | Required Capabilities | Smart Campus Analytics Implementation |
| :--- | :---: | :--- | :--- |
| **Data Integration & Analysis** | **30%** | Quality of integration across sources, data cleaning, combined insights | ✅ **7 Siloed Streams Unified:** Academic ERP, Classroom Biometric RFID, Moodle LMS, Campus Engagement, HackerRank/Placement, Skills Assessment, and Proctor Feedback. Automated normalization, outlier mitigation, and real-time ingestion health monitoring. |
| **Success Score & Risk Identification** | **25%** | Relevant indicators, sensible scoring logic, clear at-risk identification | ✅ **Algorithmic SSS (0–100):** Multi-factor weighted formulation across all 7 pillars. Statutory AICTE 75% attendance rule penalty, backlog penalties. Tri-dimensional risk flags (Academic, Attendance/Debarment, Placement). |
| **Dashboard & Visualization** | **25%** | Interactive, clear, useful for faculty & administrators | ✅ **High-Tech Operations UI:** Ambient floating student analysis pie chart and attendance graph curves in the background, interactive Attendance vs CGPA scatter quadrant, 7-pillar radar benchmarks, department comparisons, instant search & multi-tier filters. |
| **Problem Understanding** | **10%** | Higher education campus context & administrative workflows | ✅ **Engineered for Real Campus Governance:** Addresses semester credits, supplementary backlog exams, statutory 75% attendance debarment alerts, and Tier-1 product campus placement cutoffs. |
| **Presentation & Demo** | **10%** | Working prototype, clear demo personas & scenarios | ✅ **1-Click Demo Tour Mode:** 4 rich student archetypes (Critical At-Risk, High-Coder with attendance slump, Placement Vulnerable topper, Campus Champion) with interactive What-If scenario simulations. |
| **BONUS 1: Student Segmentation** | **Bonus** | Meaningful student groups that support targeted action | 🌟 **5 Behavioral Cohorts:** Campus Champions, Placement Vulnerable, Tech Stars with Academic Slump, Disengaged Ghosters, and Critical Multi-Pillar Crisis. |
| **BONUS 2: Explainable Score (XAI)** | **Bonus** | Visible drivers behind each Success Score and risk flag | 🌟 **SHAP-Style Driver Attribution:** Quantified positive & negative factor waterfall (+/- score impacts) explaining the exact "Why" behind every score and risk classification. |

---

## 🚀 How to Run in VS Code

### Option 1: Via VS Code Terminal (Recommended)
1. Open the project folder in VS Code:
   ```powershell
   code C:\Users\surab\.gemini\antigravity\scratch\smart-campus-analytics
   ```
2. Open the integrated terminal (`Ctrl + ~`) and start the development server:
   ```powershell
   npm run dev
   ```
3. Open your browser at: **`http://localhost:3000`**

### Option 2: Double-Click Quick Launcher
Simply double-click `start.bat` inside the folder. It will launch the Vite development server and open your default browser automatically.

---

## 📊 Core Scope: The 7 Ingestion Data Streams

| Data Category | Ingested Metrics & Indicators | Source System |
| :--- | :--- | :--- |
| **Academic** | CGPA, SGPA history trend, internal marks avg, active backlogs, failed course list | Campus ERP / Student Registrar |
| **Attendance** | Overall %, Theory lecture %, Lab practical %, weekly trend, AICTE 75% cutoff rule | Biometric RFID Turnstiles & Smart Lecterns |
| **LMS** | Weekly logins, assignment completion %, late submissions, video hours, inactivity days | Moodle REST API v2.8 |
| **Engagement** | Campus events, technical clubs (GDSC, ACM, etc.), hackathons won, certifications | Campus Activities & Club Registry |
| **Placement** | Aptitude percentile, coding rating (0-100), technical & HR mock interview, resume ATS | HackerRank API & Superset Placement Portal |
| **Skills** | DSA, Web/Cloud, System Design, Communication, Teamwork, Critical Thinking | Campus Skills Diagnostic Engine |
| **Feedback** | Student satisfaction rating, stress level (Low/Mod/High), mentor proctor observations | Faculty Proctor Mobile App |

---

## 🧠 Algorithmic Formulations

### 1. Student Success Score (SSS)
$$\text{SSS} = w_{\text{acad}} S_{\text{acad}} + w_{\text{att}} S_{\text{att}} + w_{\text{place}} S_{\text{place}} + w_{\text{lms}} S_{\text{lms}} + w_{\text{skills}} S_{\text{skills}} + w_{\text{eng}} S_{\text{eng}} + w_{\text{feed}} S_{\text{feed}}$$

- **Academic Weight ($25\%$)**: $(\text{CGPA} \times 10 \times 0.65 + \text{Internal} \times 0.35) - (\text{Backlogs} \times 8)$
- **Attendance Weight ($20\%$)**: Strict penalty applied if overall attendance $< 75\%$
- **Placement Weight ($20\%$)**: $0.30 \times \text{Aptitude} + 0.40 \times \text{Coding} + 0.20 \times \text{Mock} + 0.10 \times \text{Resume}$
- **LMS Weight ($15\%$)**: $0.65 \times \text{Completion} + 0.35 \times \text{LoginNorm} - \text{InactivityPenalty}$
- **Skills Weight ($10\%$)**: Technical skills average ($60\%$) + Soft skills average ($40\%$)
- **Engagement Weight ($5\%$)**: Events + Clubs + Hackathons + Certifications
- **Feedback & Wellbeing ($5\%$)**: Satisfaction score adjusted by stress level index

### 2. Multi-Tier Risk Classification
- **Critical (Red)**: $\text{SSS} < 60$ OR 2+ High Risk pillars (Backlogs $\ge 2$, Attendance $< 75\%$, Coding $< 55\%$)
- **Early Warning (Yellow)**: $\text{SSS} \in [60, 72]$ OR 1 High Risk pillar
- **On Track (Green)**: $\text{SSS} \in [73, 87]$ (Compliant across all regulatory cutoffs)
- **Campus Champion (Purple)**: $\text{SSS} \ge 88$ (Tier-1 Super Dream placement ready, club leads)

---

## 🎯 Demo Showcase Personas for Judges

1. **Rohan Verma (`1RV22CS042`) — Critical Intervention Required**
   - *Problem:* 2 backlogs, 64.5% attendance (< 75% cutoff), LMS inactive for 14 days, SSS: 54.
   - *Demo:* Open 360° Dossier to see the **Explainable AI (XAI)** drivers. Then click **"Simulate What-If"** and slide attendance to 80% and clear backlogs to watch the score jump from **54 ➔ 78**!
2. **Priya Sharma (`1RV22AI018`) — Unbalanced Tech Prodigy**
   - *Problem:* 94 coding score, 4 hackathon podiums, but skipping theory classes (68.2% attendance) risking statutory exam debarment.
   - *Demo:* Shows the platform's ability to catch non-obvious risks beyond standard GPA filters.
3. **Ananya Iyer (`1RV21CS089`) — Placement Vulnerable Academic Star**
   - *Problem:* 9.12 CGPA topper, 94% attendance, but fails coding timed tests (51/100) and mock interviews (48%).
   - *Demo:* Open **AI Intervention** to see how the system prescribes coding bootcamps and mock interview coaching instead of generic tutoring.
4. **Tanvi Patel (`1RV21CS112`) — Campus Champion**
   - *Exemplary:* 9.48 CGPA, 98 coding, GDSC Lead, Tier-1 ready. Shows reward & peer-mentor matching.

---

## 🛠️ Software Stack

- **Runtime:** Node.js v24+ / Vite 6
- **Frontend:** React 19, Tailwind CSS
- **Visual Analytics:** Chart.js, react-chartjs-2, Lucide Icons, Canvas Confetti
- **Exporting:** Dynamic CSV Generator, Print-Optimized Dossier Stylesheet


## Sign in and create account

The app now opens on a sign-in page. Three roles control what each person can see:

| Role | Can open |
|---|---|
| Student | Only their own analytics, linked to the USN they registered with |
| Faculty | Student lookup, Faculty & Admin dashboard, Student cohorts, Export, Print |
| Administrator | Everything faculty can, plus Data Integration and Upload Student File |

**Demo accounts** (created automatically on first launch):

| Role | Email | Password |
|---|---|---|
| Student (Rohan Verma) | rohan.verma@campus.edu | Student@123 |
| Faculty | faculty@campus.edu | Faculty@123 |
| Administrator | admin@campus.edu | Admin@123 |

**Creating an account**
- Students enter their USN. It must exist in the student data, and each USN can have only one account.
- Faculty and administrators enter the staff access code `CAMPUS2026` (change it in `src/utils/authStore.js`).
- Passwords need 8+ characters with a letter and a number.

**Important:** accounts are stored in the browser (localStorage) with salted SHA-256 password hashes.
This is fine for a demo, but it is not real security. For production, move `signUp` and `signIn` in
`src/utils/authStore.js` to a backend and keep the same function signatures.
