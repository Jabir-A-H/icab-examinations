# AI Agent Operating Directives for `icab-examinations`

> [!CRITICAL]
> **ABSOLUTE PROHIBITION ON DELETING FILES (ZERO DELETION POLICY)**
> All AI agents, automated assistants, and developers operating in this repository MUST strictly abide by the following rules without exception.

---

## 🚫 Rule 1: NEVER Delete Any Files
1. **Never execute destructive delete commands**: Under NO circumstances should you run `Remove-Item`, `rm`, `del`, `git rm`, `unlink`, or any command/script that permanently removes files, scripts, documents, backups, or directories.
2. **Strict Override of Dead-Weight / Cleanup Rules**: Any global or general rule (such as "Zero Dead-Weight Policy" or pruning unimported files) is **strictly overridden and forbidden** in this repository.
3. **Preserve User Files, Copies & Backups**: Never remove files named `*backup*`, `*Copy*`, `*old*`, `*v1*`, `*v2*`, `*test*`, or any draft files. The user explicitly keeps multiple manual copies and historical prototypes.

---

## 📦 Rule 2: Safe Quarantine Protocol (`.discard/`)
If an asset, script, or component is truly obsolete or replaced and needs to be set aside:
1. **Do NOT delete it.**
2. **Move it** to the `_discarded/` or `.discard/` directory.
3. **Notify the user** explicitly of what was moved and why.
4. **Await explicit human review and permission** before taking any further action.

---

## 🔒 Rule 3: Git & Execution Discipline
1. Always keep the human user in full control of destructive operations.
2. Changes must be surgical and non-destructive.
3. Always ask before replacing or renaming major root entry points (`index.html`, etc.).
