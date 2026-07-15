import { useHash, navigate } from './router'
import { useStore, resetAll } from './store'
import { Nav } from './components/Nav'
import { Diagnose } from './screens/Diagnose'
import { Feed } from './screens/Feed'
import { SetupDetail } from './screens/SetupDetail'
import { Builder } from './screens/Builder'
import { Result } from './screens/Result'

export function App() {
  const hash = useHash()
  const { diagnosed } = useStore()

  // 첫 방문은 진단으로 (v5 §2.2 훅)
  if (hash === '/' && !diagnosed) { navigate('/diagnose'); }

  let screen, showNav = true
  if (hash.startsWith('/diagnose')) { screen = <Diagnose />; showNav = false }
  else if (hash.startsWith('/setup/')) screen = <SetupDetail id={hash.slice('/setup/'.length)} />
  else if (hash.startsWith('/build')) screen = <Builder />
  else if (hash.startsWith('/result')) { screen = <Result />; showNav = false }
  else screen = <Feed />

  return (
    <div className="app">
      <main className="main">{screen}</main>
      {showNav && <Nav />}
    </div>
  )
}

// 개발 편의: 전역 리셋 (콘솔에서 window.__resetSetup())
;(window as any).__resetSetup = resetAll
