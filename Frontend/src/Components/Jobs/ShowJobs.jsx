import React from 'react'
import Card from '../Jobs/Card'


const ShowJobs = () => {

  return (
    <div className='px-10'>
        <h1 className='text-center font-semibold text-4xl'>Show Jobs </h1>
        <div className="jobcards flex gap-4 justify-center py-10 flex-wrap">
        <Card />
        </div>
    </div>
  )
}

export default ShowJobs