---
title: Effective remote work communication patterns
date: '2025-11-10'
description: A reflection on some of the patterns I've found most effective for remote and asynchronous teams.
tags:
  - blog
  - non-technical
  - remote
---

In many ways, I think I've been lucky to have spent my career working in very different communication environments. From working in the great outdoors to teaching to office buildings and remote, I've been able to sample a lot of different communication styles which as with any skill-set, gives you the opportunity to reflect critically on one of them and choose the things you think work best from each.

For a long time now though, I've been working remotely as my default mode. I've come to feel that this is my preferred way of working, but I also have to recognize that it comes with a lot of tradeoffs. Having spent a lot of time working to overcome or at least "smooth over" them, I wanted to document the five most effective patterns I've found.

## Place all project-scoped communication in channels

When you don't have the ability to "tap-on-the-shoulder" as easily, it's so much more critical that good information is accessible and searchable. One of the most common anti-patterns that prevents this is placing information about projects in direct messages. This is a very harmful practice because it makes the information:

- invisible and anyone outside of the direct message
- much harder to find by search
- hard to share without widening an otherwise private conversation

This practice should be quickly addressed because the more information is in a direct message, the harder it becomes to move it into an appropriate channel, because long-running DMs tend to move towards being "general" channels by default.

It's therefore critical to recognize incoming DMs that violate this principle and politely redirect them. I will often copy over people's entire message in a `blockquote` and then respond in a public channel to do so, tagging them in the new post. A good smell is; _"if I deleted this entire message chain tomorrow, would it matter?"_ if it would, consider if it should be moved into a channel. Direct messages should be ephemeral or necessarily private.

If you do this well, all communication about the project will be in one place, which allows you to write much more expressive search queries, refresh your context on a project with confidence, and avoid "notification bloat" by scoping your notification preferences by project. If that channel becomes too noisy, it's either time to organize by using threads more aggressively (preferable), or by creating separate channels for specific issues with clear backlinks from/to the original channel.

_Side note_: It is comically easy to convert a DM into a public channel in Slack. Look for the dedicated button in the DM settings. It'll set the channel to public by default, but one more click and it can be public again.

## Provide daily updates

A problem that I've found remote teams to fall into much more often than on-site is situational awareness (or a lack of it). When I can't physically see or check in with what my colleagues are doing, it's easy to lose track of where the work that I'm doing fits into the work that they're doing and this can result in a lot of operational wastage as co-workers get blocked, or are waiting on inputs from us when we would have known to intervene earlier had we been able to check in on them at lunch.

One of the most effective practices I have found to mitigate against this is a simple daily update. Done correctly, the whole team providing a daily update can do wonders for everyone. It means the most out-of-date any member of the team can become is twenty four hours, and I've found them to be so efficient at updating the team on critical information that they make "standup" meetings obsolete.

After much experimentation, I've found that a good daily update should aim to communicate:

- what outcomes were achieved today
- what the plan is for tomorrow
- any inputs I need from other people to accomplish tomorrow's task

Each of these aims gets their own subheading in my daily update, and I try to be conscious about meeting them when I write them out. For example, while the heading for outcomes simply reads _**"Today"**_, I aim to highlight the key outcomes (delivered value to the business) instead of outputs (the mechanics of what I did). For example:

| ❌ Output                                           | ✅ Outcome                            |
| --------------------------------------------------- | ------------------------------------- |
| Filled out tickets for the `brand` module refactor  | Nothing                               |
| Ran three back-to-back interviews                   | Nothing                               |
| Worked on adding the `POST` `/transaction` endpoint | Customers can now post transactions   |
| Upgraded Tailwind to v4 in `www`                    | Tailwind in `www` now loads 2x faster |

Note that for many items which would normally be fair game for a standup or "today" section, I would not include/show anything in my update. In fact, some updates might not have a today section at all. The intention of the outcome section is explicitly to notify stakeholders when outcomes are complete. If none were completed that day, why say anything?

I recognize this is not how most standup/daily updates work, but I think this is an unreasonably effective practice which transforms the "what happened today" section from being almost entirely noise to almost entirely signal. In general, I now believe that if you feel the need to include these _outputs_, it's probably an indicator that:

1. You are insecure about how much is getting done (work on performance or your sense of self-worth if true)
2. Your workplace is genuinely output obsessed and does not have enough clarity on deliverable outcomes (work on culture or leave if true)

The remaining sections are relatively self-explanatory, but are where most of the true value are for your immediate team. The "plan for tomorrow" is a brief (single short sentence) synopsis of the most important task I have to accomplish tomorrow. The "needed inputs" is as long as it needs to be, and outlines dependencies I have on other teammates/people to achieve the plan for tomorrow. Generally, I will explicitly label these bullet points as `blocker` or `incoming blocker` as appropriate.

<details>
<summary>Sample daily update</summary>
</details>

