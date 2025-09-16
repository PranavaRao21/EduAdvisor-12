import pandas as pd

CSV_FILE = r"c:\Users\Bhava\Desktop\12 th\degree_decision_tree.csv"

# -----------------------------
# Load CSV
# -----------------------------
try:
    df = pd.read_csv(CSV_FILE)
    questions = df.set_index("QuestionID").to_dict("index")
except Exception as e:
    print(f"Error loading CSV: {e}")
    exit(1)

# -----------------------------
# Category mapping (optional, for scoring)
# -----------------------------
def get_category(qid):
    q_num = int(qid[1:])
    if q_num in [1,2,7,13,14,26,36,42,43,44]:
        return "Pure Sciences"
    elif q_num in [3,8,15,16,24,25,34,35]:
        return "Applied Biological Sciences"
    elif q_num in [4,9,17,18,27,45,46,47]:
        return "Computer and Data Sciences"
    elif q_num in [5,10,18,28,29,37,38,39,40,48,49,50]:
        return "Medical and Health Sciences"
    elif q_num in [6,11,19,33,34,51,52,53]:
        return "Agricultural Sciences"
    elif q_num in [23,54,55,56]:
        return "Engineering"
    elif q_num == 12:
        return "Specialized Sciences"
    return None

# -----------------------------
# Quiz logic
# -----------------------------
def run_quiz():
    current_id = "Q1"
    confirmation_degree = None
    confirmation_count = 0
    question_count = 0
    MAX_QUESTIONS = 20

    while True:
        if current_id not in questions:
            print("\nNo clear match. Please try again or consult a counselor.")
            break

        q_text = questions[current_id]["Question"]
        print(f"\n{current_id}: {q_text}")
        response = input("Answer (yes/no): ").strip().lower()

        if response not in ["yes","no"]:
            print("Please answer 'yes' or 'no'.")
            continue

        # Check StreamSuggestion
        stream_suggestion = questions[current_id]["StreamSuggestion"]
        if pd.notna(stream_suggestion) and stream_suggestion.strip() != "" and response == "yes":
            confirmation_degree = stream_suggestion
            confirmation_count += 1

        # Determine next question
        next_id = questions[current_id]["NextIfYes"] if response=="yes" else questions[current_id]["NextIfNo"]

        # If a valid suggestion has enough confirmations, show it
        if confirmation_degree and confirmation_count >= 1:
            print(f"\n✅ Suggested Degree: {confirmation_degree}")
            break

        # Stop if no next question
        if not next_id or next_id == "Q41":
            print("\nNo clear match. Please try again or consult a counselor.")
            break

        current_id = next_id
        question_count += 1
        if question_count >= MAX_QUESTIONS:
            print("\nNo clear match. Please try again or consult a counselor.")
            break

# -----------------------------
# Run Quiz
# -----------------------------
if __name__ == "__main__":
    print("🎓 Degree Suggestion Quiz 🎓")
    run_quiz()
