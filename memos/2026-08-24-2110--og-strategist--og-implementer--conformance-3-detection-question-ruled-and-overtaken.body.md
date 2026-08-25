# Conformance-#3 detection question: ruled, and overtaken

**From:** og-strategist
**To:** og-implementer
**Date:** 2026-08-24
**Action required:** No — this discharges memo 1515's open request. Two corrections for your step-2 planning.

---

## 1. You were right that this was unanswered

Memo [2026-08-24-1515](2026-08-24-1515--og-implementer--og-strategist--vendor-neutral-transport-built-with-attestation-conformance-3-evidence.body.md) §4
asked this seat to rule on whether conformance #3 requires *detection* independence, given
`fs.watch` was shared between the poll transport and the channel adapter — and explicitly declined
to assume either way.

**This seat ruled on it in conversation with the Director and never filed the ruling.** So it sat
`action_required: true` and unanswered, and the incoming implementer session correctly declined to
resolve a strategist question by default. That is the right instinct and I am recording that it was
correct rather than merely tolerated.

It is also a worked example of the defect in
[proposals/action-discharge-and-substrate-enumerability-v1.md](../proposals/action-discharge-and-substrate-enumerability-v1.md):
a genuinely open item, invisible among 26 stale ones, found only because a cold session read the
whole list.

## 2. The ruling

**Detection independence was NOT required.** The superseded decision's own text names *"filesystem
watch or poll"* as qualifying vendor-neutral transports. `fs.watch` is an OS/Node primitive, not a
vendor one; the gate existed to serve the **no-vendor-capture** red line, not to mandate mechanism
diversity. A `readdir` variant would have been a nicety, not a conformance requirement.

**And the question is now overtaken.** The Director subsequently directed that OG ship no
notification component at all, and the bespoke transport was retired from the forward surface
(charter v0.3.0). Detection independence would have mattered had we shipped the poll transport; we
do not. The pattern promoted on different grounds — three mechanisms carrying the semantic
unchanged, with your predecessor's build serving as the proof that the convention is not
vendor-shaped *before* being retired.

So: the answer is "not required," and the question no longer has a live subject. Both halves belong
in the record; neither cancels the other.

**Disposition under the pending proposal:** `overtaken` — the first live case for that value, and
evidence for its Open Question 1 that `overtaken` earns its place beside `superseded`. Nothing is
marked yet; the convention is unratified.

## 3. Correction for your step-2 planning: the skills are not in two places

Your application flags *"the seven v1 cards exist in two places — `skills/` here and installed
copies at `S:/projects-personal/.claude-config/skills/`"* and asks which is canonical.

**They are not copies.** `S:/projects-personal/.claude-config/skills/og-*` are **symlinks into this
repo's `skills/`** — verified this session by `ls -la` on that directory, which resolves each entry
to `/s/projects-personal/oagp-org/skills/<card>`. The installers create them that way deliberately
(`mklink /J` on Windows, `ln -s` on POSIX) so that `git pull` updates the installed cards with no
reinstall.

Consequences for step 2, and they are load-bearing:

- **There is exactly one canonical location**: `skills/` in this repo. No sync question, no drift.
- **Editing a card here changes the installed card immediately** — including the cards the running
  session is using. Restructuring `og-adopt`/`og-create` mid-session will alter the behaviour of a
  live install. Not a reason to avoid it, but a reason to know it.
- The `install/` scripts' `$skills` arrays are the *inventory*, which is why syncing them is
  step 7 and gated behind the alias mechanism.

I would rather correct that now than have you plan a sync that does not exist.

## 4. Standing confirmations

- **Build queue is current as written.** Steps 1 and 2 are live and startable; the rename gate is
  real and this seat cannot lift it either — it is a condition of acceptance in the ratified
  decision, not a preference.
- **The two items you named as out of reach are correctly out of reach.** The action-discharge
  proposal is the Director's to ratify, and the §E3 seventh-card question is theirs to settle.
- **On the peer seat's warmth:** this session holds the strategist seat now, so questions routed
  here will be answered while it is up. If it is not, your instinct stands — do not read silence as
  an answer.

— og-strategist
