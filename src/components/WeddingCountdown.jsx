/**
 * WeddingCountdown — hero Dashboard widget.
 * Displays the number of days remaining until the wedding date.
 * Accepts a `weddingDate` prop (string, "YYYY-MM-DD").
 * Shows a congratulations message if the date has passed.
 */
import DashboardCard from './DashboardCard'

function WeddingCountdown({ weddingDate = '2027-05-30' }) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const target = new Date(weddingDate)
  target.setHours(0, 0, 0, 0)

  const msPerDay = 1000 * 60 * 60 * 24
  const daysLeft = Math.round((target - today) / msPerDay)

  const isPast = daysLeft < 0

  return (
    <>
      <style>{`
        .countdown {
          text-align: center;
          padding: 1rem 0;
        }

        .countdown__number {
          font-family: var(--font-heading);
          font-size: 5rem;
          font-weight: 600;
          color: var(--rose-dark);
          line-height: 1;
          margin-bottom: 0.5rem;
        }

        .countdown__label {
          font-family: var(--font-body);
          font-size: 0.95rem;
          font-weight: 300;
          color: var(--text-muted);
          letter-spacing: 0.05em;
        }

        .countdown__date {
          font-family: var(--font-body);
          font-size: 0.8rem;
          color: var(--gold-dark);
          margin-top: 0.75rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .countdown__congrats {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          color: var(--rose-dark);
        }
      `}</style>

      <DashboardCard title="Countdown">
        <div className="countdown">
          {isPast ? (
            <p className="countdown__congrats">Congratulations, you're married!</p>
          ) : (
            <>
              <div className="countdown__number">{daysLeft}</div>
              <div className="countdown__label">days until your wedding</div>
              <div className="countdown__date">
                {target.toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </div>
            </>
          )}
        </div>
      </DashboardCard>
    </>
  )
}

export default WeddingCountdown
