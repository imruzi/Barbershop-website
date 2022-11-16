import React, {useState, useEffect} from 'react'
import './UserProfile.css'
import Navbar from '../Home/Navbar/Navbar'
import profileImg  from '../../assets/profile-img.jpg'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {getCookie, setCookie, setCookieInMins, deleteCookie} from '../../cookies'


const UserProfile = (props) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    const [updatedName, setUpdatedName] = useState('')
    const [updatedEmail, setUpdatedEmail] = useState('')
    const [updatedPhone, setUpdatedPhone] = useState('')

    const [time, setTime] = useState('Empty')
    const [date, setDate] = useState('')
    const [day, setDay] = useState('')



    useEffect(() =>{
        getProfile(getCookie('id'))
        console.log('upload user profile')
    },[])



    const getProfile = (userID) =>{
        axios.get(`http://localhost:5000/profiledata?id=${userID}`).then((response) =>{

            let {error, email, name, phone } = response.data 
            if(error){
                console.log(error)
            }
            else{
                setName(name)
                setEmail(email)
                setPhone(phone)
                setCookie('phone', phone ,2)
                console.log(response.data)
            }
        })

        axios.get(`http://localhost:5000/userappointment?id=${userID}`).then((response) =>{
            console.log(response.data)

            let {error, day, time, date } = response.data 
            if(error){
                console.log(error)
            }
            else{
                setTime(time)
                setDate(date)
                setDay(day)
            }
        })
    }

    const updateProfile = () =>{

        if(updatedName === '' && updatedEmail ==='' && updatedPhone ===''){ 
            alert('all fields are empty')
        }
        else{

            let obj = {}
            obj.name = updatedName
            obj.email = updatedEmail
            obj.phone = updatedPhone
            obj.userID = getCookie('id')
    
            axios.post('http://localhost:5000/updateprofile', obj).then((response) =>{
                let {error} = response.data

                if(error){
                    alert('update profile: '+error)
                }
                else{
                    
                    if(email !=='')
                        setEmail(email)
                    if(phone !==''){
                        setPhone(phone)
                        setCookie('phone', phone ,2)
                    }
                    if(name !==''){
                        setCookie('name', name ,2)
                        setName(name)
                    }
                    alert('data successfully updated!')
                    window.location.reload(false);
                    console.log('server res: ', response.data)
                }
            })
        }
    }


    const changeAppointment = () =>{
        console.log('change appointment')

        if(time === 'Empty'){
            alert('You not have appointment')
        }else{
            setCookieInMins('change', true, 1)
            props.history.push({ pathname: '/appointment' });
        }
    }

    const cancelAppointment = async() => {

        let response = await axios.post('http://localhost:5000/cancelappointment', {id:getCookie('id')})
        console.log(response.data)
        let {error} = response.data
        if(error){
            alert(error)
        }
        else{
            alert('Appointment deleted')
            window.location.replace('/profile')
        }
    }

    const deleteAcc = async() =>{
        console.log('id cookie ',getCookie('id'))
        let response = await axios.post('http://localhost:5000/deleteacc', {id:getCookie('id')})
        let {error} = response.data
        if(error){
            alert(error)
        }
        else{

            deleteCookie('id')
            deleteCookie('admin')
            deleteCookie('status')
            deleteCookie('name')

            alert(response.data)
            window.location.replace('/')
        }
    }

    return (
        <div>
            <Navbar/>
            <div className='user-profile-container'>
                <div className='user-profile-left'>
                    <h2>Bem-Vindo</h2>
                    <img className='profile-img' src={profileImg} alt=""/>

                    <ul>
                        <li className='profile-make-appointment'>
                            <i className="fa fa-plus" aria-hidden="true"></i>
                            <Link className='link-make-appo' to='/appointment'>
                                AGENDAMENTO
                            </Link>
                        </li>
                        <li>
                            <i className="fa fa-user" aria-hidden="true"></i>
                            <a href='#user-profile-info'>PERFIL</a>
                        </li>
                        <li>
                            <i className="fa fa-pencil mr-right-i" aria-hidden="true"></i>
                            <a href='#user-profile-updateinfo'>ATUALIZAR PERFIL</a>
                        </li>
                        <li>
                            <i className="fa fa-trash" aria-hidden="true"></i>
                            <a href='#user-profile-delete-acc'>APAGAR CONTA</a>
                        </li>
                    </ul>

                </div>

                <div className='user-profile-right'>
           
                    <div id='user-profile-info' className='user-profile-box'>
                        <div>
                            <h1>PERFIL</h1>
                            <div className='profile-underline'></div>
                        </div>
                        
                        <div className='user-profile-info-div'>
                            <div>
                                <p>Nome:</p>
                                <span>{name}</span>
                            </div>
                            <div>
                                <p>Email:</p>
                                <span>{email}</span>
                            </div>
                            <div>
                                <p>Telemovel:</p>
                                <span>{phone}</span>
                            </div>
                        </div>
                        <div className='user-profile-appointment'>
                            <div className='user-profile-appointment-flex'>
                                <div className='user-profile-appointment-btns'>
                                    <p>Tem um agendamento para:</p>
                                    <button onClick={changeAppointment} id='profile-btn-change'>Alterar</button>
                                    <button onClick={cancelAppointment} className='profile-btn-color-red'>Cancelar</button>
                                </div>
                                <div className='user-profile-appointment-time'>
                                    <p>{day}</p>
                                    <p>{time}</p>
                                    <p>{date}</p>
                                </div>
                            </div>     
                        </div>
                    </div>


                    <div id='user-profile-updateinfo' className='user-profile-box'>

                        <div className='profile-mr-bottom'>
                            <h1>Atualizar Perfil</h1>
                            <div className='profile-underline'></div>
                        </div>
                        

                        <p>Nome:</p>
                        <input type="text" placeholder='name...'
                        onChange={(e) => setUpdatedName(e.target.value)}
                        />
                        <p>Email:</p>
                        <input type="text" placeholder='email...'
                        onChange={(e) => setUpdatedEmail(e.target.value)}

                        />
                        <p>Telemovel:</p>
                        <input type="text" placeholder='phone...'
                        onChange={(e) => setUpdatedPhone(e.target.value)}
                        />
                        <br/>
                        <button onClick={updateProfile} className='profile-update-btn'>Atualizar</button>

                    </div>

                    <div id='user-profile-delete-acc' className='user-profile-box'>
                        <div className='profile-mr-bottom'>
                            <h1>Apagar conta</h1>
                            <div className='profile-underline'></div>
                        </div>
                        <p>
                            É impossível reverter esta ação                                                                         
                        </p>
                        <button onClick={deleteAcc}  id='profile-delete-btn'>Apagar</button>

                    </div>
                </div>
            </div>      
        </div>
    )
}

export default UserProfile