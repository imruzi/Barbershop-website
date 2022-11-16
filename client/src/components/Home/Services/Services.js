import React from 'react'
import beardShave from '../../../assets/beard_shave.jpg'
import hair_cut from '../../../assets/hair_cut.jpg'
import pic3 from '../../../assets/pic3.jpg'
import logo from '../../../assets/logo.png'



import './Services.css'

const Services = () => {
    return (
        <div className='services' id='what-we-do'>

            <div className='services-container'>

                <div className='services-info'>
                    <img src={logo} alt=''></img>
                    <h1>OS NOSSOS SERVIÇOS</h1>

                </div>

                <div className='services-grid'>
                    <div className='services-box'>
                        <img src={hair_cut} alt=''></img>
                        <h2>Cabelo</h2>
                        <p className='mr-bottom services-para'>Escolha o corte ao seu gosto, nós tratamos do resto, com resultados óptimos</p>
                        
                    </div>
                    <div className='services-box'>
                        <img src={beardShave} alt=''></img>
                        <h2>Barba</h2>
                        <p className='mr-bottom services-para'>Combinamos técnicas modernas com as tradicionais, para trabalhar o seu novo look</p>
                        
                    </div>
                  
                    <div className='services-box'>
                        <img src={pic3} alt=''></img>
                        <h2>Atendimento personalizado</h2>
                        <p className='mr-bottom services-para'>Contactar o estebelecimento para mais detalhes</p>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Services