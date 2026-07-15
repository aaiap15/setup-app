import { useHash, navigate } from '../router'

const TABS = [
  { to: '/feed', label: '둘러보기', ic: '🖼' },
  { to: '/build', label: '꾸미기', ic: '🛠' },
]

export function Nav() {
  const hash = useHash()
  const on = (to: string) => hash.startsWith(to) || (to === '/feed' && hash === '/')
  return (
    <nav className="nav">
      <div className="nav__in">
        {TABS.map((t) => (
          <button key={t.to} className={'nav__tab' + (on(t.to) ? ' on' : '')} onClick={() => navigate(t.to)}>
            <span className="ic">{t.ic}</span>
            {t.label}
          </button>
        ))}
      </div>
    </nav>
  )
}
