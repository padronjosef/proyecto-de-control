export const Input = ({ item, disabled }) => {
  const { value, setValue, text, unit } = item
  const handleChange = ({ target }) => setValue(target.value)

  if (disabled === text) return

  return (
    <div className="input-wrapper">
      <span>{text}</span>

      <label className="label">
        <input
          value={value}
          type="number"
          min={0}
          onChange={handleChange}
          className="input"
        />

        <span className="unit"> ({unit})</span>
      </label>
    </div>
  )
}