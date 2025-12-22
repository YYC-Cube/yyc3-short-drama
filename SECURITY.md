# Security Policy

## Critical Security Requirements

### JWT Secret Configuration

**IMPORTANT**: This application requires a strong JWT secret for secure authentication.

#### Requirements:
- **JWT_SECRET** environment variable MUST be set before starting the application
- The secret MUST be at least 32 characters long
- Use a cryptographically secure random string
- Never commit secrets to version control

#### Generating a Secure JWT Secret:

```bash
# Using OpenSSL (recommended)
openssl rand -base64 48

# Using Node.js
node -e "console.log(require('crypto').randomBytes(48).toString('base64'))"

# Using Python
python3 -c "import secrets; print(secrets.token_urlsafe(48))"
```

#### Setting the JWT Secret:

Create a `.env.local` file in the project root with:

```env
JWT_SECRET=your_generated_secure_random_string_here_minimum_32_chars
```

**Example** (DO NOT USE IN PRODUCTION - FOR ILLUSTRATION ONLY):
```env
# ⚠️ WARNING: This is just an example format!
# ⚠️ NEVER use this example value in any environment!
# ⚠️ Generate your own unique secret using the commands above!
JWT_SECRET=8a7d9c6b5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b
```

#### Security Impact:

Without a properly configured JWT_SECRET:
- ❌ Application will fail to start (secure by default)
- ❌ Authentication will not work
- ✅ Prevents use of weak default secrets
- ✅ Forces secure configuration

## Vulnerability Fix History

### 2024-12-22: Fixed JWT Secret Hardcoding Vulnerability

**Severity**: Critical

**Description**: 
Previous versions contained a hardcoded fallback JWT secret (`"your-secret-key-change-in-production"`) which could allow attackers to:
- Forge authentication tokens
- Bypass authentication mechanisms
- Impersonate any user account
- Gain unauthorized system access

**Fix**:
- Removed all hardcoded JWT secret fallback values
- Implemented centralized JWT configuration with validation
- Application now fails fast if JWT_SECRET is not properly configured
- Added minimum length validation (32 characters)
- Updated documentation with security requirements

**Affected Files**:
- `middleware.ts`
- `app/api/auth/login/route.ts`
- `app/api/auth/register/route.ts`
- `app/api/auth/me/route.ts`

**Action Required**:
All deployments must set a strong JWT_SECRET environment variable.

## Supported Versions

Use this section to tell people about which versions of your project are
currently being supported with security updates.

| Version | Supported          |
| ------- | ------------------ |
| 5.1.x   | :white_check_mark: |
| 5.0.x   | :x:                |
| 4.0.x   | :white_check_mark: |
| < 4.0   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability, please email: admin@0379.email

**Please include**:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

**Response Time**:
- Initial acknowledgment: Within 24 hours
- Status update: Within 48 hours
- Fix timeline: Depends on severity (Critical: 24-48 hours, High: 1 week, Medium: 2 weeks)

We take security seriously and appreciate responsible disclosure.
