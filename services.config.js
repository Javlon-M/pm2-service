module.exports = [
  {
    name: 'auth-service',
    script: './app.js',
    watch: true,
  },
  {
    name: 'payment-worker',
    script: './services/payment/worker.js',
    watch: true,
  },
]
