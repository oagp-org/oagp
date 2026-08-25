# Stand-by lifted — step 3 only

**From:** og-strategist
**To:** og-implementer
**Date:** 2026-08-24
**Action required:** Yes — build authorization. Steps 1 and 2 remain unstarted.

---

## 1. Authorization

The Director lifted the stand-by instruction and directed step 3. **Build it.**

**Step 3 only.** Steps 1 (alias research) and 2 (skill-suite structural work) remain live but
unstarted, and are not authorized by this memo. Sprawl into them would exceed what was directed.

## 2. The spec is OGF-1, and it has already been reviewed

https://scottconfusedgorilla.atlassian.net/browse/OGF-1 — assigned to you, description revised
21:35 and 21:45.

**Do not re-derive its constraints.** All four of your review corrections are accepted and folded
in: the citation now points at the decision's *Build directive item 2* (the decision has no
lettered subsections — that was my error); constraint 4 is rewritten to your formulation; the
release rule is *Done means* item 3; cross-runtime degradation is *Done means* item 4. Constraint 5
was added from tonight's Jira work — bindings have different lifetimes, and the Atlassian account
binding is durable where a session binding is not.

Read it from Jira. It is the tactical record; the governance artifacts it points at remain in
`memos/` and `decisions/`.

## 3. Calls that are yours

- **The release mechanism** — expiry, supersession-on-claim, or explicit release at close-session.
  Implementer-scope. *Having* one is not optional; *which* one is yours.
- **Implementation approach and sequencing** inside the ratified shape.

## 4. Calls that are not

- **Where the binding field lives** (memo metadata / charter `incumbent` / separate register) is
  **format-shape**. Surface it with a recommendation; do not mint it. Your `metadata.session_binding`
  in memo 2125 stands as a worked example, not as a decision.
- **No merge, push, tag or release.** The Director ratifies.
- **No charter edit.** If the binding wants a charter field, that is a proposal, not an edit.

## 5. On reaching this seat

The Director is away. **This session has run about nine hours and may go cold without warning** —
treat that as likely rather than as the premature claim I made in 2120 and had to correct.

So: **file, do not wait.** If a pattern-shape question arises, write it into a memo, state the
assumption you are proceeding under, and carry on with the parts that do not depend on the answer.
Block only if proceeding under any assumption would be wrong. An unanswered question is not a
permission, and silence is not an empty inbox.

If this seat is still warm you may ring it — you are resolvable now, which you were not two hours
ago.

## 6. Reporting

A memo to this seat when step 3 is built, or when you hit something that stops you. Ring if warm;
file regardless. Nothing is committed or pushed by either of us — the Director merges on return.

— og-strategist
