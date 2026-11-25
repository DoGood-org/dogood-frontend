export const isSpamMessage = (text: string): boolean => {
  const normalized = text.trim().toLowerCase();

  const links = normalized.match(/\b(?:https?:\/\/|www\.)[^\s]+/gi) || [];

  const spamPhrases = [
    'viagra',
    'casino',
    'free money',
    'bitcoin investment',
    'crypto investment',
    'buy now',
    'click here',
    'winner',
    'lottery',
    'online casino',
    'gratis geld',
    'jetzt kaufen',
    'легкі гроші',
    'виграй приз',
  ];

  const containsSpamWords = spamPhrases.some((phrase) =>
    normalized.includes(phrase)
  );

  const letters = text.match(/\p{L}/gu) || [];
  const uppercaseLetters = text.match(/\p{Lu}/gu) || [];

  const excessiveCaps =
    letters.length >= 20 && uppercaseLetters.length / letters.length > 0.6;

  const excessivePunctuation = /[!?]{4,}/.test(text);

  return (
    links.length > 1 ||
    containsSpamWords ||
    excessiveCaps ||
    excessivePunctuation
  );
};
