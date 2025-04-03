# **OXATK - Email & DNS Configuration Toolkit**

## **Overview**
OXATK is a comprehensive toolkit designed to assist IT support teams in managing and troubleshooting email configurations and DNS settings. It fetches and displays critical information about domain configurations, email records, and DNS history. This tool allows IT professionals to efficiently diagnose issues related to email services and DNS settings, thereby improving operational efficiency.

## **Features**

### **1. Email Configuration Checks**
OXATK provides an easy way to verify the setup of essential email configuration records such as:
- **MX Records**: Mail Exchange records that determine the mail server responsible for receiving email for a domain.
- **SPF Records**: Sender Policy Framework records used to prevent email spoofing by specifying which mail servers are allowed to send email on behalf of a domain.
- **DKIM Records**: DomainKeys Identified Mail records that authenticate email messages to prevent tampering and impersonation.
- **DMARC Records**: Domain-based Message Authentication, Reporting & Conformance records that help prevent email phishing.

### **2. DNS Record Lookup**
This feature allows users to check and verify different types of DNS records for a specific domain:
- **A Records**: Map a domain name to an IP address.
- **CNAME Records**: Alias one domain to another.
- **MX Records**: Specifies mail servers for email routing.
- **TXT Records**: Store arbitrary text data, often used for verification purposes like SPF.

### **3. DNS Record History**
OXATK enables the retrieval of historical DNS record data for a given domain. This is particularly useful for IT support teams who need to track changes over time or investigate domain configuration changes that may have caused service disruptions.

### **4. Domain Registration Status**
The toolkit provides a feature to check the registration status of a domain. This feature tells whether a domain is:
- Registered or unregistered.
- The registration and expiration dates of the domain.

### **5. User-friendly Interface**
OXATK includes a simple yet powerful frontend that allows users to input a domain and instantly retrieve the configuration details in a user-friendly format. The frontend communicates seamlessly with the backend to fetch the required data and present it to the user.
