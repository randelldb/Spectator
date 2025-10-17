export const DEFAULT_GUIDELINES = `# Junie Project Guidelines (Spec-Driven Workflow)

1. **Before starting any work**
    - Always read the corresponding \`/specs/<feature>/spec.md\` in full.
    - Do not make assumptions or invent requirements not stated in the spec.
    - If something is unclear or missing, pause and request a spec update before continuing.

2. **When creating or updating code**
    - Implement only what is defined in the spec and plan.
    - Follow the conventions and technologies described in \`/specs/<feature>/plan.md\`.
    - Keep changes small, isolated, and directly related to the described behavior.
    - Maintain clean and readable structure; match the stack and architecture outlined in the plan.

3. **When a task is unclear**
    - Refer to \`/specs/<feature>/tasks.md\` for the detailed breakdown.
    - If a task conflicts with the spec or plan, stop and request clarification.
    - Never guess or improvise feature behavior.

4. **Pull Requests**
    - Link to the corresponding spec (e.g., \`/specs/<feature>/spec.md\`).
    - Describe which tasks were completed.
    - Include or reference test updates verifying the described behavior.
    - Do not merge if the spec or plan was skipped or violated.

5. **Using the Plan**
    - \`/specs/<feature>/plan.md\` defines the technical stack, architectural layout, and implementation strategy.
    - Always align with the plan when choosing frameworks, libraries, or coding patterns.

6. **Using the Tasks**
    - \`/specs/<feature>/tasks.md\` provides the step-by-step sequence to deliver the feature.
    - Complete and verify each task before moving on to the next.
    - Update task status (e.g., in checklist form) as progress is made.

7. **Quality & Validation**
    - The result must behave as described in the spec and meet the visual/functional details.
    - Add automated tests that reflect the spec’s validation section.
    - Ensure smooth UX, responsive design, and proper integration with the rest of the app.

8. **Communication**
    - If the spec, plan, or tasks become outdated, request updates before implementing.
    - Collaborate through documented changes — specs and plans are the source of truth.
`;