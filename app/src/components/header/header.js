import React from 'react'
import './header.css'
import logo from '../../styles/img/logo.jpeg'
import IconButton from '../icon-button/icon-button'
import PhoneIcon from '@material-ui/icons/Phone'
import VideocamIcon from '@material-ui/icons/Videocam'
import InfoIcon from '@material-ui/icons/Info'
import withUndevelopedModal from '../hoc/withUndevelopedModal'

const Header = ({ send }) => {
  const IconButtonWithUndevelopedModal = withUndevelopedModal(IconButton)

  return (
    <div className='header'>
      <div className='header__left'>
        <div className='header__logo'>
          <img src={logo} alt='messenger logo' width={40} height={40} />
        </div>
        <div className='header__text_section'>
          <span className='header__title'>
            Messenger clone
          </span>
          <span className='header__subtitle'>
            Build with love ❤️
          </span>
        </div>
      </div>
      <div className='header__right hide-on-mobile'>
        <IconButtonWithUndevelopedModal Icon={PhoneIcon} ariaLabel='Appeler' />
        <IconButtonWithUndevelopedModal Icon={VideocamIcon} ariaLabel='Appeler en vidéo' />
        <IconButton onClick={() => send('editUsername')} Icon={InfoIcon} ariaLabel="Plus d'information" />
      </div>
    </div>
  )
}

export default Header
