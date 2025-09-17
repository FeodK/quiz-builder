export const BLOCK_TYPES = [
  { type: 'heading', label: 'Heading', icon: '📝', description: 'Add section titles' },
  { type: 'question', label: 'Question', icon: '❓', description: 'Add questions with different types' },
  { type: 'button', label: 'Button', icon: '🔘', description: 'Add navigation buttons' },
  { type: 'footer', label: 'Footer', icon: '📄', description: 'Add footer content' }
] as const;

export const QUESTION_TYPES = [
  { value: 'single', label: 'Single Choice', icon: '🔘' },
  { value: 'multi', label: 'Multiple Choice', icon: '☑️' },
  { value: 'text', label: 'Text Answer', icon: '📝' }
] as const;

export const STORAGE_KEYS = {
  QUIZZES: 'quizbuilder.quizzes',
  INITIALIZED: 'quizbuilder.initialized'
} as const;