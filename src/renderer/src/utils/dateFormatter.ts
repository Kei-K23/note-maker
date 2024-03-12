const dateFormat = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'short',
  timeStyle: 'short',
  timeZone: 'UTC'
})

export const dateFormatter = (ms: number) => dateFormat.format(ms)
