export const TARGET_CENTS = 240000;
export const QUESTIONS = [
  { id: 'first-impression', group: 'music', label: 'First impression', title: 'How does this track make you feel?', description: 'Listen to the selected track, then give your honest first impression.', type: 'rating', low: 'Not for me', high: 'Love it' },
  { id: 'playlist', group: 'music', label: 'Playlist potential', title: 'Would this make your playlist?', description: 'Picture the music you actually come back to. Would this track have a place?', type: 'choice', options: ['Definitely — I would save it', 'Maybe, for the right mood', 'Not this time'] },
  { id: 'standout', group: 'music', label: 'What stands out', title: 'What stands out to you most?', description: 'There is no right answer. Tell us what caught your ear.', type: 'choice', options: ['The melody', 'The rhythm', 'The production', 'Nothing in particular'] },
  { id: 'frequency', group: 'app', label: 'Listening habits', title: 'How often do you use Spotify?', description: 'Your everyday experience is the point. Choose what fits you best.', type: 'choice', options: ['Every day', 'A few times a week', 'Occasionally', 'I do not use Spotify'] },
  { id: 'recommendations', group: 'app', label: 'Music discovery', title: 'How are Spotify’s recommendations?', description: 'Think about the songs, artists, and playlists recommended to you.', type: 'rating', low: 'Needs work', high: 'Excellent', extra: 'Not enough experience to rate' },
  { id: 'improvement', group: 'app', label: 'A better experience', title: 'What would you improve first?', description: 'If you could change one part of the Spotify experience, where would you start?', type: 'choice', options: ['Discovering new music', 'Search and navigation', 'Creating and organizing playlists', 'Playback and audio controls', 'No preference / I do not use Spotify'] },
];
export const CREDIT_CENTS = TARGET_CENTS / QUESTIONS.length;
export const METHODS = ['cash-app', 'paypal', 'venmo', 'zelle', 'bank-transfer', 'gift-card'];
export function validAnswer(question, value) {
  return question.type === 'rating' ? ((Number.isInteger(value) && value >= 1 && value <= 5) || value === question.extra && !!question.extra) : question.options.includes(value);
}
export function cleanResponses(value) {
  const responses = {};
  for (const q of QUESTIONS) {
    const answer = value?.[q.id];
    if (answer && validAnswer(q, answer.value)) responses[q.id] = { value: answer.value, note: typeof answer.note === 'string' ? answer.note.slice(0, 500) : '', at: Number.isFinite(answer.at) && answer.at > 0 ? answer.at : Date.now() };
  }
  return responses;
}
export function balanceCents(responses) { return Object.keys(cleanResponses(responses)).length * CREDIT_CENTS; }
export function nextQuestion(responses) { return QUESTIONS.find(q => !validAnswer(q, responses?.[q.id]?.value)); }
export function complete(responses) { return !nextQuestion(responses); }
export function recordAnswer(responses, id, value, note = '') {
  const question = QUESTIONS.find(q => q.id === id);
  if (!question || !validAnswer(question, value)) throw new Error('Choose an answer before continuing.');
  const cleaned = cleanResponses(responses);
  const isNew = !cleaned[id];
  return { responses: { ...cleaned, [id]: { value, note: String(note).slice(0, 500), at: cleaned[id]?.at || Date.now() } }, credited: isNew ? CREDIT_CENTS : 0 };
}
export function usd(cents) { return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100); }
