import { Codesandbox } from 'lucide-react'
import React from 'react'
type WrapperProps = {
    children : React.ReactNode
}

const AuthWrapper = ({children} : WrapperProps ) => {
  return (
    <div className='h-screen flex justify-center items-center flex-col '>
        <div className='flex items-center mb-6'>

            <div className='bg-primary text-primary-content rounded-box p-1.5'>
              <Codesandbox className='w-8 h-8' />
            </div>
            <span className='ml-3 font-bold text-3xl'>
                Intern<span className='text-primary'>Track</span>
            </span>

        </div>

        <div>
            {children}
        </div>
    </div>
  )
}

export default AuthWrapper