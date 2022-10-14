import React from 'react'
import Sidebar from './Sidebar.js'
import './dashboard.scss'
import { Typography } from '@material-ui/core'

import MetaData from '../layout/MetaData'

const DashBoard = () => {
  return (
    <div className="dashboard">
      <MetaData title="Thống kê | Admin" />
      <Sidebar />

      <div className="dashboardContainer">
        <Typography component="h1">Thống kê</Typography>
        <div className="content-wrap">
          <h2 style={{textAlign:"center"}}>Chưa cập nhật!</h2>
        </div>
      </div>
    </div>
  )
}

export default DashBoard
