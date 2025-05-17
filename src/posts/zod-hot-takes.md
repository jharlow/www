---
title: Zod hot takes
date: '2025-05-14'
description: A series of hot takes I've accumulated from several years of religiously using Zod.
tags:
  - zod
  - technical
  - advice
---

I use Zod a lot, in fact I'd put good money on the table that `z` is the object I import most regularly. I like it so much, that I've not only championed for it at Bench, but written an entire open-source library around it.

In doing so, I've developed a series of hot takes about Zod, which I thought I'd share in the spirit of getting my beliefs ruthlessly critiqued on the internet (I hope!).

## 🌶️ The correct format is `zod`-`Entity`-`Schema`

The most common problem I see with Zod (and it drives me bananas) is conflating the schema with a validator/parser. To be fair, it's understandable why given that [zod.dev](https://zod.dev/) describes the library as:

> TypeScript-first schema validation with static type inference

Let's handle the lowest hanging fruit there first. Zod doesn't offer validation, it offers parsing. Look through it's entire spec and you won't find a single `.validate()` in sight. That's good because you should be [parsing instead of validating](https://lexi-lambda.github.io/blog/2019/11/05/parse-don-t-validate/), but it makes it an odd way to phrase that.

So let's amend to:

> TypeScript-first schema ~~validation~~parsing with static type inference

Next up, is Zod a schema parsing library?

Consider what the object your get back from your `z` calls is. Principally, it's an **object** that describes the **shape of your data**. In fact, there is a lot more data and functions on the resulting object that are about defining or refining the shape of data than there are about parsing that data.

In short, you are dealing with a _schema_ that exists at runtime, and incidentally has some methods to parse data of that shape. That schema uses a particular API. You can define a schema using JSON to get a JSON Schema, and you can define one using Zod to get a Zod Schema. Zod even bakes this terminology into it's own API:

```ts
import {z, ZodSchema} from 'zod';
z.array(schema); // the first arg of z.array is `schema`
```

As a result, a better description of the library would be:

> Typescript-first runtime schemas **with** parsing functions and static type inference

And variable names of Zod Schemas should contain the words `zod` and `schema`:

```ts
const CUISINES = ['vegan', 'indian', 'japanese', 'italian'] as const;
const zodCuisinesSchema = z.enum(CUISINES).array(); // or cuisinesZodSchema
```

## 🌶️🌶️ Don't couple parsing to Zod's API

Parsing is an important concept in software engineering and one that we will always need in one form or another. Zod has achieved it's huge popularity in part by creating an API which makes the annoying task of parsing very easy.

However at the end of the day, if parsing some data is the essential complexity we are trying to perform, Zod represents the accidental complexity of implementing it.

I see a lot of code that looks something like this:

```ts
const fetchData = async <T>(
  zodSchema: ZodSchema<T>,
  ...args: Parameters<typeof fetch>
) => {
  const response = await fetch(...args);
  const json = await response.json();
  const parsed = zodSchema.parse(json);
  return parsed;
};

const cuisines = await fetchData(
  zodCuisinesSchema,
  'https://localhost:3000/api/v1/cuisines'
);
```

This sort of thing produces a lovely developer experience, but it couples `fetchData` strongly to Zod as an implementation detail. However with a one-line change, we can avoid that while retaining a functionally identical developer experience.

```ts
const zodToParser = <T>(zodSchema: ZodSchema<T>) => (json: any) => zodSchema.parse(json);

const fetchData = async <T>(
  parsingFunction: (json: any) => T, // only changed this line in `fetchData`
  ...args: Parameters<typeof fetch>
) => {
  const response = await fetch(...args);
  const json = await response.json();
  const parsed = parsingFunction(json);
  return parsed;
};

const cuisines = await fetchData(
  zodToParser(zodCuisinesSchema),
  'https://localhost:3000/api/v1/cuisines'
);
```

Now, we could use any parsing library we want, and it would be trivial to swap out implementations. Plus, there's functionally no difference between the developer experience of our two examples. The `cuisines` constants in both have the same type!

An additional benefit of this decoupling is that we can decouple business logic that deals with things like robustness and transformations from the Zod API.

```ts
type ParsingFunction<T> = (json: any) => T;

const parsePotentialCuisines: ParsingFunction<string[]> = flow(
  zodToParser(z.string().array().default([])),
  map(cuisine => cuisine.toLowerCase().replace(/ /g, '_')),
  zodToParser(zodCuisinesSchema)
);

const cuisines = await fetchData2(
  parsePotentialCuisines,
  'https://localhost:3000/api/v1/cuisines'
);
```

This code allows my parsing function to handle the data in multiple, decoupled steps to robustly smooth out and parse the data.

## 🌶️️️️️️️️️️🌶️🌶️ Don't couple runtime schema definitions to Zod's API

Something that Zod gets used for increasingly frequently is "source-of-truth" schema definitions. It's convenient for this since in order to do the parsing, you've already described the relative shape of your data in an object available at runtime. Additionally, the first-class static-typing that Zod provides via `z.infer` means you can write one schema and derive:

1. Parsing for that schema
2. Types for that schema
3. A schema you can reference at runtime

That's a pretty compelling option! Because we often already have these schemas lying around, it works well enough, and has such a wide eco-system that teams buy in to it very deeply for this purpose.

I honestly don't think this is a terrible idea, but this isn't a task that Zod was designed for so naturally there are better solutions out there for defining runtime schemas than Zod. For instance, I already mentioned JSON Schema.

JSON Schema has a lot of benefits over Zod as a runtime spec. It's a more specific spec than Zod in terms of describing the data, much more language agnostic (despite being friendly to JS devs), and has a significantly larger tooling ecosystem. Not only that, you can code-generate Zod from JSON Schema, so you can have the best of all worlds. When you use a lot of your favorite "Zod-friendly" libraries and SDKs (looking at you, OpenAI), they're just converting your Zod Schema to JSON Schema under the hood anyway.

I think this is a good example because it demonstrates how Typescript developers specifically will avoid a better solution if it means they can [hyper-type](https://pscanf.com/s/341/). JSON Schema may be a better tool for the job, and it may code-generate identical static typing and Zod schemas, but having "sources of truth dynamically type in a `.ts` file" is a phrase that holds a strange power over us.

Oftentimes, Zod is the better option, but it should be the **better* option not the only option you considered.

## 🌶️🌶️ Treat `zod` type imports with suspicion

I've talked a lot about coupling in this blog post, and I could have saved myself a lot of time by writing this section first.

When writing a function, type, or variable, consider importing anything other than `z` from `zod` to be a smell. Almost always, you'll be importing a type. Almost always, where that type goes creates coupling.

I'm not saying it's necessarily a bad thing, but it should be enough to make you ask a couple of question of yourself. Is this function about Zod, or is Zod's API actually incidental (and therefore optional) to the purpose of the function. How can I bulkhead Zod in order to reduce the blast radius if I decide on another implementation?

Oftentimes, (as with parsing above), we can get full use out of Zod without coupling ourselves to it's API with just a few lines of relatively declarative, easy to test code, and in doing so create simpler, much easier to adapt and extend interfaces than we would have otherwise had.

# 🌶️ Use Zod, it's very good

Not much to say on this one, it's by far the best parsing library when counting for ecosystem, and that's unlikely to change. If you only take one of these takes, it should be this one.
