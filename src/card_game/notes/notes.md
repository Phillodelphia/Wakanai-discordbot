# Notes for self

## What to consider

# How should I store user data for several users?
- Store user data in one single file or several files?
- Using someones discord ID should be safe to identify who is who
- Dictionary for each user will be used in format data['userId']['content']
  example { "11111111": { "Currency": 100, Wins: "5", Loses: "3", "Cards": ["char1", "char2"] } }