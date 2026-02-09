import React from 'react'
import Avatar from '@mui/material/Avatar'
import Paper from '@mui/material/Paper'
import Rating from '@mui/material/Rating'
function ReviewCard({ data }) {
  return (
    <div className='my-2'>
      <Paper elevation={1} className='p-3'>
        <span className='d-flex align-items-center'>
          <Avatar src={data.user.profile_pic} />
          <p className='fs-4 px-3'>{data.user.username}</p>
        </span>
        <p style={{fontSize:"14px",position:"relative",marginLeft:50,marginTop:-10}}>{data.date}</p>
        <Rating
          name="read-only"
          value={data.rating}
          className='px-5'
          style={{cursor:"pointer"}}
        />
        <p className='mx-5'>{data.review}</p>
      </Paper>

    </div>
  )
}

export default ReviewCard