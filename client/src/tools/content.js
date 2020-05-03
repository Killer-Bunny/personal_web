import React from 'react';

const Content = (props) => {

  const display = (placeholders) => (

    placeholders ?
      placeholders.data.resumeText
    :null
  )
	return (
		<div className="container">
      {display(props.placeholders)}
		</div>
	)
}

export default Content;
