Learnings - 

1. Problem Statement
Build a meal planner that optimizes protein intake within a budget while respecting user preferences.

2. Initial Approach
Used greedy algorithm (protein per cost)

👉 Problem:
repetition
poor distribution


3. Challenges Faced
Same food repeated in all meals
One meal consuming full budget
Greedy failing for multi-constraint system



4. Solution Evolution
Introduced usage tracking
Added penalty (usage * 5)
Limited items per meal
Sorted dynamically


5. Trade-offs
Higher efficiency vs variety
Budget usage vs distribution
Greedy vs balanced approach

6. Final Outcome
Meets protein goal
Stays within budget
Provides reasonable variety

7. Future Improvements
Multi-day planning
ML-based recommendation
User feedback learning

------------------------------------------------------------------------------------------------------------------------------------

Question - “Problem I faced”

Answer - While generating meal plans within a fixed budget, I noticed that the same meals were being repeated frequently.
This reduced variety and made the plan unrealistic for real users, even though it was technically optimal in terms of cost.


------------------------------------------------------------------------------------------------------------------------------------

Question - “Why greedy failed”

Answer - Initially, I used a greedy approach where I selected meals based on the best cost-to-nutrition ratio.
However, greedy only focuses on local optimum, not overall experience.

Because of this:

It kept selecting the same “best” meal again and again
There was no tracking of previously selected meals
Result → low diversity, repetitive plans


------------------------------------------------------------------------------------------------------------------------------------

Question - “How I fixed repetition ”

Answer - Instead of using a pure greedy approach, I introduced a usage tracking system:

Used an object (usage) to track how many times each food is selected
Applied a penalty in scoring:
More a food is used → lower its priority
Limited selection:
(usage[food.name] < 2) to avoid overuse
Dynamically sorted foods based on:
Efficiency
Usage penalty
Remaining protein requirement

👉 This created a balanced selection system:

Avoids repetition
Maintains budget
Still optimizes protein