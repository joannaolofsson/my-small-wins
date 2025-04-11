import React from 'react'
import { Tabs } from './ui/tabs'

function Tabbar() {
  return (
    <div className="visible md:invisible flex flex-row">
      <Tabs>Future self</Tabs>
      <Tabs>Small win</Tabs>
      <Tabs>Login</Tabs>
    </div>
  )
}

export default Tabbar