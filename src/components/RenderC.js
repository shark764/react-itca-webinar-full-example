import React from 'react';

const RenderC = props => (
  <div style={{ flex: 1 }}>
    <span>And this is component C</span>
    <input type="text" name="changeA" id="changeA" onChange={props.onChange} />
  </div>
);

export default RenderC;
