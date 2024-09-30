---
title: Falsehoods programmers believe about financial transactions
date: '2024-09-15'
description: test
tags:
  - financial-transactions
  - domain-modelling
  - programming
---

_Note: while there are lots of types of transactions, I'll use_ transaction _and_ financial transaction _synonymously in this post for brevity._

This is post that actually exists to convince you that you need to use double-entry bookkeeping.

Over the past months, I've been working with folks at [Bench Accounting](https://bench.co) to build a richer, more robust understanding of _"what a financial transaction is"_. It would be pretty reasonable to assume that after 10 years of doing business in the bookkeeping space, we would have a pretty watertight definition of that -- but the reality is that it's pretty hard to build ubiquitous language about financial transactions for a slew of structural reasons:

- **Transactions inherit other complex entities**: entire articles exist about how to model currency and dates, which are two fundamental building blocks that financial transactions depend on.
- **Software companies do not agree what a transaction is**: while almost all accounting professionals agree that double-entry bookkeeping is the best domain model for transactions, companies like Plaid[^1] love to flagrantly ignore centuries of wisdom[^2] recording them
- **Double entry bookkeeping is unintuitive**: the most accepted practice for thinking about transactions is difficult to understand and reason about at the best of times

I want to be open about my own biases. I believe wholeheartedly that for most people, double-entry bookkeeping is a great domain model to use for representing transactions.

In trying to convince people to this view, I've accrued some mistaken beliefs about transactions, and counterexamples that disprove them. Each of those counterexamples are resolvable with double-entry bookkeeping, but regardless of the model you end up using, I believe that these examples are interesting in provoking thought about the breadth of use-cases you need to account for.

### Transactions involve a transfer of currency

One of the most common misconceptions I see is between payments and transactions. That doesn't have to be inherently problematic because payments in an ideal world should be a _subset_ of transactions. As with other problems though, issues arise when you make assumptions that truths of the _subset_ will also be true of their _superset_.

For instance, most people expect that a payment will involve the transfer of currency (as that is essentially the definition of the word), which is distinct from a transfer of value representable with currency. Therefore, they'll often encode rules in their transaction model that transactions have to involve asset/liability accounts or (even worse) external entities like financial institutions.

If I asked you to think of a counterexample, you're probably going to think of bartering. Bartering is interesting because it's an example of the distinction I made above. We can actually deal with barters by normalizing the assets involved into a currency value. We do this a lot -- for example when recording the value of physical assets.

A better counterexample would be the donation of assets. Suppose I donate a car to a local charity. No payment is recorded through either counterparty's financial institution, nor does any currency exchange hands, although there may be a bill of sale. Despite this, almost anyone would say that a real financial transaction has transpired. One party lost an asset of value, and another gained one. This is an important financial activity to record.

### Transactions happen because of conscious action taken between two counterparties

moving equity between accounts involves one party, a unilateral decision

### Transactions happen because of a conscious action taken by at least one counterparty

asset amortisation or appreciation or depreciation happens automatically

### Transactions involve at most two counterparties

merchant adjustments

### Transactions happen when value exchanges hands

an invoice can be a transaction in accrual accounting

### Transactions make sense with the context of one account

double entry accounting

### Transactions have a single amount value

as many amounts as is necessary on the entry - mistakes transactions for entries

[^1]: [Plaid's docs for `transactions`](https://plaid.com/docs/api/products/transactions/#transactionsget)
[^2]: [Double entry bookkeeping on Wikipedia](https://en.wikipedia.org/wiki/Double-entry_bookkeeping)
