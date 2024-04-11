import scheduler from 'adonisjs-scheduler/services/main'

scheduler.command('inspire').everyFiveSeconds()
scheduler.command('every:minute').everyMinute()

scheduler
  .call(() => {
    console.log('Pruge DB!')
  })
  .weekly()
