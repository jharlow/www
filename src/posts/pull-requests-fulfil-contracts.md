---
title: Pull requests fulfil contracts
date: '2024-03-16'
thumbnail:
  file: 'pr-post-texture.avif'
  description: A texture of blue paint on canvas
description: Any pull request that is worth approving has a contract outling a reason to change.
tags:
  - technical
  - documentation
  - pull-requests
---

When you open a pull request, what are you trying to achieve?

For most of us, the answer is _'to introduce change'_. Stripped down to the studs, a pull request is simply a mechanism to decide if we should introduce some change. For developers, the thing being changed is typically software, but it could also be anything else that Git can represent.

On top of that (admittedly rather conceptual) understanding, we can attribute some more concrete entities:

- The `change` is the diff that will merge once we approve the pull request.
- The `mechanism` is the body, conversation and metadata of the pull request.
- The `decision` is the action taken that triggers the `change` (e.g. Two approvals).

## We have a contract

That definition covers how change is executed, but it leaves out an essential question; _why do we need the_ `change`? After all, it's easier and less risky not to change. After this can we ask; _how are our_ `changes` _satisfying that need?_

In answering the two questions above, we have actually formed an contract. People need this repo to change and someone has agreed to enact those changes for them. This contract might be formal or informal, and it might be explicit or implicit, but if you can't articulate it, why are you making the change? A pull request has become final step in fulfilling that contract.

## The benefits of an explicit contract

Framing a pull request in this way layers purpose onto the `mechanism` we use and `decision` we make. For one, our `mechanism` must explicitly include the contract that we are executing. Otherwise, we should automatically reject it -- it doesn't have a purpose. Even if we think the contract is implicitly obvious, we should include it because it provides context to our audit trail and to reviewers who are not familiar with a particular issue.

Because the `mechanism` is purposefully flexible (it's a Markdown document and a commenting feature), we can frame this contract how we like. Some people use "Why" and "How" phraseology. Personally, I like to be much [more specific](https://github.com/jharlow/nvim/blob/main/snippets/prdesc.json), with headings like "Why change this code" that identifies a clear reason to change and "Acceptance criteria" that enumerates what new behavior/changes will fulfil that purpose (I have had a lot of success describing this with [Gherkin Syntax](https://cucumber.io/docs/gherkin/)).

By making it blindingly obvious what the contract is within the `mechanism`, we provide clearer criteria for the `decision`. We often have clear documents like "Definition of Done" or "Code Standards", even automated tooling to provide a technical framework (is this a contract too?) for our approval decisions, and this contract is the missing framework for evaluating if we met the actual purpose of the `change`.
