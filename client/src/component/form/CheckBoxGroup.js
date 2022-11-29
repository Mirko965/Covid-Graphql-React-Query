import React from 'react'
import classNames from 'classnames'

const CheckBoxGroup = (
  name,
  value,
  onChange,
  checked,
  error,
  focus,
  blur,
  className,
  readOnly
) => {
  return (
    <React.Fragment key={value}>
    <input
      className={classNames(className, { input__invalid: error })}
      id={`${name}_${value}`}
      type='checkbox'
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
      readOnly={readOnly}
      onFocus={focus}
      onBlur={blur}
    />
    <label key={value} htmlFor={`${name}_${value}`}>
    {value}
    </label>
    {error && <div className="input__invalid--feedback">{error}</div>}
    </React.Fragment>
  )
};


export default CheckBoxGroup
