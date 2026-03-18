/**
 * DiamondDivider — decorative section divider with a ◇ centered between two lines.
 * Props: centered (bool, optional) — use for Dashboard hero where divider is
 *   narrow and centered (max-width: 320px, auto margin).
 *   Default is full-width with standard block margin.
 */

function DiamondDivider({ centered = false }) {
  const style = centered
    ? { margin: '1.5rem auto', maxWidth: '320px' }
    : { margin: '1.25rem 0' }

  return (
    <>
      <style>{`
        .dash-divider {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .dash-divider__line {
          flex: 1;
          height: 1px;
          background: var(--border);
        }

        .dash-divider__diamond {
          font-size: 0.65rem;
          color: var(--decorative-color);
          line-height: 1;
          user-select: none;
        }
      `}</style>

      <div className="dash-divider" style={style}>
        <span className="dash-divider__line" />
        <span className="dash-divider__diamond">◇</span>
        <span className="dash-divider__line" />
      </div>
    </>
  )
}

export default DiamondDivider
