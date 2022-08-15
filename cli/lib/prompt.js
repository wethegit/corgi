import readline from "readline";

const prompt = (question) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve, reject) => {
    if (!question) reject("Invalid question");

    rl.question(question, (answer) => {
      resolve(answer);
      rl.close();
    });
  });
};

export default prompt;
