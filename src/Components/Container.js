import React from 'react'
import ResponsiveDrawer from '../Pages/ResponsiveDrawer';

const Container = (props) => {
  return (
    <>
      <ResponsiveDrawer data={props.data} Iduser={props.iduser} />
    </>
  )
}
export default Container