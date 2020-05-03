import React from 'react';

const Title = (props) => {
  const display = (placeholders) => (

    placeholders ?
      placeholders.data.resumeTitle
    :null
  )
	return (
    <h1>{display(props.placeholders)}</h1>
	)
}

export default Title;
