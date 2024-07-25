import React from 'react'
import Header from '../../Components/Header'
import { useSelector } from 'react-redux'

export default function Home() {
    const { user } = useSelector(state => state.authReducer)
    return (
        <div className='container'>
            <Header />
            <div className='mt-5'>
                <h5>Welcome to VITASOFT, {user?.first_name} {user?.middle_name} {user?.last_name}</h5>
            </div>
        </div>
    )
}
