const db = require('../config/db');

class Solution {
  static getSolutionByIncidentType(incidentType) {
    const solutions = {
      'phishing': {
        title: 'Immediate Actions for Phishing Attack',
        steps: [
          'Do NOT click any links or download attachments from the suspicious email',
          'Change passwords for any accounts you may have accessed recently',
          'Enable two-factor authentication on all important accounts',
          'Check your bank and credit card statements for unauthorized transactions',
          'Report the phishing email to your email provider',
          'Run a full antivirus scan on your device'
        ],
        prevention: [
          'Always verify sender identity before clicking links',
          'Check URLs carefully for misspellings or suspicious domains',
          'Use official websites instead of email links for banking/shopping',
          'Keep your browser and security software updated'
        ],
        urgency: 'high',
        timeframe: 'Act immediately - within 1 hour'
      },
      'identity_theft': {
        title: 'Identity Theft Response Plan',
        steps: [
          'Contact your bank and credit card companies immediately',
          'Place a fraud alert on your credit reports',
          'File a report with local police',
          'Contact the Federal Trade Commission (FTC)',
          'Monitor your credit reports closely',
          'Consider freezing your credit reports',
          'Document all fraudulent activities with screenshots'
        ],
        prevention: [
          'Never share personal information via email or phone',
          'Use strong, unique passwords for all accounts',
          'Regularly monitor your financial statements',
          'Shred documents containing personal information'
        ],
        urgency: 'critical',
        timeframe: 'Act immediately - within 30 minutes'
      },
      'financial_fraud': {
        title: 'Financial Fraud Emergency Response',
        steps: [
          'Contact your bank/financial institution immediately',
          'Freeze or cancel affected cards and accounts',
          'Change all online banking passwords',
          'Review recent transactions for other unauthorized activity',
          'File a dispute for fraudulent charges',
          'Save all evidence (emails, transaction records, screenshots)',
          'Consider placing a credit freeze'
        ],
        prevention: [
          'Use secure networks for online banking',
          'Enable account alerts for all transactions',
          'Never share banking details via email or phone',
          'Regularly review account statements'
        ],
        urgency: 'critical',
        timeframe: 'Act immediately - within 15 minutes'
      },
      'cyberbullying': {
        title: 'Cyberbullying Response Guide',
        steps: [
          'Do not respond to the bully - this often escalates the situation',
          'Take screenshots of all bullying messages/posts as evidence',
          'Block the bully on all social media platforms',
          'Report the behavior to the platform administrators',
          'Talk to a trusted adult, counselor, or friend',
          'Consider temporarily deactivating social media accounts',
          'Keep a record of all incidents with dates and times'
        ],
        prevention: [
          'Keep personal information private on social media',
          'Use privacy settings to control who can contact you',
          'Think before posting - avoid sharing sensitive content',
          'Be cautious about accepting friend requests from strangers'
        ],
        urgency: 'medium',
        timeframe: 'Address within 24 hours'
      },
      'ransomware': {
        title: 'Ransomware Attack Response',
        steps: [
          'DO NOT pay the ransom - there is no guarantee you will get your data back',
          'Immediately disconnect the infected device from internet and network',
          'Do not turn off the computer - this may make recovery harder',
          'Contact IT support or a cybersecurity professional',
          'Report to law enforcement and FBI IC3',
          'Check if you have recent backups of your data',
          'Run antivirus scans on other devices on your network'
        ],
        prevention: [
          'Regularly backup your important data offline',
          'Keep operating system and software updated',
          'Use reputable antivirus software',
          'Be cautious with email attachments and downloads',
          'Enable firewall protection'
        ],
        urgency: 'critical',
        timeframe: 'Act immediately - disconnect within 5 minutes'
      },
      'social_media_fraud': {
        title: 'Social Media Fraud Response',
        steps: [
          'Change your social media account passwords immediately',
          'Enable two-factor authentication',
          'Review and revoke suspicious app permissions',
          'Check recent posts and messages for unauthorized activity',
          'Notify friends/followers about potential fake messages from your account',
          'Report the fraud to the social media platform',
          'Review privacy settings and friend lists'
        ],
        prevention: [
          'Use strong, unique passwords for each social media account',
          'Be cautious about clicking links in messages',
          'Verify friend requests from people you know',
          'Regularly review app permissions and privacy settings'
        ],
        urgency: 'high',
        timeframe: 'Act within 2 hours'
      },
      'online_shopping_fraud': {
        title: 'Online Shopping Fraud Response',
        steps: [
          'Contact your bank/credit card company to report fraudulent charges',
          'Dispute the charges with your payment provider',
          'Save all evidence (emails, receipts, website screenshots)',
          'Report to the Better Business Bureau and FTC',
          'Leave reviews on consumer protection websites',
          'Check if the website is still active and report to hosting provider',
          'Monitor your accounts for additional unauthorized charges'
        ],
        prevention: [
          'Shop only on secure websites (look for HTTPS and padlock icon)',
          'Research sellers and read reviews before purchasing',
          'Use credit cards instead of debit cards for online purchases',
          'Avoid deals that seem too good to be true'
        ],
        urgency: 'medium',
        timeframe: 'Act within 24-48 hours'
      },
      'email_scam': {
        title: 'Email Scam Response Plan',
        steps: [
          'Do not reply to or interact with the scam email',
          'Mark the email as spam/junk',
          'Delete the email from your inbox and trash',
          'If you clicked links, change passwords for any accounts accessed',
          'Run a security scan on your device',
          'Report the scam to your email provider',
          'Forward the scam email to the Anti-Phishing Working Group'
        ],
        prevention: [
          'Be skeptical of unsolicited emails asking for personal information',
          'Verify sender identity through independent means',
          'Look for spelling and grammar errors in emails',
          'Hover over links to see actual destinations before clicking'
        ],
        urgency: 'medium',
        timeframe: 'Act within 4 hours if you interacted with the email'
      },
      'other': {
        title: 'General Cybercrime Response',
        steps: [
          'Document everything - take screenshots and save evidence',
          'Do not delete anything that might be evidence',
          'Change passwords for potentially affected accounts',
          'Contact relevant authorities or organizations',
          'Notify your bank if financial information may be compromised',
          'Run security scans on your devices',
          'Consider consulting with a cybersecurity professional'
        ],
        prevention: [
          'Keep all software and operating systems updated',
          'Use strong, unique passwords with two-factor authentication',
          'Be cautious about sharing personal information online',
          'Regularly backup important data',
          'Use reputable antivirus software'
        ],
        urgency: 'medium',
        timeframe: 'Act within 24 hours'
      }
    };

    return solutions[incidentType] || solutions['other'];
  }

  static getAllSolutions() {
    return {
      'phishing': this.getSolutionByIncidentType('phishing'),
      'identity_theft': this.getSolutionByIncidentType('identity_theft'),
      'financial_fraud': this.getSolutionByIncidentType('financial_fraud'),
      'cyberbullying': this.getSolutionByIncidentType('cyberbullying'),
      'ransomware': this.getSolutionByIncidentType('ransomware'),
      'social_media_fraud': this.getSolutionByIncidentType('social_media_fraud'),
      'online_shopping_fraud': this.getSolutionByIncidentType('online_shopping_fraud'),
      'email_scam': this.getSolutionByIncidentType('email_scam'),
      'other': this.getSolutionByIncidentType('other')
    };
  }
}

module.exports = Solution;