import React from 'react'
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import { Link } from 'react-router-dom'
import Container from '../components/Container'
import CustomInput from '../components/CustomInput'

const Signup = () => {
    return (
        <>
            <Meta title={"Signup"} />
            <BreadCrumb title="Signup" />
            <Container class1="login-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <div className="auth-card">
                            <h3 className='text-center mb-3'>Create account</h3>
                            <form action="" className='d-flex flex-column gap-15'>
                                <CustomInput type="text" name='name' placeholder='Name' />
                                <CustomInput type="email" name='email' placeholder='Email' />
                                <CustomInput type="tel" name='phonenumber' placeholder='Phone number' />
                                <CustomInput type="password" name='password' placeholder='Password' />
                                <div className='mt-3 d-flex justify-content-center flex-column align-items-center gap-15'>
                                    <button className='button border-0'>Create</button>
                                    <Link to='/login'>Cancel</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Signup