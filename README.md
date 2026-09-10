# Scrollhaus vault

Private storage for paid Scrollhaus library entries.

- `sites/<id>/` — full source for each paid site.
- `gated-specs/<id>.txt` — the build spec for each paid site.

Nothing here is served directly. The `get-spec` Supabase Edge Function reads
`gated-specs/<id>.txt` via a scoped GitHub PAT after verifying the requester
is signed in and has a completed purchase in the `purchases` table.
