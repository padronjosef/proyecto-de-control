export const Select = ({ value, setValue, fields }) => {
  const handleChange = ({ target }) => setValue(target.value)

  return (
    <label className="select-wrapper">
      <span>Valor a calcular</span>

      <select className="select" value={value} onChange={handleChange}>
        {fields.map(({ text }) => (
          <option className="option" key={text} value={text} >
            {text}
          </option>
        ))}
      </select>
    </label>
  )
}