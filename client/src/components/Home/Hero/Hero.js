import React from 'react'
import './Hero.css'
import { Link } from 'react-router-dom'
 

const Hero = () => {
    return (
        <div className='hero' id='hero-navigate'>
            <div className='hero-text'>
                <h1 className='hero-h1'>Barbearia Amarante</h1>
                <div className='hero-para-div'>
                    <p className='hero-para'>
                        A barbearia amarante foi fundada em 1972, conta com	
                        os melhores profissionais no ramo para lhe dar um novo
                        look.
			Marque ja o seu corte!
                    </p>
                </div>
                <Link to='/appointment'>
                    <button className='hero-btn'>Agendamento</button>
                </Link>
            </div>
        </div>
    )
}

export default Hero
