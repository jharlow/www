---
title: Some agent patterns
date: '2025-11-15'
description: Reflecting on building agents and how to think about agent implementation.
tags:
  - AI
  - patterns
  - technical
---

[this post is going to be principally about the skill of _how to implement agents_. however before i get into that, i (sadly) feel it's important to highlight a skill that you should cultivate/reflect on before you do anything.]: #
[namely, it's more important than ever for software engineers to ask themselves if something is ethical to implement. in particular, is the agent you are attempting to build being deployed to ethical purposes?]: #
[large language models are a technology whose very existence sparks ethical questions. how was it trained? where does the energy come from? who benefits from it's propagation? on that basis, if you can't articulate a strong moral reason why an agent _should_ exist, then a strong argument already exists that it probably shouldn't.]: #

A lot of my work over the past month has been implementing agents. As I've done so, I've been thinking a lot about what agents are, and how to implement them well. Obviously, I won't be able to improve upon the many resources on how to implement agents in various frameworks and languages, but I did want to jot down some of my thoughts about what patterns I'm noticing emerge as "best practice" across many of these sources.

More importantly, I wanted to use this post as an exercise to sharpen my own understanding of what an agent is, and how to think about implementing agents as a feature developer. Understandably, I see a lot of aggrandizing agent development, but to me it seems simpler than a lot of engineers seem to make it sound. Largely, I hope this writing helps give word to that feeling so that I can be corrected if I'm wrong.

## What is an agent?

A lot of confusion in building agents arises from the question of what an agent is. From the reading I've done on building agents, I would describe dominant understanding of what an agent is as a "harness-focused definition".

> An agent is a combination of prompting, tools, model, and execution environment which together allow an LLM to engage with a system and it's capabilities.

You'll notice that this definition of an agent centers squarely on implementation details in a way that the agent is defined by it's parts and their interactions.

I think it is embedded in a good engineering understanding of what goes into building agents today, but the problem with defining anything by it's parts is that you limit your understanding of an abstraction purely to implementations that are familiar to you already. If I am a car manufacturer and my understanding of car necessarily includes an internal combustion engine, how well will I adapt to the transition to renewable energy and EVs?

I prefer a definition that is rooted in the consumers experience of an agent:

> An agent is an interface that is principally organized around a chat data structure and uses it as an abstraction for using some or all of the capabilities of a system.

Something I like about this definition, beyond it focusing on the external surface area of the agent, is that it also gives clarity to a distinction between agent and "workflow".

A lot of AI frameworks and SDKs like the talk about "agentic workflows" when what they really seem to mean is logical paths and interfaces who's implementation _includes_ large language model requests and (very occasionally) agents.

The concept of an "LLM workflow" is slightly strange to me, because it seems to resemble nothing more than a logical pathway through code. If an interface is fulfilled by an LLM structured output being used to trigger two more LLM calls in parallel before returning something based on all three, is that an "LLM workflow" or just a logical pathway? Defining an agent around a chat-oriented interface at least helps provide a delineation between these "workflows" that employ "agents" and "agents" that employ "workflows".

So if we take this as our definition for now, the question becomes, what possibilities (implementations) exist within that abstraction that meet it's definition?

## The tool loop pattern

The tempting thing about that first definition is that at a basic level, it encapsulates everything you need to implement an agent interface. If you give a **model** access to a `getWeather` **tool**, **prompt** it for the weather in Bangladesh, and place it in an **execution environment** that wraps it in `while` until it responds, then you effectively have an agent.

As a result, most frameworks and SDKs that offer abstractions over these components conflate their combination with the `Agent` namespace. A notable exception is the `ai` SDK from Vercel, who export an `Agent` interface and then a `ToolLoopAgent` class which articulates the distinction elegantly. An agent using this class implements the `Agent` interface by using a loop (essentially just a `while`) to keep the model running until it has used its tools and prompt to complete its caller's request.

The vast majority of simple agents will suffice with this structure and not need further implementation details, but as we'll see - the story can quickly get more complicated.

## The need for patterns beyond tool loops

Today, implementing complex agents often come against challenges when implementing with the tool loop implementation. The principal bottleneck today (April 2026) is the context window. As the number of tools, prompts, and messages fed into in a tool loop agent grow, the context window grows and eventually gets large enough that the quality of the agent degrades.

As a consequence, a variety of patterns have emerged for implementing agents in order to manage the context window and to accommodate various other organizational/user needs.

I feel that "patterns" is the right description for these techniques, as opposed to "architecture" or "orchestration" because they are both combinable in the way of traditional refactoring patterns and implemented at the same level of abstraction.

I'm going to quickly go through some of the most common ones I see, but more exist. The point is mostly to get away from an "architecture" perspective of agent development and illustrate that these are combinable, changeable implementation details that exist at the level of application code.

## Context management patterns

The first set of patterns concerns giving the agent the capability to manage it's own context window and disclose the context available to itself as it needs it. Like an accordion pattern in UI, these patterns aim to defer overloading the agent with information, but still provide affordances that let it show and hide what it needs for a given task.

This set of patterns, when implemented, come with the benefit of being able to massively expand the amount of context available to a standard tool loop agent without commensurably decreasing it's performance/latency, however it also introduces steps that the agent needs to take to load in the necessary context (increasing overall execution time), and risks the agent taking actions without appropriate context being loaded in altogether.

### Skills

However skills are implemented, the fundamental concept is the same. Rather than creating a massive prompt to the agent, we break the prompt down into well scoped chunks and give the agent a tool to view them, which allows us to replace the contents of each skill in the prompt with a single line describing that skill.

### Tool search

One of the main sources of context-overloading is tool definitions. Each one can contain a lot of tokens worth of metadata, especially when their input structures become complex (especially true of tools that perform create or edit operations).

Instead of separating tools across multiple agents, many model providers are now providing native tooling to defer sending tool definitions, instead mediating access to them via a tool search tool. By creating a separation between the client-side and server-side tool sets, you can have a massive bank of tools which are only loaded in when requested by the agent, and therefore take only the necessary amount of input tokens.

### Conversation compaction

As the message thread between agent and consumer gets longer, it can become it's own source of context bloat. There are various ways to implement conversation compaction ranging from delegating the task to an LLM to more deterministic flows and tool output adaption, but the general gist is to shorten and simplify the message history without adjusting the context needed to accomplish the current task.

## Agent sharing patterns

Agent sharing patterns go beyond giving a single tool loop agent the ability to control it's context by treating the agent itself as a context that can itself be managed.

Because the agent interface can be fulfilled with any logic, including logic that doesn't use LLMs at all, we can use as many tool loop agents as we want in any imaginable configuration to implement its contract.

I will outline some common patterns I see emerging below, but the critical thing to note is that these patterns describe general interaction modes, not strict "architectures". As I'll discuss after this section, these interaction modes become much more powerful when combined and augmented with standard code to fulfil specific functional needs.

### The agent-as-tool pattern

Often referred to as subagents, this pattern takes an existing tool loop agent and makes it callable to a "parent" tool loop agent. The actual implementation can be brutally simple, taking the agent and wrapping it in a tool, returning the agent's returned conversation.

By placing the agent into a tool, you gain the ability to compress all of it's context (message history, tool calls, and prompting) into a much more constrained I/O contract. In this way, you are able to take a complex task which in it's own right demands a lot of agent context, and abstract it into a simple input and output for the "parent". For models which support simultaneous tool calling, this can also allow for parallelization of multiple tasks that the parent needs completed to proceed.

This is best illustrated by this patterns most common implementation - a web research agent. Instead of the parent having to worry about searches, reading web-pages and all of the resulting tool calls, it can abstract it all into query-synthesis, avoiding having to take on all the complexity of the subagent that does the work.

However this constrained I/O can just as easily become a communication bottleneck between the agent and subagent. If the parent has a large amount of context needed by the subagent to complete it's task, or vice-versa, a tension will exist between exposing more context (and therefore diminishing the abstraction) and hiding it at the expense of the job being completed.

Uses of this pattern are best served, therefore, in cases where a task can be expressed and answered succinctly, but require a significantly complex agent to resolve.

### The router pattern

This pattern takes a series of tool loop agents that conform to the agent interface, and uses some logical block to route incoming requests to the correct one for that completion request.

This has the benefit of brutal simplicity and also maximum flexibility. Your routing condition can truly be anything that can be expressed in code, including an agent, and once a decision has been made, you move back into the execution of a tool loop agent.

Additionally, routing agents means that specific, discrete agents can be created by teams and tuned specifically for a particular function or use case. So long as everyone conforms to the general agent interface, a router can connect them to the same interface for the end user. This can enable effective parallel development and high quality for requests that are bounded within one agent "domain".

The issue with the router pattern arises if a request is received that does not neatly belong to a single agent. If agent A handles web search and agent B handles weather checking, what happens if I ask "What's the weather in Bangladesh and what is it's capital?"

Without further interaction modes, the agent routed to in these instances will respond however it can, but them require further prompting to complete the outstanding requests, which can frustrate users and waste time/tokens.

### The handoff pattern

Sometimes called swarms or agent modes, the handoff pattern establishes a directed graph of tool loop agents, and allows each agent node to "pass off" the conversation to any other agent node it has an edge to within the same agent execution. Where a router pattern establishes an enumerable control flow that can be expressed in advance, the handoff pattern establishes a graph and allows the agent(s) to decide how to traverse it at runtime.

In many ways, this pattern is a direct answer to the drawbacks of both the router and agent-as-tool patterns.

First, it solves the problem of requests that span the contexts of multiple discreet tool loop agents. If an agent cannot fulfil some or all of a request, it can choose to pass the conversation off to an agent that can continue, and that agent can do the same. The agent gets to explore a directed graph of contexts until it either has what is needs, or discovers that none of the contexts it has access to have the required capability.

Second, it solves the communication bottleneck problem of passing information between agents using a tool interface. When an agent uses a handover pattern, the agent being "passed to" inherits all of the context of the main conversation thread. Thus, if Agent A gathers context in A domain, when it passes the message thread to Agent B, B has all the gathered A context as an input.

However both of these solutions come with limitations. For one, exploring the directed graph comes with it's own token usage and context expansion. It takes time and "cognitive overhead" for the agent to manage context in this way. While it removes one communication bottleneck between agents, it introduces another in communicating the capabilities of the agent nodes available for handover sufficiently to make handovers effective. Describe the available agents insufficiently, and the current one will traverse the graph inadvisably or inefficiently. Describe them in too much detail, and you once again bloat the context window.

Finally, it is worth noting that implementation of this pattern is typically much more complicated than almost any other pattern, and will often require disabling parallel tool execution as a capability of the agent so that handover tools switch the agent context before additional tools in the outgoing context execute.

## Putting it all together

This is not a conclusion section. I literally mean that we need to put all of these patterns together, much in the same way that refactoring patterns can interact and reinforce one another. I keep returning to this theme, but none of these patterns are finalized architectures, they are techniques.

A router pattern can place an agent with skills in charge of routing to a handoff agent, which in turn might pass on it's context to another tool loop agent with access to a subagent. The subagent might have so many tools it requires tool search.

Many more patterns exist, the important thing is that you have clear, well tested implementation strategies for each one and exercise good judgement on which to use based on their tradeoffs and your use-case.

An agent is an interface which can be implemented using any logic. Any logic includes the use of multiple agents which interact using different configurations and patterns. The complexity of your system, the functional requirements of the system capabilities that an agent abstracts, and the model you select will all influence which patterns you use, but avoid seeing "selecting one pattern as the architecture" as the underlying decision being made. Instead, decide "what patterns best support my organization right now?"
