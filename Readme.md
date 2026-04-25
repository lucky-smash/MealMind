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