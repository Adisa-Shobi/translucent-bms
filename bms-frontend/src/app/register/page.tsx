import React from 'react'
import bg from '../../../public/signup-img.svg'
import SignUpForm from './components/SignUpForm'


export default function Page() {
    return (
        <div className='flex w-full h-screen overflow-scroll'  >
            <div className='c-bg-layer c-bg-img' style={{
                backgroundImage: `url(${bg.src})`,
            }} ></div>
            <div className='c-bg-layer bg-gradient-to-r from-primary-tint via-primary-tint to-transparent' ></div>
            <div className='flex relative z-10 justify-center items-center w-1/2 h-full'>
                <div className='max-w-[400px]' >
                    <div className='flex flex-col gap-2 mb-8' >
                        <h3 className='c-cap-subheading' >Get Started</h3>
                        <h1 className='c-heading-2' >Create new account</h1>
                        <p className='c-subheading' >Already have an account? <a href="/login" className='text-primary' >Login</a> </p>
                    </div>
                    <SignUpForm />
                </div>
            </div>
            <div className='w-1/2'>
            </div>
        </div>
    )
}
