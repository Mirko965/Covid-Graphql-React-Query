import React from 'react'
import classNames from 'classnames'

const SelectListGroup = (
  name,
  options = [],
  onChange,
  disabled,
  error,
  info,
  focus,
  blur,
) => {
  const selectOption = options.map((option, index, array) => {
    if (index === 0) {
      return (
        <option key={index} value={options[1]}>{option}</option>
      )
    }
    return (
      <option  key={index} value={option}>{(option).replaceAll('_', " ")}</option>
    )
  });

  return (
    <React.Fragment key={name}>
      <label htmlFor={name}>Choose a cases</label>
      <select
        className={classNames('input__select', { input__invalid: error })}
        id={`${name}`}
        name={name}
        onChange={onChange}
        disabled={disabled}
        onFocus={focus}
        onBlur={blur}
      >
        {selectOption}
      </select>
      {error && <div className="input__invalid--feedback">{error}</div>}
      {info && <small className="form__info">{info}</small>}
    </React.Fragment>
  )
};

export default SelectListGroup
