import { HeaderContainer } from './styles'
import LogoIgnite from '../../assets/Logo-ignite.svg'
import { Timer, Scroll } from 'phosphor-react'

export function Header() {
  return (
    <HeaderContainer>
      <img src={LogoIgnite} />
      <nav>
        <a href="">
          <Timer size={24} />
        </a>

        <a href="">
          <Scroll size={24} />
        </a>
      </nav>
    </HeaderContainer>
  )
}
