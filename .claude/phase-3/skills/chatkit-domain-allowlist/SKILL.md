---
name: chatkit-domain-allowlist
description: OpenAI ChatKit domain allowlist and deployment for Phase III. Use when deploying the chatbot frontend or configuring OpenAI domain/key settings.
---

# ChatKit Domain Allowlist (Phase III)

## Hosted ChatKit Requirement

Before deploying the chatbot frontend to production, you must add your domain to OpenAI's allowlist.

## Steps

1. **Deploy frontend** to get a production URL, e.g.:
   - Vercel: `https://your-app.vercel.app`
   - GitHub Pages: `https://username.github.io/repo-name`
   - Custom: `https://yourdomain.com`

2. **Add domain in OpenAI**:
   - Go to: https://platform.openai.com/settings/organization/security/domain-allowlist
   - Add domain (URL without trailing slash).

3. **Domain key**: After adding the domain, OpenAI provides a domain key. Use it in ChatKit config.

## Environment

- `NEXT_PUBLIC_OPENAI_DOMAIN_KEY=your-domain-key-here` (or equivalent per ChatKit docs).

## Note

- Local development (`localhost`) often works without allowlist. Production/hosted ChatKit requires the domain to be allowlisted.
