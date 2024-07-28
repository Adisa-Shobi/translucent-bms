import bg from '../../../public/login-img.svg'
import LoginForm from './components/LoginForm'

export default function page() {
    return (
        <div className='flex w-full h-screen overflow-scroll'  >
            <div className='c-bg-layer c-bg-img' style={{
                backgroundImage: `url(${bg.src})`,
            }} ></div>
            <div className='c-bg-layer bg-gradient-to-r from-primary-tint via-primary-tint to-transparent' ></div>
            <div className='flex relative z-10 justify-center items-center w-1/2 h-full'>
                <div className='max-w-[400px] w-full' >
                    <div className='flex flex-col gap-2 mb-8' >
                        <h1 className='c-heading-2' >Welcome Back</h1>
                        <p className='c-subheading' >Don&apos;t have an account? <a href="/register" className='text-primary' >Sign Up</a> </p>
                    </div>
                    <LoginForm />
                </div>
            </div>
            <div className='w-1/2'>
            </div>
        </div>
    )
}
