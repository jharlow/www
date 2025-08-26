---
title: Stop using the word transaction
date: '2025-08-18'
description: A short argument that in the context of bookkeeping, transaction is an unhelpful term.
tags:
  - domain design
  - bookkeeping
  - financial technology
---

From experience, I know that the saying "in the context of bookkeeping, transaction is an unhelpful term" is a pretty hot take. So I want to start by saying that this is a strong opinion (I've had three years of talking to bookkeepers and engineers to stew on it) that I aspire to weakly hold (I know that smart people disagree with me, which is normally a good indicator that I'm missing some context).

To make my case, I'm going to start off with a much less controversial statement:

> Transaction is an overloaded term

I'd wager some money that most people who have worked in financial technology would agree with me on this. Transaction is a word that has meaning across multiple domains, but even within finance is used colloquially in conflicting contexts. During my time working on and with general ledgers, I've seen almost any entity you could imagine getting labelled as a "transaction". Items in financial statements are transactions (but not journal entries), one side of a journal entry is a transaction, the journal ency itself is the transaction, a particular subset of journal entries are transactions. I could list even more, but the point is that a lot of things get labelled as transactions.

The reason this overloading happens is that all these definitions are semantically meaningful and justifiable; all of them represent an exchange of value of some form. The items in a bank statement are an exchange of value, as is one side of a journal entry if it represents a bank statement item, as does the journal entry itself (how could you have a double-sided entry without an exchange). Layer on top of that the colloquial use of "transaction" to refer to _payments_ (another overloaded term), and you have a very confusing mess. I would wager a guess that at my last workplace, literally thousands of man hours were wasted because of misunderstandings over what various parties labelled as transactions.

## Choosing the right definition

So we have a heavily overloaded term with lots of competing definitions and usages. The obvious question to try and answer is; which of them is correct?

As you can probably tell, I think the answer is _don't_. But to get there, I'm going to give a serious if slightly unsatisfying answer. I believe that if you are a bookkeeper the correct answer is that journal entries are transactions, but if you are a client of the bookkeeper the correct answer is normally that payments are transactions.

Let's handle the bookkeeper first. For a bookkeeper, the general ledger represents the "truth" of the business's financial state. Journal entries, as the building blocks of a general ledger, are therefore the source-of-truth of all money movements in the business. To a bookkeeper, a bank statement is reference material to prepare a journal entries from, but the journal entries represent the money actually moving. Therefore, if you wanted to refer to an exchange of value actually taking place, you would have to point to the journal entry since it is only when placed in the general ledger that the exchange "happens" from the perspective of the business.

In an ideal world, this would be true for a bookkeeper's clients as well. I would argue that a lot of the common communication problems that bookkeepers have would be solved if their clients understood the general ledger to be the defining source-of-truth for the state of their business. However, plainly, they don't. Instead, most of them view records of payment as the transaction (receipts, bank statements, etc.).

We're left with two critical stakeholders of our system holding conflicting views on what an important entity in it means.

## Transaction is rarely the best word anyway

One solution to this problem is to capitulate to one of those groups and if you're particularly customer-centric, it's tempting to defer to the user. However, always remember that bookkeeping customers above all else want correct books completed quickly and cheaply. It's likely you'll find that by encoding your customers misconceptions about bookkeeping into your system, you'll make the job of completing the books much more difficult and time consuming.

If you are totally intent on using the word transaction in your bookkeeping system, I would therefore suggest considering journal entries (and only journal entries) to be "transactions". However you're still going to have the problem of the customer wanting to use that word, and therefore needing to distinguish between multiple uses of the word in your system. I can tell you from experience that this can create enormous communication barriers for people inside your organization, especially when they typically work with only one definition of the word.

We can do better by expecting everyone except the customer to stop using the word (except when speaking with customers). I can think of at least a few benefits for doing so:

1. Where entities may have previously "fought" over "ownership" of the term _transaction_, now you'll likely find that new, distinct words are found that are more descriptive of what each entity truly represents and different enough that they can all co-exist without issue. I find people often reach for "transaction" out of convenience, but the most convenient word is rarely the best one.
2. Rather than needing to "pick a side" between bookkeepers and users, you can encode good bookkeeping practices into your application using even more domain-specific naming conventions, and isolate the customers' misunderstanding into the presentation layers that face them. You might find that in "translating" bookkeeping terminology into language your customers understand at your user interface, you come to understand how your customers think about your outputs better, and you inadvertently document some of your communication challenges into code.
3. All teams and employees are aligned on the internal usage of words that could be referred to as transaction. The more you can promote words having a single ubiquitous meaning throughout your entire organization, the less communication overhead you create when teams/contributors collaborate.
4. Perhaps most importantly to me, it acts as a forcing function for everyone in your organization to cultivate the domain knowledge and vocabulary necessary to describe your users problems with precision. By asking engineers, designers and product managers to use more specific language in their day to day, we invite them to engage deeper with the problems they are working to solve.

## A more general lesson

If there's one thing I've learned from trying to disambiguate the use of "transaction" within my own work and conversations with founders, it's that when we rely on overloaded terms, we create communication barriers. Those barriers if left unaddressed can produce tighter coupling in our system as multiple pieces of unrelated data get crammed into the same entity and significant misunderstanding both for user and developers of our systems.

One way to address this kind of problem is to attempt to decisively define a term and enforce the new definitions, but this costs time to communicate and comes with the severe limitation of trying to redefine words people understand intuitively. While removing overloaded terms entirely is not without effort, it produces a pit-of-success. In the absence of a more convenient word, teams search for more specific ones. Once accepted and incorporated into a system, those specific words become the default, and begin to self-enforce a more precise language that benefits all users.
