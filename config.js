/*
 |──────────────────────────────────────────────────────────────
 |  GYMHOLICS — EmailJS Config  (config.js)
 |──────────────────────────────────────────────────────────────
 |
 |  ⚠  SECURITY RULES:
 |     1. Add this file to .gitignore — NEVER commit to Git
 |     2. Keep this file on your server only
 |     3. Your HTML just loads this script — no keys in HTML
 |
 |  HOW TO GET YOUR KEYS:
 |     1. Sign up free at https://www.emailjs.com
 |     2. Email Services → Add Service → choose Gmail
 |        → Authenticate your Gmail → copy the Service ID
 |     3. Email Templates → Create Template
 |        Set "To Email" → info@gymholics.in
 |        Use these variables in the template body:
 |          Name:     {{from_name}}
 |          Email:    {{from_email}}
 |          Phone:    {{phone}}
 |          Program:  {{program}}
 |          Message:  {{message}}
 |     4. Account → General → copy your Public Key
 |     5. Paste all three below and save
 |
 |──────────────────────────────────────────────────────────────
*/

const EMAILJS_CONFIG = {
  publicKey:  'YOUR_PUBLIC_KEY',    // Account → General
  serviceId:  'YOUR_SERVICE_ID',    // Email Services tab
  templateId: 'YOUR_TEMPLATE_ID',   // Email Templates tab
  toEmail:    'info@gymholics.in',  // destination inbox
};