## Reduce scheduled meeting frequency and meeting ping

As mentioned earlier, among the biggest trade-offs in remote work is losing "tap-on-the-shoulder". This is painful for two reasons:

1. Teammates are unable to get quickly unblocked or sanity check work they are doing. Instead, they have to schedule a meeting with you.
2. When you have to schedule every synchronous interaction you have, no interactions are able to take up just the right amount of time. You either stretch out or compress your conversation to fit the allotted time. This is how some teams end up with their entire calendars full of mostly "fluff" conversations.

The solution to both of these problems is to focus on reducing two metrics: overall time in scheduled meetings, and time-to-meeting.

To achieve the former of these, I strongly believe in the importance of instilling a reading and writing culture in your team. The written word is incredibly efficient, and 95% of all communications within your team should use it. Not only does this build up searchable context (see above), it also massively decreases the amount of time which your team needs to spend in meetings.

A great example/smell of this is the classic "sync" meetings. Almost all of the time, these would be completely resolvable asynchronously if people bothered to write/read. When they do demand synchronous discussion, the difference between a sync meeting coming out of an existing document vs. without one can be eye-opening. With an existing document and a good facilitator, your conversation can be short and to the point - expanding existing threads and focusing on decision making. Without them, they'll tend to be wandering, unfocused, and worst of all, long.

At the same time, it's critical to reduce meeting ping, which is the time it takes for a request to meet to result in the meeting taking place. Happily, one of the biggest causes of high meeting ping is a high-meeting-frequency culture, because having one increases the likelihood that your colleague won't be free at any given time. Once you have a low meeting culture, and it's more likely that any given person will be free to chat, it's important to set up teams to spring into meetings as quickly as humanly possible.

There are lots of ways to do this, but the best general advice I have is to strongly encourage the use of Slack commands like `/meet` and `/zoom` which put a meeting into a thread or direct message without needing to schedule anything or leave Slack.

## Descriptive channel prefixes

A lot of my advice about remote working revolves around the general principle that as much knowledge as possible in your organization should be searchable by anyone in the organization.

Part of that effort (as discussed above) means keeping information in **public** channels, but another part of that effort means making the information easy to search for.

One important way to do this is to ensure that the messages you write contain keywords that will effectively breadcrumb future members of your organization to the right place. For example, if you're responding to a colleague about how to resolve an issue, it's a good practice to include the key part of the error in the thread somewhere so that future searches will be able to find that thread.

However doing a workspace-wide search will often produce a dizzying number of results from all kinds of contexts. It's therefore important to be able to easily scope down your search to appropriate channels and senders that are likely to contain what you're looking for.

I have found that the best way to promote this kind of scoping is with clear channel prefixes. Good prefixes allow members of an organization to make sensible guesses that give them auto-fill responses for channels that are close to their intent.

Here are some prefixes that I find very helpful:

- `team-{team_name}` can be small teams like `general-ledge` or teams of teams like `engineering`
- `team-{team_name}-proj-{proj_name}`
- `guild-{guild_name}`
- `temp-proj-{temp_proj_name}`
- `app-{app_name}` like a guild but for discussing an app/service
- `external-{external_org}` for communicating with partners out of the org
- `incident-{incident_number}`

You get the idea. The important thing is that not only does this make scoping down search easier and more predictable, it also makes finding the right channel easier in general via `Cmd-G`, which makes everyone just that little bit faster.

## No no-context meetings

A final peeve of mine, and something I'll only comment briefly on, is no-context meetings. These are random meetings called "You / Them" on your calendar that state no purpose, and where the booking person ("them") doesn't message/communicate a reason for the call to you.

Most of the time, these conversations are not necessary or would be more effective with a asynchronous chat about the meeting subject in advance to prime the conversation. Failing to announce the subject therefore it causes redundant communication overhead for you because you need to ask what the purpose of the meeting is to the person in advance of it.

Additionally and extremely importantly, it's easy to induce a lot of stress and anxiety in people by dropping random chats in their calendar or asking for a 'quick call'. This is especially true if you are above the person you are meeting with in an org chart, even if you otherwise have a culture of psychological safety.

Obviously, it's important to be polite when this happens; we live in a fast-paced work culture and everybody misses this sort of thing once in a while. However, if this is an engrained part of your culture, you need to push back on it.

The general expectation is that it is the responsibility of the **meeting booker** to communicate the purpose of the meeting, and ensure that the other invitees have adequate time and context to prepare for it and attend as their best selves. If this principle is flouted consistently, you need to set up/agree on those expectations at a deep, values level.

This also applies to requests to meet ad-hoc, which happen regularly if you are successfully reducing "meeting ping" as discussed above. An easy and tempting anti-pattern to fall into here are messages like 'Have you got a sec?'. The same comments apply to these messages. All requests to 'hop into a quick call' _must_ be accompanied by an explanation of why.
