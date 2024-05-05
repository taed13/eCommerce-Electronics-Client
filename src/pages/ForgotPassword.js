import React from 'react'
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import { Link } from 'react-router-dom'
import Container from '../components/Container'

const ForgotPassword = () => {
    return (
        <>
            <Meta title={"Forgot password"} />
            <BreadCrumb title="Forgot password" />
            <Container class1="login-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <div className="auth-card">
                            <h3 className='text-center mb-3'>Reset your password</h3>
                            <p className="text-center my-2 mb-3">We will sent you an email to reset your password</p>
                            <form action="" className='d-flex flex-column gap-15'>
                                <div>
                                    <input type="email" name='email' placeholder='Email' className="form-control" />
                                </div>
                                <div>

                                </div>
                                <div className='d-flex justify-content-center flex-column align-items-center gap-15'>
                                    <button type='submit' className='button border-0'>Submit</button>
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

export default ForgotPassword