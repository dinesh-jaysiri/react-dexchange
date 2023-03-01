import React from 'react'
import ToggleBtn from './ToggleBtn';

function BlockHeader({toggleBtn=true,heading="Heading",button1 ="Button1",button2="Button2",toggle, setToggle}) {
  return (
    <div className="block__header">
      <h2>{heading}</h2> {toggleBtn?<ToggleBtn button1={button1} button2={button2} toggle={toggle} setToggle={setToggle} />:null}
    </div>
  );
}

export default BlockHeader