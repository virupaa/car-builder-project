import LogoIcon from '../assets/images/icons/Logo.svg'
import GitHubIcon from '../assets/images/icons/GitHub.svg'

function Header({ children }) {
    return (
        <div id='header'>
            <h1>
                <strong>Car</strong>Sculptor
            </h1>
            {children}
        </div>
    )
}

export default Header
