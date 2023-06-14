-- Connect to the "todo" database

-- Create the "todos" table
CREATE TABLE IF NOT EXISTS todos (
  id SERIAL PRIMARY KEY,
  todo_body TEXT
);

-- Seed the "todos" table with 10 realistic todos
INSERT INTO todos (todo_body)
VALUES
  ('Finish writing the report'),
  ('Buy groceries for the week'),
  ('Schedule a dentist appointment'),
  ('Call John to discuss the project'),
  ('Attend the team meeting'),
  ('Start working on the presentation'),
  ('Send the follow-up email to the client'),
  ('Research new project ideas'),
  ('Organize files and folders'),
  ('Prepare for the upcoming presentation');
