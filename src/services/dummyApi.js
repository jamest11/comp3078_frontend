
const quiz = {
  title: 'Quiz 5',
  time: '30',
  questions: [
    {
      type: 'mc',
      q: 'What is the history of the evolution of a species or group?',
      res: {
        r1: 'Phylogeny',
        r2: 'Genetics',
        r3: 'Biology'
      },
      a: 'r2'
    },
    {
      type: 'mc',
      q: 'What is capital of Canada?',
      res: {
        r1: 'Toronto',
        r2: 'Ottawa',
        r3: 'Montreal',
        r4: 'Winnipeg',
        r5: 'Vancouver'
      },
      a: 'r2'
    }
  ]
};

const getQuiz = () => {
  return quiz;
};

export { getQuiz };