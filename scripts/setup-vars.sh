#!/bin/sh
# Generates .dev.vars from 1Password secrets.
# Run with: op run --env-file=.env.1password -- sh scripts/setup-vars.sh

printf 'DIRECTUS_URL=%s\nDIRECTUS_TOKEN=%s\nCONTACT_EMAIL=%s\nSENDER_URL=%s\nSENDER_API_KEY=%s\n' \
  "$DIRECTUS_URL" \
  "$DIRECTUS_TOKEN" \
  "$CONTACT_EMAIL" \
  "$SENDER_URL" \
  "$SENDER_API_KEY" > .dev.vars

echo ".dev.vars created successfully"
